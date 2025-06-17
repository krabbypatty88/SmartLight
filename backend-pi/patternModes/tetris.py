import random
import time

# Helpers --------

# Colour pattern that represents that the tetris round has been completed
def finishing_sequence(neo, delay=0.05, stop_event=None):
  if stop_event and stop_event.is_set():
    return
  
# Tetris ----------

# Generates random shape length between 1 and 4
# Consecutive LEDs of this length light up on the strip
# Periodically the shapes move down to the end of the light
# The blocks accumulate starting from the right side of the strip until the entire strip is lit up
# When all lit up, there will be a shining pattern to indicate that the tetris board has been completed
# Once completed, the tetris board clears and the pattern restarts 

def Tetris(neo, color, delay=0.05, stop_event=None):

  while True:
    if stop_event and stop_event.is_set(): 
      return
    moving = False # is there currently a piece moving down the strip
    strip_end = neo.num_leds # keep track of how much of the tetris board has been filled up to this point
    filled = False

    # While the strip is not filled, generate and propagate blocks
    while filled == False:

      space_remaining = neo.num_leds - strip_end
      if 0 < space_remaining < 4: 
        block_length = random.randint(1, space_remaining)
      elif space_remaining > 0: 
        block_length = random.randint(1, 4)
      elif space_remaining == 0:
        filled = True
        finishing_sequence(neo, stop_event=stop_event)

      offset = 0 # keeps track of the current position of the block moving down the strip
      # reset LEDs which are currently not filled
      for i in range(1, strip_end): 
        neo.set_led_color(i, (0, 0, 0))
      neo.update_strip()

      # Initialise LEDs
      for i in range(1, block_length):
        neo.set_led_color(i + offset, color)
        neo.update_strip()
        time.sleep(delay)
      moving = True

      # Propagation of the block down the strip
      while moving == True:
        offset += 1
        for i in range(1, strip_end):
          neo.set_led_color(i, (0, 0, 0))
        for i in range(1, block_length):
          neo.set_led_color(i + offset, color)
          time.sleep(delay)
          # Check if block has reached the end of the region that is not filled
          if (block_length + offset + 1) == strip_end:
            moving = False
        neo.update_strip()

      # Block reaches the end of the strip
      strip_end = strip_end - block_length


def run(neo, color, brightness, stop_event):
  factor = brightness / 100.0
  factored_color = tuple(int(c * factor) for c in color)
  Tetris(neo, factored_color, stop_event=stop_event)
  