import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { saveEvent, updateEvent, generateId } from "../services/storage";
import { sendEventToDiscord } from "../services/discord";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";

const emptyForm = {
  title: "",
  description: "",
  date: "",
  time: "",
  location: "",
  organizer: "",
  capacity: "",
  status: "upcoming",
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const location = useLocation();
  const editEvent = location.state?.edit;

  const initial = editEvent
    ? { ...emptyForm, ...editEvent }
    : emptyForm;

  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { toasts, showToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
  };

  const validateForm = () => {
    const errors = [];

    if (!form.title.trim()) errors.push("Event name is required");
    if (!form.date) errors.push("Date is required");
    if (!form.time) errors.push("Time is required");
    if (!form.location.trim()) errors.push("Location is required");
    if (!form.organizer.trim()) errors.push("Organizer is required");

    if (form.capacity && isNaN(Number(form.capacity))) {
      errors.push("Capacity must be a number");
    }

    return errors;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    const errors = validateForm();

    if (errors.length > 0) {
      setError(errors[0]);
      showToast(errors[0], "error");
      setSending(false);
      return;
    }

    const payload = {
      ...form,
      capacity: form.capacity ? String(form.capacity) : "",
    };

    if (editEvent) {
      const updated = { ...editEvent, ...payload };
      updateEvent(updated);
      showToast("Event updated!", "success");
    } else {
      const newEvent = { ...payload, id: generateId() };
      saveEvent(newEvent);
      try {
        await sendEventToDiscord(newEvent);
        showToast("Event created and announced on Discord!", "success");
      } catch {
        showToast("Event saved locally (Discord not configured).", "warning");
      }
    }

    setSending(false);
    setTimeout(() => navigate("/events"), 600);
  }

  return (
    <div className="create-event">
      <h2 className="page-title">{editEvent ? "Edit Event" : "Create Event"}</h2>
      {error && <div className="form-error">{error}</div>}
      <form className="event-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Event Title *</label>
          <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Techfest 2026" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What's this event about?" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Time *</label>
            <input name="time" type="time" value={form.time} onChange={handleChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Location *</label>
            <input name="location" value={form.location} onChange={handleChange} required placeholder="e.g. Main Auditorium" />
          </div>
          <div className="form-group">
            <label>Organizer *</label>
            <input name="organizer" value={form.organizer} onChange={handleChange} required placeholder="e.g. CS Department" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Capacity</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} placeholder="Leave blank for unlimited" />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={sending}>
            {sending ? "Saving..." : editEvent ? "Update Event" : "🚀 Create & Announce"}
          </button>
        </div>
      </form>
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