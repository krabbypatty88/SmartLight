import time
import random

def ripple(neo, brightness, delay=0.1, stop_event=None):
  factor = brightness / 100.0
  center = neo.num_leds // 2 
  while True:
    color = (
      int(random.randint(0, 255) * factor), 
      int(random.randint(0, 255) * factor), 
      int(random.randint(0, 255) * factor)
    )
    if stop_event and stop_event.is_set():
      return
    for radius in range(neo.num_leds // 2 + 1): 
      if stop_event and stop_event.is_set():
        return
      neo.fill_strip(0, 0, 0)
      if center - radius >= 0:
        neo.set_led_color(center - radius, *color)
      if center + radius < neo.num_leds: 
        neo.set_led_color(center + radius, *color)
      neo.update_strip()
      time.sleep(delay)

def run(neo, brightness, stop_event):
  ripple(neo, brightness, stop_event=stop_event)