import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  method: "",
  grindSize: "",
  waterAmount: "",
  coffeeAmount: "",
  brewTime: "",
};

function BrewForm({ onSubmit, editingBrew, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingBrew) {
      setForm({
        name: editingBrew.name,
        method: editingBrew.method,
        grindSize: editingBrew.grindSize,
        waterAmount: editingBrew.waterAmount,
        coffeeAmount: editingBrew.coffeeAmount,
        brewTime: editingBrew.brewTime,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingBrew]);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasBlankField = Object.values(form).some(
      (value) => String(value).trim() === ""
    );

    if (hasBlankField) {
      setError("Please complete all fields before saving.");
      return;
    }

    setError("");

    await onSubmit({
      ...form,
      waterAmount: Number(form.waterAmount),
      coffeeAmount: Number(form.coffeeAmount),
      brewTime: Number(form.brewTime),
    });

    if (!editingBrew) {
      setForm(emptyForm);
    }
  };

  return (
    <div className="brew-form">

      <div className="form-heading">
        <div className="section-label">
          {editingBrew ? "Update Recipe" : "Coffee Ritual"}
        </div>

        <h2>
          {editingBrew ? "Edit your brew" : "Log a new brew"}
        </h2>

        <p>
          {editingBrew
            ? "Fine-tune the recipe and save your changes."
            : "Capture the details behind your perfect cup."}
        </p>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="row g-4">

          <div className="col-12">
            <label className="form-label">
              Brew Name
            </label>

            <input
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Morning V60"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              Brew Method
            </label>

            <select
              className="form-select"
              name="method"
              value={form.method}
              onChange={handleChange}
            >
              <option value="">
                Select a method
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

          <div className="col-md-6">
            <label className="form-label">
              Grind Size
            </label>

            <input
              className="form-control"
              name="grindSize"
              value={form.grindSize}
              onChange={handleChange}
              placeholder="Medium"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Water (ml)
            </label>

            <input
              type="number"
              className="form-control"
              name="waterAmount"
              value={form.waterAmount}
              onChange={handleChange}
              placeholder="300"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Coffee (g)
            </label>

            <input
              type="number"
              className="form-control"
              name="coffeeAmount"
              value={form.coffeeAmount}
              onChange={handleChange}
              placeholder="20"
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              Brew Time (sec)
            </label>

            <input
              type="number"
              className="form-control"
              name="brewTime"
              value={form.brewTime}
              onChange={handleChange}
              placeholder="180"
            />
          </div>

        </div>

        <div className="mt-4 d-flex gap-2">

          <button
            className="btn-coffee"
            type="submit"
          >
            {editingBrew
              ? "Save Changes"
              : "＋ Save Brew"}
          </button>

          {editingBrew && (
            <button
              type="button"
              className="btn-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}

        </div>

      </form>
    </div>
  );
}

export default BrewForm;