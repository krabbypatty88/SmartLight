from flask import Flask, request, jsonify
from pi5neo import Pi5Neo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
neo = Pi5Neo('/dev/spidev0.0', 60, 800)

# Helper Functions ############################

def apply_brightness(r, g, b, brightness_level):
  factor = brightness_level / 100.0

  r_scaled = int(r * factor)
  g_scaled = int(g * factor)
  b_scaled = int(b * factor)

  return r_scaled, g_scaled, b_scaled

#################################################

@app.route('/api/set-light', methods=['POST'])
def set_light():
  data = request.json
  r = data.get('r', 0)
  g = data.get('g', 0)
  b = data.get('b', 0)
  brightness = int(data.get('brightness', 100))

  r_scaled, g_scaled, b_scaled = apply_brightness(r, g, b, brightness)
  neo.fill_strip(r_scaled, g_scaled, b_scaled)
  neo.update_strip()

  return jsonify({"message": "LED updated"}), 200

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000)
