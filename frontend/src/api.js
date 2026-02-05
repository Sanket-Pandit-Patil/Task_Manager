const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const isJson =
    response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message =
      data?.detail || data?.error || `Request failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function getTasks() {
  return request("/tasks/");
}

export async function createTask(title) {
  return request("/tasks/", {
    method: "POST",
    body: JSON.stringify({ title })
  });
}

export async function updateTask(id, partial) {
  return request(`/tasks/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(partial)
  });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}/`, {
    method: "DELETE"
  });
}

