import re
from datetime import datetime

def parse(text):
  t = text.lower()
  asked = {
      # power
      "on":  bool(re.search(r"\b(turn\s*)?on\b|\blights?\s*on\b|\bpower on\b", t)),
      "off": bool(re.search(r"\b(turn\s*)?off\b|\blights?\s*off\b|\bpower off\b", t)),

      # colours
      "warm":   any(w in t for w in ["warm", "warm white", "amber", "yellowish"]),
      "cool":   any(w in t for w in ["cool", "cool white", "daylight"]),
      "blue":   "blue"   in t or "bluish" in t,
      "white":  "white"  in t or "neutral" in t,
      "red":    "red"    in t or "reddish" in t,
      "green":  "green"  in t or "greenish" in t,
      "yellow": "yellow" in t or "gold" in t,
      "dimmer": any(w in t for w in ["dimmer", "less bright", "not as bright"]),
      "brighter": any(w in t for w in ["brighter", "more bright", "make it brighter"]),

      # scenes
      "scene_focus": any(w in t for w in ["focus","study","work","reading"]),
      "scene_relax": any(w in t for w in ["relax","chill","wind down"]),
      "scene_movie": any(w in t for w in ["movie","film","cinema"]),
      "scene_night": any(w in t for w in ["night","sleep"]),
  }

  patterns = {
      "colour_bounce": any(w in t for w in ["colour bounce","color bounce","bounce"]),
      "fade": "fade" in t and "smooth" not in t,
      "smooth_fade": "smooth fade" in t or "smoothfade" in t,
      "loading": any(w in t for w in ["loading","spinner","spinning"]),
      "ripple": "ripple" in t,
      "rainbow": "rainbow" in t,
      "snake": "snake" in t,
      "thinking": any(w in t for w in ["thinking","processing"]),
      "firework": any(w in t for w in ["firework","fireworks"]),
      "breathing": any(w in t for w in ["breathing","breathe"]),
      "tetris": "tetris" in t,
  }
  asked_pattern = next((k for k,v in patterns.items() if v), None)

  # brightness percent
  m = re.search(r"(\d{1,3})\s*(%|percent)", t)
  asked_pct = max(0, min(100, int(m.group(1)))) if m else None

  return asked, asked_pct, asked_pattern