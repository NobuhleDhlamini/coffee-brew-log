import BrewItem from "./BrewItem";

function BrewList({ brews, onEdit, onDelete }) {
  if (brews.length === 0) {
    return (
      <div className="empty-state">

        <div className="empty-icon">
          ☕
        </div>

        <h3>
          Your journal is empty
        </h3>

        <p>
          Log your first brew and start building
          your coffee collection.
        </p>

      </div>
    );
  }

  return (
    <div className="row g-4">

      {brews.map((brew) => (
        <div
          className="col-12 col-md-6 col-lg-4"
          key={brew.id}
        >
          <BrewItem
            brew={brew}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </div>
      ))}

    </div>
  );
}

export default BrewList;