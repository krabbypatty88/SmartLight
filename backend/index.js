const express = require('express');
const ws281x = require('rpi-ws281x-native');
const app = express();
const PORT = 3000;
app.use(express.json());

const NUM_LEDS = 60;
ws281x.init(NUM_LEDS);

let pixels = new Uint32Array(NUM_LEDS);

app.post('/brightness', (req, res) => {
  const { level } = req.body;
  const brightness = Math.min(Math.max(parseInt(level), 0), 100);
  console.log(`Setting brightness to ${level}`);
  ws281x.setBrightness(Math.floor((brightness / 100 ) * 255));
  ws281x.render(pixels);
  res.send(`Brightness set to level ${level}`);
});

app.post(`/color`, (req, res) => {
  const { hex } = req.body;
  console.log(`Setting colour to ${hex}`);
  
  if (!/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
    return res.status(400).send("Invalid hex format");
  }

  // Remove leading # and parse hex value into integer
  const color = parseInt(hex.replace(/^#/, ''), 16);

  // Fill all pixels
  pixels.fill(color);
  ws281x.render(pixels);

  res.send(`Colour set to ${hex}`);
});

// Server start
app.listen(PORT, () => {
  console.log(`Smartlight backend running on ${PORT}`);
});

// Server shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down gracefully...');
  ws281x.reset();
  process.exit(0);
});