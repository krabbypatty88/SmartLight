from nlu import parse
from controller import (
  DoSetColorWarm, DoSetColorCool, DoSetColorBlue, DoSetColorWhite,
  DoSetColorRed, DoSetColorGreen, DoSetColorYellow,
  DoSetBrightness20, DoSetBrightness30, DoSetBrightness50, DoSetBrightness80,
)
from constants import TOKEN_TO_PATTERN

def commands(prompt, actions): 
  asked, pct, asked_pattern = parse(prompt)

  # Reduce action tokens to concrete commands
  on = True
  colour = None
  brightness = None
  pattern = None

  for a in actions: 
    if "DoTurnOff" in a: on = False
    if "DoTurnOn"  in a: on = True

    if DoSetColorWarm   in a: colour = "warm"
    if DoSetColorCool   in a: colour = "cool"
    if DoSetColorBlue   in a: colour = "blue"
    if DoSetColorWhite  in a: colour = "white"
    if DoSetColorRed    in a: colour = "red"
    if DoSetColorGreen  in a: colour = "green"
    if DoSetColorYellow in a: colour = "yellow"
    if colour is None: colour = "warm"

    if DoSetBrightness80 in a: brightness = 80
    if DoSetBrightness50 in a: brightness = 50
    if DoSetBrightness30 in a: brightness = 30
    if DoSetBrightness20 in a: brightness = 20
    if pct is not None:        brightness = pct

    for token, name in TOKEN_TO_PATTERN.items():
      if token in a:
        pattern = name

  return on, colour, brightness, pattern