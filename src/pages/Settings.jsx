import { useState } from "react";

export default function Settings() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="settings-page">
      <h2 className="page-title">Settings</h2>
      <div className="settings-card">
        <h3>🎓 College Event Manager</h3>
        <p>This app sends event announcements directly to your college Discord server.</p>
        <div className="settings-info">
          <div className="info-item">
            <span className="info-label">Status</span>
            <span className="info-value active">Active</span>
          </div>
          <div className="info-item">
            <span className="info-label">Webhook</span>
            <span className="info-value">Configured in discord.js</span>
          </div>
          <div className="info-item">
            <span className="info-label">Storage</span>
            <span className="info-value">localStorage (browser)</span>
          </div>
        </div>
        {saved && <p className="save-msg">Settings saved!</p>}
        <button className="btn btn-primary" onClick={handleSave}>
          Save Settings
        </button>
      </div>
    </div>
  );
}