import { useState, useEffect } from 'react';
import { getBackendUrl, setBackendUrl, isElectron } from '../utils/backendConfig';
import '../styles/settingsModal.css';

const SettingsModal = ({ isOpen, onClose, onSave }) => {
  const [backendUrl, setUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadCurrentUrl();
    }
  }, [isOpen]);

  const loadCurrentUrl = async () => {
    const url = await getBackendUrl();
    setUrl(url);
  };

  const handleSave = async () => {
    if (!backendUrl.trim()) {
      setSaveStatus({ type: 'error', message: 'URL cannot be empty' });
      return;
    }

    // Basic URL validation
    try {
      new URL(backendUrl);
    } catch (error) {
      setSaveStatus({ type: 'error', message: 'Invalid URL format' });
      return;
    }

    setIsSaving(true);
    const result = await setBackendUrl(backendUrl);

    if (result.success) {
      setSaveStatus({ type: 'success', message: 'Settings saved successfully!' });
      setTimeout(() => {
        setSaveStatus(null);
        onClose();
      }, 1500);
    } else {
      setSaveStatus({ type: 'error', message: 'Failed to save settings' });
    }
    setIsSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal">
        <div className="settings-modal-header">
          <h2>Backend Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="settings-modal-content">
          <div className="settings-form-group">
            <label htmlFor="backend-url">Backend URL:</label>
            <input
              id="backend-url"
              type="text"
              value={backendUrl}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="http://10.1.1.93:5000"
              className="settings-input"
            />
            <small className="settings-hint">
              Enter the URL of your backend server (e.g., http://your-pi-ip:5000)
            </small>
          </div>

          {saveStatus && (
            <div className={`settings-status ${saveStatus.type}`}>
              {saveStatus.message}
            </div>
          )}

          <div className="settings-modal-footer">
            <button
              className="settings-btn settings-btn-cancel"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              className="settings-btn settings-btn-save"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
