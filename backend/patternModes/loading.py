import time

def loading(neo, brightness, delay=0.05, stop_event=None):
  factor = brightness/100.0
  if stop_event and stop_event.is_set():
    return
  while True:
    neo.fill_strip(0, 0, 0)  # Clear the strip
    neo.update_strip()
    for i in range(neo.num_leds):
        if stop_event and stop_event.is_set():
          return
        neo.set_led_color(i, 0, int(255 * factor), 0) 
        neo.update_strip()
        time.sleep(delay)

def run(neo, brightness, stop_event):
  loading(neo, brightness, stop_event=stop_event)
