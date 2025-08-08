import {useState, useEffect} from 'react';
import ColourModal from '../../components/colourModal';

const SolidColours = () => {
  const [rgbColor, setRgbColor] = useState({r: 255, g: 0, b: 0}); // set to red by default
  const [brightness, setBrightness]= useState(50);

  const [showSelectModal, setShowSelectModal] = useState(false);
  const [modalColour, setModalColour] = useState('#ffffff');
  const [savedColours, setSavedColours] = useState(() => {
    const stored = localStorage.getItem('saved');
    return stored ? JSON.parse(stored) : [];
  });

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

  const handleConfirmSave = () => {
    if (savedColours.length >= 10) {
      alert("You can only save up to 10 colours.");
      return;
    }
    setSavedColours([...savedColours, modalColour]);
    setShowSelectModal(false);
  }

  useEffect(() => {
    localStorage.setItem('saved', JSON.stringify(savedColours));
  }, [savedColours]);
  
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 rounded-2xl shadow-xl space-y-6 bg-dark">
        <div>
          <label className="block text-lg font-semibold text-light mb-2">Brightness</label>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={brightness}
            className="w-full accent-primary" 
            onChange={(e) => setBrightness(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-light mb-2"> Set Colour</label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={`#${((1 << 24) + (rgbColor.r << 16) + (rgbColor.g << 8) + rgbColor.b).toString(16).slice(1)}`}
              className="w-20 h-10 border border-gray-400 rounded hover:cursor-pointer"
              onChange={handleColorChange}
            />
            <p className="text-light">Selected RGB: ({rgbColor.r}, {rgbColor.g}, {rgbColor.b})</p>
          </div>
        </div>
        <div>
          <label className="block text-lg font-semibold text-light mb-2"> Saved Colours </label>
          <div>
            <button
              className={`w-10 h-10 rounded-full bg-light text-black flex items-center justify-center text-xl hover:bg-primary-dark transition duration-200 ${
                savedColours.length >= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-light hover:bg-primary-dark"
              }`}
              onClick={() => setShowSelectModal(true)}
            >
              +
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {savedColours.map((colour, index) => (
            <div key={index} className="relative group">
              <>
                <button
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-white shadow"
                  style={{ backgroundColor: colour }}
                  onClick={() => {
                    const r = parseInt(colour.slice(1, 3), 16);
                    const g = parseInt(colour.slice(3, 5), 16);
                    const b = parseInt(colour.slice(5, 7), 16);
                    setRgbColor({ r, g, b});
                  }}
                />

                <button
                  className="absolute top-0 right-0 w-5 h-5 bg-gray-600 text-s rounded-full hidden group-hover:flex items-center justify-center"
                  onClick={() => {
                    setModalColour(colour);
                    setShowSelectModal(true);
                  }}
                  title="Edit Colour"
                >
                  ✎
                </button>

                <button
                  className="absolute bottom-0 right-0 w-5 h-5 bg-gray-500 text-white text-s rounded-full hidden group-hover:flex items-center justify-center"
                  onClick={() => {
                    const updated = savedColours.filter((_, i) => i !== index);
                    setSavedColours(updated);
                  }}
                  title="Delete Colour"
                >
                  🗑️
                </button>
              </>
            </div>
          ))}    
        </div>
        <div className="flex justify-between items-center">
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
        </div>
      </div>
      {showSelectModal && (
        <ColourModal
          selectedColour={modalColour}
          setSelectedColour={setModalColour}
          onConfirm={handleConfirmSave}
          onCancel={() => setShowSelectModal(false)}
        />
      )}
    </>
  );
}

export default SolidColours;