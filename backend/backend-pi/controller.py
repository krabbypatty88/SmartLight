# Infer action propositions from nlu.parse()

from nlu import parse 

# ---- Actions -------------------------------------

DoTurnOn          = "DoTurnOn"
DoTurnOff         = "DoTurnOff"

DoSetColorWarm    = "DoSetColorWarm"
DoSetColorCool    = "DoSetColorCool"
DoSetColorBlue    = "DoSetColorBlue"
DoSetColorWhite   = "DoSetColorWhite"
DoSetColorRed     = "DoSetColorRed"
DoSetColorGreen   = "DoSetColorGreen"
DoSetColorYellow  = "DoSetColorYellow"

DoSetPatternColourBounce = "DoSetPatternColourBounce"
DoSetPatternFade         = "DoSetPatternFade"
DoSetPatternSmoothFade   = "DoSetPatternSmoothFade"
DoSetPatternLoading      = "DoSetPatternLoading"
DoSetPatternRipple       = "DoSetPatternRipple"
DoSetPatternRainbow      = "DoSetPatternRainbow"
DoSetPatternSnake        = "DoSetPatternSnake"
DoSetPatternThinking     = "DoSetPatternThinking"
DoSetPatternFirework     = "DoSetPatternFirework"
DoSetPatternBreathing    = "DoSetPatternBreathing"
DoSetPatternTetris       = "DoSetPatternTetris"

DoSetBrightness20  = "DoSetBrightness20"
DoSetBrightness30  = "DoSetBrightness30"
DoSetBrightness50  = "DoSetBrightness50"
DoSetBrightness80  = "DoSetBrightness80"
DoClampPct90       = "DoClampPct90"
DoSetBrightness    = "DoSetBrightness"
DoSetBrighter      = "DoSetBrighter"
DoSetDimmer        = "DoSetDimmer"

def controller(text):
  asked, pct, asked_pattern = parse(text)
  actions = set()

  # Power
  if asked.get("off"):
    actions.add(DoTurnOff)
    return actions

  if asked.get("on") or any([
    asked.get("warm"), asked.get("cool"), asked.get("blue"),
    asked.get("white"), asked.get("red"), asked.get("green"), asked.get("yellow"),
    asked.get("scene_focus"), asked.get("scene_relax"),
    asked.get("scene_movie"), asked.get("scene_night"),
    asked_pattern is not None, pct is not None
  ]):
    actions.add(DoTurnOn)

  # Scene defaults
  if asked.get("scene_focus"):
    actions.update({DoSetColorCool, DoSetBrightness80})
  if asked.get("scene_relax"):
    actions.update({DoSetColorWarm, DoSetBrightness30})
  if asked.get("scene_movie"):
    actions.update({DoSetColorBlue, DoSetBrightness30})
  if asked.get("scene_night"):
    actions.update({DoSetColorWarm, DoSetBrightness20})

  # Explicit colours
  if asked.get("warm"):   actions.add(DoSetColorWarm)
  if asked.get("cool"):   actions.add(DoSetColorCool)
  if asked.get("blue"):   actions.add(DoSetColorBlue)
  if asked.get("white"):  actions.add(DoSetColorWhite)
  if asked.get("red"):    actions.add(DoSetColorRed)
  if asked.get("green"):  actions.add(DoSetColorGreen)
  if asked.get("yellow"): actions.add(DoSetColorYellow)

  # Adjustments
  if asked.get("brighter"): actions.add(DoSetBrighter)
  if asked.get("lighter"):  actions.add(DoSetDimmer)

  # Pattern
  if asked_pattern:
    pat_to_action = {
      "colour_bounce": DoSetPatternColourBounce,
      "fade":          DoSetPatternFade,
      "smooth_fade":   DoSetPatternSmoothFade,
      "loading":       DoSetPatternLoading,
      "ripple":        DoSetPatternRipple,
      "rainbow":       DoSetPatternRainbow,
      "snake":         DoSetPatternSnake,
      "thinking":      DoSetPatternThinking,
      "firework":      DoSetPatternFirework,
      "breathing":     DoSetPatternBreathing,
      "tetris":        DoSetPatternTetris,
    }
    actions.add(pat_to_action[asked_pattern])

  # Brightness
  if pct is not None:
    actions.add(DoSetBrightness)

  return actions