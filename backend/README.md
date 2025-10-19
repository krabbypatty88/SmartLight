# SmartLight Backend

A lightweight Flask-based backend is used for controlling the LED system through a REST API. This backend runs on a Raspberry Pi 5 and communicates with the LED strip using the `Pi5Neo` library.
The frontend sends requests to the Pi to set solid colours, start lighting patterns, or process natural written commands.

--- 

## ⚙️ System Overview

- **Framework:** Flask  
- **CORS Enabled:** Yes (for React frontend communication)  
- **LED Driver:** `Pi5Neo('/dev/spidev0.0', 56, 800)`
- **Run On:** Raspberry Pi 5
- **Pattern Handling:** Each pattern is defined as a module inside `patternModes/`, and is dynamically executed on a separate thread.

The 'stop_event' ensures that one thread is terminated cleanly before another is started. Making use of this, patterns can be stopped or changed with immediate effect.

--- 

## 🧩 API Endpoints 

### `/api/set-light` - Set Solid Colour
**Method:** `POST`

Sets a manually defined colour on the LED strip. Any currently active pattern is stopped first.

**Request Body:**

```json
{
  "r": 255,
  "g": 0,
  "b": 0,
  "brightness": 80
}
```

**Response:**
```json
{
  "message": "LED updated" 
}
```

### `/api/set-pattern` - Set Lighting Pattern
**Method:** `POST`

Sets a predefined lighting pattern on the LED strip. This overrides any currently active solid colour, or terminates a pattern which is currently active.
If the `pattern` value is empty, the current pattern will be stopped.

**Request Body:**

```json
{
  "pattern": "fade",
  "brightness": 80
}
```

**Response:**

```json
{
  "message": "Pattern 'rainbow' started"
}
```

If stopped:
```json
{
  "message": "Pattern stopped" 
}
```

**Pattern Lookup:**

Pattern names are converted to camelCase and imported dynamically from the `/patternModes` folder.

`"Rainbow"` => `patternModes.rainbow`  
`"Colour Bounce"` => `patternModes.colourBounce`  
`"Smooth Fade"` => `patternModes.smoothFade`

## `/api/action-prompt` - Turn User Prompt into Actionable
**Method:** `POST`

**Request Body:**

```json
{
  "prompt": "make it blue"
}
```

The prompt is interpreted via the logic implemented in nlu.py. The logic unit picks out key words, and hence determines an action to pass through to the LEDs.

**Response Examples**

* Turn Off: 

```json
{
  "message": "Off",
  "state": {"on": false, "colour": null, "brightness": 0, "pattern": null},
  "actions_fired": ["off"]
}
```

* Set a Colour: 

```json
{
  "message": "Make it blue",
  "state": {"on": true, "colour": "blue", "brightness": 50, "pattern": null},
  "actions_fired": ["brightness", "colour", "on"]
}
```  

When a brightness is not explicitly set, it defaults to 50% brightness.

* Set a Pattern:

```json
{
  "message": "Rainbow",
  "state": {"on": true, "colour": null, "brightness": 50, "pattern": "Rainbow"},
  "actions_fired": ["pattern", "brightness", "on"]
}
```  












