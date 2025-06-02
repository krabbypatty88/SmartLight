import time

def color_bounce(neo, color, delay=0, stop_event=None): 
  num_leds = neo.num_leds
  while True:
    if stop_event and stop_event.is_set():
      return
    # Forward bounce
    for i in range(num_leds):
      if stop_event and stop_event.is_set():
        return
      neo.fill_strip(0, 0, 0)
      neo.set_led_color(i, *color)
      neo.update_strip()
      time.sleep(delay)

    if stop_event and stop_event.is_set():
      return
    # Backward bounce
    for i in range(num_leds - 1, -1, -1):
      if stop_event and stop_event.is_set():
        return
      neo.fill_strip(0, 0, 0)
      neo.set_led_color(i, *color)
      neo.update_strip()
      time.sleep(delay)

def run(neo, brightness, stop_event):
  factor = brightness/100.0
  color = (int(255 * factor), 0, 0)

  color_bounce(neo, color, stop_event=stop_event)