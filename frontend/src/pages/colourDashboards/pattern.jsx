import {useState, useEffect} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const PatternColours = () => {
  const [brightness, setBrightness] = useState(50);
  const [selectedPattern, setSelectedPattern] = useState(() => {
    const pattern = localStorage.getItem('pattern');
    return pattern !== "undefined" ? JSON.parse(pattern) : null;
  });
  const options = ["Colour Bounce", "Fade", "Smooth Fade", "Loading", "Ripple", "Random", "Snake", "Thinking", "Firework", "Breathing"];
  const filteredOptions = [
    '(Clear Selection)',
    ...options.filter((pattern) => pattern !== selectedPattern)
  ];

  const selectPattern = (value) => {
    setSelectedPattern(value === '(Clear Selection)' ? null : value);
  };

  const configureLight = async () => {
    try {
      const response = await fetch("http://10.1.1.93:5000/api/set-pattern", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pattern: selectedPattern,
          brightness: parseInt(brightness)
        }),
      });

      if (!response.ok) throw new Error("Failed to send light configuration")
    } catch (e) {
      console.error("Error:", e.message);
    }
  }

  const resetLight = () => {
    setSelectedPattern(null);
    setBrightness(50);
  }

  useEffect(() => {
    if (selectedPattern === null) {
      localStorage.removeItem('pattern');
    } else {
      localStorage.setItem('pattern', JSON.stringify(selectedPattern));
    }
  }, [selectedPattern]);

  return (
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
        <label className="block text-lg font-semibold text-light mb-2">Set Pattern</label>  	
      </div>
        <DropdownButton 
          id="dropdown-basic-button" 
          title={selectedPattern || "Select Light Pattern"} 
          variant="secondary" 
          onSelect={selectPattern}
        >
          {(selectedPattern ? filteredOptions : options).map((option, index) => (
            <Dropdown.Item key={index} eventKey={option} >{option}</Dropdown.Item>
          ))}
        </DropdownButton>
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
  );

}

export default PatternColours;