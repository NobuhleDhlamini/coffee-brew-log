const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
}/brews`;

export const getBrews = async (method = "") => {
  const url = method
    ? `${API_URL}?method=${encodeURIComponent(method)}`
    : API_URL;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch brews");
  }

  return response.json();
};

export const createBrew = async (brew) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brew),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create brew");
  }

  return response.json();
};

export const updateBrew = async (id, brew) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(brew),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update brew");
  }

  return response.json();
};

export const deleteBrew = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete brew");
  }
};