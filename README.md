# SmartLight

## Overview

A custom-built RGB desk light system powered by a Raspberry Pi 5, designed to control brightness and color via a web-based interface. This project combines electrical circuit design with full-stack development, enabling real-time LED control using JavaScript, GPIO PWM, and a responsive UI.

## How it Works

The system uses a **Raspberry Pi 5** to control a WS2812B RGB LED strip via the **Pi5Neo** Python library, which sends color data over the Pi’s **SPI interface (GPIO 10)**.  
Since the Raspberry Pi’s GPIO outputs operate at **3.3 V logic** and WS2812B LEDs require a **5 V logic** signal for reliable operation, the data line passes through a **MOSFET-based level-shifting circuit** before reaching the LED strip.

### Operation:

1. Signal Generation
   A web-based frontend sends color/brightness settings to the backend, which translates them into PWM control signals sent from the Pi's GPIO pins.

2. Level Shifting
  The GPIO signal passes through a MOSFET-based (2N7000 Nmos) level shifter, boosting the 3.3 V logic level to 5 V so it can properly drive the LED strip’s data input.
   
3. Power Stabilisation
   A 100uF decoupling capacitor is placed across the LED strip's 5V supply lines to smooth voltage fluctuations caused by rapid LED switching and prevent signal glitches.
   
4. Signal Verification
   A small indicator LED is connected in parallel with the LEd strip's data line (via a current-limiting resistor). This allows quick visual confirmation that the 5V data signal is being transmitted correctly from the Pi.
  
7. LED Output
   The WS2812B individually addressable LED strip receives the data signal and displays the specified colour pattern in real time. 
