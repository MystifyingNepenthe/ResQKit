import { apiRequest } from "./apiClient";

export async function sendAIMessage(messages) {
  return apiRequest(
    "/api/v1/resqkit/chat",
    {
      method: "POST",

      body: JSON.stringify({
        messages,
      }),
    }
  );
}