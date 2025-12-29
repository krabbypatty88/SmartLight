from controller import (
  DoSetPatternColourBounce, DoSetPatternFade, DoSetPatternSmoothFade,
  DoSetPatternLoading, DoSetPatternRipple, DoSetPatternRainbow,
  DoSetPatternSnake, DoSetPatternThinking, DoSetPatternFirework,
  DoSetPatternBreathing, DoSetPatternTetris
)

# --------------- Definitions --------------

COLOURS = {
  "warm":  (255, 147, 41),
  "cool":  (180, 200, 255),
  "blue":  (0, 0, 255),
  "white": (255, 255, 255),
  "red":   (255, 0, 0),
  "green": (0, 255, 0),
  "yellow":(255, 255, 0),
}

TOKEN_TO_PATTERN = {
  DoSetPatternColourBounce: "colour_bounce",
  DoSetPatternFade:         "fade",
  DoSetPatternSmoothFade:   "smooth_fade",
  DoSetPatternLoading:      "loading",
  DoSetPatternRipple:       "ripple",
  DoSetPatternRainbow:      "rainbow",
  DoSetPatternSnake:        "snake",
  DoSetPatternThinking:     "thinking",
  DoSetPatternFirework:     "firework",
  DoSetPatternBreathing:    "breathing",
  DoSetPatternTetris:       "tetris",
}