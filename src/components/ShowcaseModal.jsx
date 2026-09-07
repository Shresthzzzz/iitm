import { useEffect, useState } from "react";

function ShowcaseModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="showcase-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-title"
    >
      <div className="showcase-modal">
        <button
          className="showcase-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          ×
        </button>

        <div className="showcase-icon">
          🎓
        </div>

        <div className="showcase-content">
          <div className="showcase-label">
            COLLEGE PROJECT
          </div>

          <h2 id="showcase-title">
            College Event Manager
          </h2>

          <p>
            This is a college event management project made by{" "}
            <strong>Shresth</strong>, particularly for showcase purposes.
          </p>

          <p className="showcase-subtext">
            This project demonstrates a frontend-only event management
            experience with event creation, management and Discord
            announcements.
          </p>

          <button
            className="showcase-button"
            onClick={() => setIsOpen(false)}
          >
            <span>✓</span>
            Got it — Enter Showcase
          </button>
        </div>

        <div className="showcase-footer">
          Made with React + Vite
        </div>
      </div>
    </div>
  );
}

export default ShowcaseModal;