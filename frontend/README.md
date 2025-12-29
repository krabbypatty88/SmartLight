# 💡 SmartLight Frontend

Users can adjust the LED lighting colours, brightness, and patterns, or control the light using natural written commands.

--- 

## ✨ Overview

The **Smartlight interface** is divided into three main tabs: 

### 🟥 Solid Mode

<p align="center">
  <img width="900" alt="Smartlight_frontend_1" src="https://github.com/user-attachments/assets/3930bdf9-0955-4446-b93e-1445195a9f19" />
</p>
<p align="center"><em>Figure 1 — Solid Mode: Set solid colours, adjust brightness, and save favourites.</em></p>

<p align="center">
  <img width="1871" height="900" alt="Smartlight_frontend_4" src="https://github.com/user-attachments/assets/fff1d738-70df-4da6-bb62-804e7a8812af" />
</p>
<p align="center"><em>Figure 2 — Modal used to select a colour to save.</em></p>

In **Solid Mode**, users can:
- Choose and display a **solid RGB colour** on the LED strip.
- View the **selected RGB value** in real time.
- Adjust **brightness** using a responsive slider.
- **Save colours** for quick access and reuse.
- Apply or reset the lighting configuration.

This mode is ideal for static lighting setups and fine-tuned ambience control.

### 🌈 Pattern Mode

<p align="center">
  <img width="900" alt="Smartlight_frontend_2" src="https://github.com/user-attachments/assets/26e6630d-2567-4e74-8d29-91e14fe359d9" />
</p>
<p align="center"><em>Figure 2 — Pattern Mode: Choose from a set of predefined lighting animations.</em></p>

In **Pattern Mode**, users can:
- Select from **predefined lighting animations**, including:
  - Colour Bounce  
  - Fade / Smooth Fade  
  - Ripple  
  - Rainbow  
  - Snake  
  - Thinking  
  - Firework  
  - Breathing  
  - Tetris  
- Adjust **brightness** dynamically while keeping the selected animation active.
- Reset all settings with one click.

This provides a more immersive and dynamic ilghting experience

### 🤖 Assistant Mode

<p align="center">
  <img width="900" alt="Smartlight_frontend3" src="https://github.com/user-attachments/assets/de0dafc9-724a-4343-bce0-628e60dc036d" />
</p>
<p align="center"><em>Figure 3 — Assistant Mode: Control lighting through natural text commands.</em></p>

The **Assistant Mode** introduces natural command interaction.

Features include:
- A toggle to **enable or disable Assisted Mode**.
- A chat-style interface for entering natural text commands, such as:
  - `turn blue` → sets LEDs to blue  
  - `increase brightness` → raises brightness level  
  - `start rainbow pattern` → activates rainbow animation  
- Commands are interpreted by the backend **logic unit** and executed instantly.

This mode connects **AI-driven interaction** with real-time LED control.
