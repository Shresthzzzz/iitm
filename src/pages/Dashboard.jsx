import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/storage";
import { formatEventDate, isEventToday } from "../utils/dateFormatter";
import StatCard from "../components/StatCard";

const statusColors = {
  completed: "#57f287",
  cancelled: "#ed4245",
  ongoing: "#f0b232",
  upcoming: "#5865f2",
};

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = () => {
      try {
        setEvents(getEvents());
      } catch (err) {
        console.error("Failed to load events:", err);
        setEvents([]);
      }
    };

    loadEvents();

    const interval = setInterval(loadEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const total = events.length;
  const upcoming = events.filter((e) => e.status === "upcoming").length;
  const completed = events.filter((e) => e.status === "completed").length;
  const cancelled = events.filter((e) => e.status === "cancelled").length;

  const recentEvents = [...events]
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2 className="page-title">Dashboard</h2>
      <div className="stats-grid">
        <StatCard icon="📅" label="Total Events" value={total} color="#5865f2" />
        <StatCard icon="📌" label="Upcoming" value={upcoming} color="#3b82f6" />
        <StatCard icon="✅" label="Completed" value={completed} color="#57f287" />
        <StatCard icon="❌" label="Cancelled" value={cancelled} color="#ed4245" />
      </div>

      <div className="recent-events">
        <h3 className="section-title">Recent Events</h3>
        {recentEvents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h3>No events yet</h3>
            <p>
              Create your first college event and announce it directly to Discord.
            </p>
            <Link to="/create" className="primary-button">
              + Create Event
            </Link>
          </div>
        ) : (
          <div className="events-list">
            {recentEvents.map((event) => {
              const date = formatEventDate(event.date);
              return (
                <div key={event.id} className="recent-event-item">
                  <div className="event-row-date">
                    <span>{date.day}</span>
                    <small>{date.month}</small>
                  </div>
                  <div className="event-row-info">
                    <span className="recent-event-title">{event.title}</span>
                    <span className="recent-event-date">
                      {date.full}
                      {isEventToday(event.date) ? " · Today" : ""}
                    </span>
                  </div>
                  <span
                    className="event-status"
                    style={{ background: statusColors[event.status] || "#5865f2" }}
                  >
                    {event.status?.toUpperCase() || "UPCOMING"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}