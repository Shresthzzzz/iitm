import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "📊" },
  { to: "/events", label: "Events", icon: "📅" },
  { to: "/create", label: "Create Event", icon: "➕" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">🎓</span>
        <h2>Event Manager</h2>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}