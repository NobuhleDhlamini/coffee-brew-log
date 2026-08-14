function BrewFilter({ method, setMethod }) {
  return (
    <div className="filter-box">

      <div>
        <div className="section-label mb-1">
          Explore
        </div>

        <strong>
          Filter your brews
        </strong>
      </div>

      <select
        className="form-select"
        value={method}
        onChange={(event) =>
          setMethod(event.target.value)
        }
      >
        <option value="">
          All methods
        </option>

        <option value="V60">
          V60
        </option>

        <option value="French Press">
          French Press
        </option>

        <option value="Aeropress">
          Aeropress
        </option>

        <option value="Chemex">
          Chemex
        </option>

        <option value="Espresso">
          Espresso
        </option>
      </select>

    </div>
  );
}

export default BrewFilter;