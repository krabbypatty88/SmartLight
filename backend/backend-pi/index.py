from flask import Flask, request, jsonify
from pi5neo import Pi5Neo
from flask_cors import CORS
from controller import controller
from commands import commands
from constants import COLOURS
import importlib
import threading
import re

# --------------- Server Initialisation ----------

app = Flask(__name__)
CORS(app)
neo = Pi5Neo('/dev/spidev0.0', 56, 800)

pattern_thread = None
stop_event = threading.Event()

# ---------------- Helper Functions ----------------

def apply_brightness(r, g, b, brightness_level):
  factor = brightness_level / 100.0

  r_scaled = int(r * factor)
  g_scaled = int(g * factor)
  b_scaled = int(b * factor)

  return r_scaled, g_scaled, b_scaled

def stop_current_pattern():
  global pattern_thread, stop_event
  if pattern_thread and pattern_thread.is_alive():
    stop_event.set()
    pattern_thread.join()  # wait for the pattern thread to finish before doing anything else

    neo.fill_strip(0, 0, 0)
    neo.update_strip()

def run_pattern(pattern_name, brightness): 
  global pattern_thread, stop_event

  stop_current_pattern()
  stop_event.clear()

  try:
    module = importlib.import_module(f"patternModes.{pattern_name}")
    if hasattr(module, 'run'):
      pattern_thread = threading.Thread(target=module.run, args=(neo, brightness, stop_event))
      pattern_thread.start()
    else:
      print(f"No 'run' function in {pattern_name}.py")
  except ModuleNotFoundError:
    print(f"Pattern '{pattern_name}' not found.")

def to_camel_case(s): 
  s = re.sub(r"(_|-)+", " ", s).title().replace(" ","")
  return ''.join([s[0].lower(), s[1:]])

# ---------------- API Endpoints ----------------

# Set manually prescribed colour for the LED
@app.route('/api/set-light', methods=['POST'])
def set_light():
  data = request.json
  r = data.get('r', 0)
  g = data.get('g', 0)
  b = data.get('b', 0)
  brightness = int(data.get('brightness', 100))

  r_scaled, g_scaled, b_scaled = apply_brightness(r, g, b, brightness)
  stop_current_pattern()
  neo.fill_strip(r_scaled, g_scaled, b_scaled)
  neo.update_strip()

  return jsonify({"message": "LED updated"}), 200

# Set manually prescribed pattern for the LED
@app.route('/api/set-pattern', methods=['POST'])
def set_pattern():
  data = request.json
  pattern = data.get('pattern')
  brightness = int(data.get('brightness', 100))

  if not pattern:
    stop_current_pattern()
    stop_event.clear()
    return jsonify({"message": "Pattern stopped"}), 200

  pattern = to_camel_case(pattern)

  stop_current_pattern()
  stop_event.clear()
  run_pattern(pattern, brightness)
  return jsonify({"message": f"Pattern '{pattern}' started"}), 200

# Stop current lighting pattern
@app.route('/api/stop-pattern', methods=['POST'])
def stop_pattern():
  stop_current_pattern()
  return jsonify({"message:" "Pattern stopped"}), 200

# Action user prompt entered into assistant
@app.route('/api/action-prompt', methods=['POST'])
def action_prompt():
  data = request.json
  prompt = data.get('prompt')
  actions = controller(prompt)
  if not actions: return jsonify({"message": "No recognized action", "actions_fired": []}), 200
  on, colour, brightness, pattern = commands(prompt, actions)

  # Apply to hardware
  if not on:
    stop_current_pattern()
    neo.fill_strip(0, 0, 0)
    neo.update_strip()
    return jsonify({"message": "Off", "state": {"on": False, "colour": None, "brightness": 0, "pattern": None},
                    "actions_fired": sorted(list(actions))}), 200

  if not brightness: brightness = 50

  if pattern:
    run_pattern(to_camel_case(pattern), brightness)
    return jsonify({"message": f"Pattern: {pattern}", 
                    "state": {"on": True, "colour": None, "brightness": brightness, "pattern": pattern},
                    "actions_fired": sorted(list(actions))}), 200

  stop_current_pattern()
  r, g, b = COLOURS.get(colour, (255, 255, 255))
  r_scaled, g_scaled, b_scaled = apply_brightness(r, g, b, brightness)
  neo.fill_strip(r_scaled, g_scaled, b_scaled)
  neo.update_strip()

  return jsonify({
    "message": f"Colour: {colour} @ {brightness}%",
    "state": {"on": True, "colour": colour, "brightness": brightness, "pattern": None},
    "actions_fired": sorted(list(actions))
  }), 200

#-------------- Start Server ---------------------

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)