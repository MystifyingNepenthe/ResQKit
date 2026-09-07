const API_BASE_URL = "http://192.168.1.100:8001";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },

      ...options,
    }
  );

  if (!response.ok) {
    let errorMessage = "Eroare de comunicare cu serverul.";

    try {
      const error = await response.json();

      if (error?.detail) {
        errorMessage = error.detail;
      }
    } catch {}

    throw new Error(errorMessage);
  }

  return response.json();
}