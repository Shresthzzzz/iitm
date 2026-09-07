import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendCancellationToDiscord } from "../services/discord";
import { updateEvent, deleteEvent } from "../services/storage";
import ConfirmDialog from "./ConfirmDialog";
import Toast from "./Toast";
import { useToast } from "../hooks/useToast";

const statusColors = {
  upcoming: "#5865f2",
  ongoing: "#5865f2",
  completed: "#57f287",
  cancelled: "#ed4245",
};

export default function EventCard({ event, onUpdate }) {
  const navigate = useNavigate();
  const { toasts, showToast } = useToast();

  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const handleCancel = () => {
    setCancelReason("");
    setError("");
    setShowCancelDialog(true);
  };

  const confirmCancel = async () => {
    if (!cancelReason.trim()) {
      setError("⚠️ Please provide a reason for cancellation");
      return;
    }

    setSending(true);
    const updated = { ...event, status: "cancelled" };
    onUpdate(updated);
    updateEvent(updated);

    try {
      await sendCancellationToDiscord(updated, cancelReason);
      showToast("Cancellation announced to Discord.", "success");
    } catch (err) {
      showToast(`Discord announcement failed: ${err.message}`, "warning");
    } finally {
      setSending(false);
      setShowCancelDialog(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    deleteEvent(event.id);
    onUpdate({ ...event, _deleted: true });
    showToast("Event deleted.", "success");
    setShowDeleteDialog(false);
  };

  return (
    <div
      className="event-card"
      style={{ borderTop: `4px solid ${statusColors[event.status] || "#5865f2"}` }}
    >
      <div className="event-card-header">
        <h3>{event.title}</h3>
        <span
          className="event-status"
          style={{ background: statusColors[event.status] || "#5865f2" }}
        >
          {event.status?.toUpperCase() || "UPCOMING"}
        </span>
      </div>
      <p className="event-description">{event.description || "No description."}</p>
      <div className="event-details">
        <span>📆 {event.date}</span>
        <span>⏰ {event.time || "TBA"}</span>
        <span>📍 {event.location || "TBA"}</span>
        <span>👤 {event.organizer || "TBA"}</span>
        <span>👥 {event.capacity || "Unlimited"}</span>
      </div>
      <div className="event-actions">
        <button className="btn btn-secondary" onClick={() => navigate("/create", { state: { edit: event } })}>
          Edit
        </button>
        {event.status !== "cancelled" && (
          <button className="btn btn-warning" onClick={handleCancel}>
            Cancel
          </button>
        )}
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>

      {(showCancelDialog || showDeleteDialog) && (
        <ConfirmDialog
          title={showCancelDialog ? "Cancel Event" : "Delete Event"}
          message={
            showCancelDialog
              ? "Why is this event being cancelled?"
              : "This action cannot be undone. Are you sure?"
          }
          onConfirm={showCancelDialog ? confirmCancel : confirmDelete}
          onCancel={() => {
            setShowCancelDialog(false);
            setShowDeleteDialog(false);
          }}
          isDangerous={true}
        />
      )}

      {showCancelDialog && (
        <div className="modal-overlay" style={{ background: "transparent" }}>
          <div className="modal-content">
            <h3>Cancellation Reason</h3>
            <input
              className="modal-input"
              type="text"
              value={cancelReason}
              onChange={(e) => {
                setCancelReason(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Venue unavailable"
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setShowCancelDialog(false)}>
                Close
              </button>
              <button className="danger-button" onClick={confirmCancel} disabled={sending}>
                {sending ? "Sending..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="toast-container">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            message={t.message}
            type={t.type}
            duration={t.duration}
            onClose={() => {}}
          />
        ))}
      </div>
    </div>
  );
}