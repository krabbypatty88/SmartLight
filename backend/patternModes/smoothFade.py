import time
from math import cos

def smooth_fade(neo, brightness, delay=0.01, stop_event=None): 
  factor = brightness / 100.0
  while True:
    t = time.time()
    if stop_event and stop_event.is_set():
      return
    for i in range(neo.num_leds):
      if stop_event and stop_event.is_set(): 
        return
      intensity = int((cos(i * 0.01 + t) * 0.5 + 0.5) * 255 * factor)
      neo.set_led_color(i, intensity, intensity, intensity)
    neo.update_strip()
    time.sleep(delay)

def run(neo, brightness, stop_event): 
  smooth_fade(neo, brightness, stop_event=stop_event)