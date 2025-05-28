
const ColourModal = ({ selectedColour, setSelectedColour, onConfirm, onCancel }) => {

  // Whenever selectedColour changes, the component re-renders and the r,g,b values are re-computed
  const r = parseInt(selectedColour.slice(1, 3), 16);
  const g = parseInt(selectedColour.slice(3, 5), 16);
  const b = parseInt(selectedColour.slice(5, 7), 16);

  const updateColorComponent = (channel, value) => {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0));
    // creates new object with original rgb values, and overwrites one channel with the updated value
    const updated = {
      r,
      g, 
      b,
      [channel]: num,
    };

    const hex = `#${((1 << 24) + (updated.r << 16) + (updated.g << 8) + updated.b)
      .toString(16)
      .slice(1)
    }`;
    setSelectedColour(hex);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark bg-opacity-50"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      
      >
        <h2 className="text-xl font-semibold text-center mb-4">Pick a Colour</h2>

        {/* Hex Colour Input */}
        <div className="flex flex-col items-center justify-center mb-6">
          <input
            type="color"
            value={selectedColour}
            onChange={(e) => setSelectedColour(e.target.value)}
            className="w-full h-16 border border-black rounded-xl"
          />
        </div>

        {/* RGB Inputs */}
        <div className="flex justify-around mb-6">
          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700">R</label>
            <input
              type="number"
              min="0"
              max="255"
              value={r}
              onChange={(e) => updateColorComponent('r', e.target.value)}
              className="w-16 px-2 py-1 border rounded text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700">G</label>
            <input
              type="number"
              min="0"
              max="255"
              value={g}
              onChange={(e) => updateColorComponent('g', e.target.value)}
              className="w-16 px-2 py-1 border rounded text-center"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-sm font-medium text-gray-700">B</label>
            <input
              type="number"
              min="0"
              max="255"
              value={b}
              onChange={(e) => updateColorComponent('b', e.target.value)}
              className="w-16 px-2 py-1 border rounded text-center"
            />
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColourModal;
