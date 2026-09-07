function ConfirmDialog({ title, message, onConfirm, onCancel, isDangerous = false }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className={isDangerous ? "danger-button" : "primary-button"}
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;