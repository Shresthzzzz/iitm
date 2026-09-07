export function formatEventDate(dateString) {
  try {
    const date = new Date(`${dateString}T00:00:00`);
    return {
      day: date.toLocaleDateString('en-IN', { day: '2-digit' }),
      month: date.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase(),
      full: date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  } catch {
    return { day: '?', month: '?', full: 'Invalid Date' };
  }
}

export function isEventToday(dateString) {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
}

export function isEventPast(dateString) {
  const today = new Date().toISOString().split('T')[0];
  return dateString < today;
}