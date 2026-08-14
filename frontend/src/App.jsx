import { useEffect, useState } from "react";

import BrewForm from "./components/BrewForm";
import BrewList from "./components/BrewList";
import BrewFilter from "./components/BrewFilter";

import {
  getBrews,
  createBrew,
  updateBrew,
  deleteBrew,
} from "./services/brewApi";

function App() {
  const [brews, setBrews] = useState([]);
  const [method, setMethod] = useState("");
  const [editingBrew, setEditingBrew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBrews = async () => {
    try {
      setLoading(true);

      const data = await getBrews(method);

      setBrews(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrews();
  }, [method]);

  const handleSubmit = async (brew) => {
    try {
      if (editingBrew) {
        await updateBrew(editingBrew.id, brew);
        setEditingBrew(null);
      } else {
        await createBrew(brew);
      }

      await loadBrews();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this brew?"
    );

    if (!confirmed) return;

    try {
      await deleteBrew(id);
      await loadBrews();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">

      {/* HERO */}
      <header className="hero">
        <div className="container hero-content">

          <div className="brand">
            ☕ Brew Lab
          </div>

          <h1>
            Brews: {brews.length}
          </h1>

          <p className="hero-description">
            Your personal coffee journal. Record every recipe,
            experiment with methods, and keep track of the cups
            worth making again.
          </p>

        </div>
      </header>

      {/* MAIN */}
      <main className="container main-content">

        {/* FORM */}
        <BrewForm
          onSubmit={handleSubmit}
          editingBrew={editingBrew}
          onCancel={() => setEditingBrew(null)}
        />

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* FILTER */}
        <BrewFilter
          method={method}
          setMethod={setMethod}
        />

        <div className="section-label">
          Your Coffee Journal
        </div>

        <h2 className="section-title">
          Recent Brews
        </h2>

        {loading ? (
          <div className="empty-state">
            <div className="empty-icon">☕</div>
            <h3>Preparing your coffee log...</h3>
          </div>
        ) : (
          <BrewList
            brews={brews}
            onEdit={setEditingBrew}
            onDelete={handleDelete}
          />
        )}

      </main>

      <footer className="footer">
        <div className="container">
          Made for coffee people · Brew Lab
        </div>
      </footer>

    </div>
  );
}

export default App;