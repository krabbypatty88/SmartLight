import time

def color_fade(neo, colors, delay=0.05, stop_event=None):
    steps = 100  # Smoothness of the fade
    num_leds = neo.num_leds
    num_colors = len(colors)

    while True:
        if stop_event and stop_event.is_set():
          return
        for i in range(num_colors):
          next_color = colors[(i + 1) % num_colors]
          # Transition from current color to next color in steps
          for step in range(steps):
            if stop_event and stop_event.is_set():
                        return
            for led in range(num_leds):
              if stop_event and stop_event.is_set():
                        return
              color = tuple(
                int(colors[i][c] + ((next_color[c] - colors[i][c]) * (step / steps)))
                for c in range(3)
              )
              neo.set_led_color(led, *color)
            neo.update_strip()
            time.sleep(delay)

def run(neo, brightness, stop_event):
  factor = brightness/100.0
  colors = [(int(255 * factor), 0, 0),    # Red
        (0, int(255 * factor), 0),    # Green
        (0, 0, int(255 * factor)),]    # Blue

  color_fade(neo, colors, stop_event=stop_event)

