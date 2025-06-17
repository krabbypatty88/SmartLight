import time
import random

def firework(neo, brightness, delay=0.05, stop_event=None):
  while True:
    if stop_event and stop_event.is_set():
      return
    factor = brightness / 100.0
    center = random.randint(0, neo.num_leds - 1)
    color = (
        int(random.randint(0, 255) * factor), 
        int(random.randint(0, 255) * factor), 
        int(random.randint(0, 255) * factor)
      )

    for radius in range(neo.num_leds):
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
  firework(neo, brightness, stop_event=stop_event)
    