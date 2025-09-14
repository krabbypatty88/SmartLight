# SmartLight

<p align="left">
  <img width="550" height="550" alt="Circuit Diagram" src="https://github.com/user-attachments/assets/2446951b-d3e7-4051-83c8-dcf5127e9f80" />
</p>

## Overview

A custom-built RGB desk light system powered by a Raspberry Pi 5, designed to control brightness and colour via a web-based interface. This project combines electrical circuit design with full-stack development, enabling real-time LED control using JavaScript, GPIO PWM, and a responsive UI.

## How it Works

The system uses a **Raspberry Pi 5** to control a WS2812B RGB LED strip via the **Pi5Neo** Python library, which sends colour data over the Pi’s **SPI interface (GPIO 10)**.  
Since the Raspberry Pi’s GPIO outputs operate at **3.3 V logic** and WS2812B LEDs require a **5 V logic** signal for reliable operation, the data line passes through a **MOSFET-based level-shifting circuit** before reaching the LED strip.

### Operation

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

## Circuit Description

<p align="center">
  <img width="926" height="496" alt="Circuit Diagram" src="https://github.com/user-attachments/assets/07364ecf-89cb-4cb4-a9e7-a2878bb56097" />
  <br>
  <em>Figure 1: Level-shifting circuit for Raspberry Pi 3.3 V GPIO to 5 V WS2812B LED strip</em>
</p>

- **Voltage Sources**
  - **V1 (5 V)** – Represents the 5 V supply from the Raspberry Pi or an external power source for the LED strip.  
  - **V2 (3.3 V)** – Represents the GPIO output signal from the Raspberry Pi.

- **Capacitor**
  - **C1 (100 µF)** – A decoupling capacitor across the 5 V supply to smooth out voltage fluctuations caused by the switching current of the LED strip, helping reduce noise and voltage dips.

- **Level Shifter**
  - **M1** – NMOS transistor used as a low-side switch to translate the 3.3 V GPIO signal to a 5 V logic signal.  
  - **R1 (10 kΩ)** – Pull-up resistor from the 5 V rail to the NMOS drain, ensuring a defined high logic level when the transistor is off.  
  - **R2 (10 kΩ)** – Pull-down resistor at the MOSFET gate to ensure it remains off when no signal is applied.

- **Indicator LED**
  - **R3 (1 kΩ)** – Current-limiting resistor for the indicator LED.  
  - **D1** – Small on-board LED used to verify that the shifted 5 V signal is present.