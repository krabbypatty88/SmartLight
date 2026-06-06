import {useState, useEffect} from 'react';
import SolidColours from './dashboardTabs/solid';
import PatternColours from './dashboardTabs/pattern';
import AssistantMode from './dashboardTabs/assistant';
import SettingsModal from '../components/settingsModal';

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState('solid');
  const [showSettings, setShowSettings] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'solid':
        return <SolidColours/>
      case 'patterns':
        return <PatternColours/>
      case 'assistant':
        return <AssistantMode/>
      default: 
        return <SolidColours/>
    }
  }
  
  return (
    <div className="w-full h-screen px-6 py-10 bg-light">
      <div className="mb-10 flex justify-between items-center">
        <div className="flex-1 text-center">
          <h1 className="text-4xl font-extrabold text-dark">SmartLight</h1>
          <p className="text-gray-700 mt-2">Fine-tuned lighting control</p>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200 text-sm"
          title="Backend Settings"
        >
          ⚙️ Settings
        </button>
      </div>

      <div className="text-center">
        {['solid', 'patterns', 'assistant'].map((tab) => (
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
      
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}

export default Dashboard;