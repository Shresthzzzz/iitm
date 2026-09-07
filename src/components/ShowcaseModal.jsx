import { useEffect, useState } from "react";

function ShowcaseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

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

        {!showWorkflow ? (
          <>
            <div className="showcase-icon">🎓</div>

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
                A frontend-only application for creating, managing and
                organizing college events.
              </p>

              <div className="showcase-actions">
                <button
                  className="showcase-workflow-button"
                  onClick={() => setShowWorkflow(true)}
                >
                  <span>⚙</span>
                  Check Site Workflow
                </button>

                <button
                  className="showcase-button"
                  onClick={() => setIsOpen(false)}
                >
                  <span>✓</span>
                  Got it — Enter Showcase
                </button>
              </div>
            </div>

            <div className="showcase-footer">
              Made with React + Vite
            </div>
          </>
        ) : (
          <>
            <div className="workflow-icon">⚡</div>

            <div className="workflow-content">
              <div className="showcase-label">
                APPLICATION WORKFLOW
              </div>

              <h2>How It Works</h2>

              <p className="workflow-intro">
                Event actions inside the application automatically trigger
                Discord notifications using the configured Discord webhook.
              </p>

              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="workflow-number">1</div>

                  <div className="workflow-step-content">
                    <strong>Create Event</strong>
                    <span>
                      User fills in the event details and creates an event.
                    </span>
                  </div>
                </div>

                <div className="workflow-arrow">↓</div>

                <div className="workflow-step">
                  <div className="workflow-number">2</div>

                  <div className="workflow-step-content">
                    <strong>Event Saved</strong>
                    <span>
                      The event is added to the application's event list.
                    </span>
                  </div>
                </div>

                <div className="workflow-arrow">↓</div>

                <div className="workflow-step discord-step">
                  <div className="workflow-number">3</div>

                  <div className="workflow-step-content">
                    <strong>Discord Notification Sent</strong>
                    <span>
                      A notification is sent to Discord through the webhook.
                    </span>
                  </div>
                </div>

                <div className="workflow-divider">
                  The same Discord notification workflow also runs when an
                  event is removed.
                </div>

                <div className="workflow-step remove-step">
                  <div className="workflow-number">×</div>

                  <div className="workflow-step-content">
                    <strong>Remove Event</strong>
                    <span>
                      The event is deleted and a removal notification is sent
                      to Discord using the webhook.
                    </span>
                  </div>
                </div>
              </div>

              <div className="workflow-note">
                🔔 Notifications are sent for event creation and event removal.
              </div>

              <div className="workflow-actions">
                <button
                  className="workflow-back-button"
                  onClick={() => setShowWorkflow(false)}
                >
                  ← Back
                </button>

                <button
                  className="showcase-button workflow-enter-button"
                  onClick={() => setIsOpen(false)}
                >
                  ✓ Enter Showcase
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShowcaseModal;