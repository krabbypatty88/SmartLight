import time

def breathing(neo, brightness, color, steps=50, delay=0.1, stop_event=None):
  while True:
    if stop_event and stop_event.is_set(): 
      return
    # graudually increase intensity
    factor = brightness / 100.0
    for i in range(steps):
      if stop_event and stop_event.is_set(): 
        return
      intensity = (i / steps) * factor
      for led in range(neo.num_leds):
        neo.set_led_color(led, *tuple(int(c * intensity) for c in color))
      neo.update_strip()

    # gradually decrease intensity
    for i in range(steps): 
      if stop_event and stop_event.is_set(): 
        return
      intensity = (1 - (i / steps)) * factor
      for led in range(neo.num_leds): 
        neo.set_led_color(led, *tuple(int(c * intensity) for c in color))
      neo.update_strip()
    time.sleep(delay)

def run(neo, brightness, stop_event):
  color = (255, 255, 255) # white color
  breathing(neo, brightness, color, stop_event=stop_event)
    
