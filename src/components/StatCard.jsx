export default function StatCard({ icon, label, value, color = "#5865f2" }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div className="stat-content">
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  );
}