import time 

def snake(neo, color, delay=0.05, snake_length=7, stop_event=None):
  while True:
    if stop_event and stop_event.is_set():
      return
    for i in range(neo.num_leds + snake_length):
      if stop_event and stop_event.is_set():
        return
      neo.fill_strip(0, 0, 0)
      for j in range(snake_length):
        if i - j >= 0 and i - j < neo.num_leds:
          neo.set_led_color(i - j, *color)
      neo.update_strip()
      time.sleep(delay)

def run(neo, brightness, stop_event):
  factor = brightness / 100.0
  snake(neo, (0, int(255* factor), 0), stop_event=stop_event)

