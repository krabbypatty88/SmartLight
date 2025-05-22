import {useState} from 'react';

const App = () => {

  const [rgbColor, setRgbColor] = useState({r: 255, g: 0, b: 0}); // set to red by default
  const [brightness, setBrightness]= useState(50);

  const handleColorChange = (e) => {
    const hex = e.target.value;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    setRgbColor({r, g, b});
  };

  const configureLight = async () => {
    try {
      const response = await fetch("http://10.1.1.93:5000/api/set-light", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          r: rgbColor.r,
          g: rgbColor.g,
          b: rgbColor.b,
          brightness: parseInt(brightness)
        }),
      });

      if (!response.ok) throw new Error("Failed to send light configuration");

      console.log("Light configured successfully");
    } catch (e) {
      console.error("Error:", e.message);
    }
  }

  const resetLight = () => {
    setRgbColor({r:255, g: 0, b: 0});
    setBrightness(50);
  }
  
  return (
    <div className="min-h-screen px-6 py-10 bg-light">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-dark">SmartLight</h1>
        <p className="text-gray-700 mt-2">Fine-tuned lighting control</p>
      </header>

      {/* Control Panel */}
      <main className="max-w-2xl mx-auto p-6 rounded-2xl shadow-xl space-y-6 bg-dark">
        <section>
          <label className="block text-lg font-semibold text-light mb-2">Brightness</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={brightness}
            className="w-full accent-primary" 
            onChange={(e) => setBrightness(e.target.value)}
          />
        </section>

        {/* Colour Picker */}
        <section>
          <label className="block text-lg font-semibold text-light mb-2">Colour</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={`#${((1 << 24) + (rgbColor.r << 16) + (rgbColor.g << 8) + rgbColor.b).toString(16).slice(1)}`}
              className="w-20 h-10 border border-gray-400 rounded hover:cursor-pointer"
              onChange={handleColorChange}
            />
            <p className="text-light">Selected RGB: ({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="flex justify-between items-center">
          <button 
            className="bg-primary text-light px-4 py-2 rounded-md hover:bg-primary-dark transition duration-200"
            onClick={() => configureLight()}
          >
            Apply
          </button>
          <button 
            className="bg-primary text-light px-4 py-2 rounded-md hover:bg-primary-dark hover:text-white transition duration-200"
            onClick={() => resetLight()}
          >
            Reset
          </button>
        </section>
      </main>
    </div>
  );
};

export default App;