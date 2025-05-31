import {useState} from 'react';
import SolidColours from './colourDashboards/solid';
import PatternColours from './colourDashboards/pattern';

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('solid');

  const renderContent = () => {
    switch (activeTab) {
      case 'solid':
        return <SolidColours/>
      case 'patterns':
        return <PatternColours/>
    }
  }
  
  return (
    <div className="w-full h-screen px-6 py-10 bg-light">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-dark">SmartLight</h1>
        <p className="text-gray-700 mt-2">Fine-tuned lighting control</p>
      </div>

      <div className="text-center">
        {['solid', 'patterns'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-2 font-semibold ${
              activeTab === tab 
                ? 'border-b 2 border-dark bg-dark text-white rounded-t-xl'
                : 'text-gray-500 hover:text-blue-500 bg-light'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div> {renderContent()} </div>
    </div>
  );
}

export default Dashboard;