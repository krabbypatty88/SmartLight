import time

def rainbow(neo, brightness, delay=0.05, stop_event=None):
  factor = brightness / 100.0
  colors = [
    (int(255 * factor), 0, 0),
    (int(255 * factor), int(127 * factor), 0),
    (int(255 * factor), int(255 * factor), 0),
    (0, int(255 * factor), 0),
    (0, 0, int(255 * factor)),
    (int(75 * factor), 0, int(130 * factor)),
    (int(148 * factor), 0, int(211 * factor))
  ]

  while True:
    if stop_event and stop_event.is_set(): 
      return
    for offset in range(neo.num_leds):
      for i in range(neo.num_leds):
        if stop_event and stop_event.is_set(): 
          return
        neo.set_led_color(i, *colors[(i + offset) % len(colors)])
      neo.update_strip()
      time.sleep(delay)

def run(neo, brightness, stop_event):
  rainbow(neo, brightness, stop_event=stop_event)
