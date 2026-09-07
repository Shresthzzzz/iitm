const STORAGE_KEY = "college_events";

export function getEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEvent(event) {
  const events = getEvents();
  events.push(event);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return event;
}

export function updateEvent(updated) {
  const events = getEvents().map((e) =>
    e.id === updated.id ? updated : e
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return updated;
}

export function deleteEvent(id) {
  const events = getEvents().filter((e) => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  return id;
}

export function generateId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substr(2, 6)
  );
}