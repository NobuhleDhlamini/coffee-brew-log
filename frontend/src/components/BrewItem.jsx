function BrewItem({ brew, onEdit, onDelete }) {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <div className="brew-card">

      <div className="brew-card-top">

        <h3 className="brew-name">
          {brew.name}
        </h3>

        <span className="method-badge">
          {brew.method}
        </span>

      </div>

      <div className="grind">
        Grind:
        {" "}
        <strong>
          {brew.grindSize}
        </strong>
      </div>

      <div className="brew-details">

        <div className="detail">
          <span className="detail-label">
            Water
          </span>

          <span className="detail-value">
            {brew.waterAmount} ml
          </span>
        </div>

        <div className="detail">
          <span className="detail-label">
            Coffee
          </span>

          <span className="detail-value">
            {brew.coffeeAmount} g
          </span>
        </div>

        <div className="detail">
          <span className="detail-label">
            Time
          </span>

          <span className="detail-value">
            {formatTime(brew.brewTime)}
          </span>
        </div>

      </div>

      <div className="card-actions">

        <button
          className="btn-edit"
          onClick={() => onEdit(brew)}
        >
          Edit
        </button>

        <button
          className="btn-delete"
          onClick={() => onDelete(brew.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default BrewItem;