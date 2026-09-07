import { useState, useEffect } from "react";
import { getEvents } from "../services/storage";
import EventCard from "../components/EventCard";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  function loadEvents() {
    setEvents(getEvents());
  }

  useEffect(() => {
    loadEvents();
  }, []);

  function handleUpdate(updated) {
    if (updated._deleted) {
      loadEvents();
      return;
    }
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  }

  const filteredEvents = events
    .filter((e) => filter === "all" || e.status === filter)
    .filter((e) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        e.title?.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.organizer?.toLowerCase().includes(q)
      );
    });

  const sortedAndFilteredEvents = filteredEvents.sort((a, b) => {
    if (sort === "newest") return new Date(b.date) - new Date(a.date);
    if (sort === "oldest") return new Date(a.date) - new Date(b.date);
    if (sort === "name") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <div className="events-page">
      <h2 className="page-title">Events</h2>

      <div className="filters-card">
        <div className="search-box">
          <span>🔎</span>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filter by status"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label="Sort events"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">By Name</option>
        </select>
      </div>

      {sortedAndFilteredEvents.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>
          <h3>No events found</h3>
          <p>Try a different search or filter, or create a new event.</p>
        </div>
      ) : (
        <div className="events-grid">
          {sortedAndFilteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}