import { apiRequest } from "./apiClient";

export async function createIncidentReportShare({
  incident,
  brief,
  includeHealthData = false,
}) {
  if (!incident) {
    throw new Error("Nu există o sesiune de incident.");
  }

  const response = await apiRequest("/api/v1/incident-reports/share", {
    method: "POST",

    auth: false,

    body: JSON.stringify({
      session_id: incident.backendSessionId || null,
      session_code: incident.sessionCode || null,
      incident_id: incident.id || null,
      expires_in_minutes: 120,
      include_health_data: Boolean(includeHealthData),

      report: {
        brief: brief || "",
        started_at: incident.startedAt || null,
        ended_at: new Date().toISOString(),

        location_summary: incident.locationNote || null,
        latitude: incident.latitude ?? null,
        longitude: incident.longitude ?? null,
        location_accuracy: incident.accuracy ?? null,

        victim_count: incident.victims?.length || 1,

        victims: (incident.victims || []).map((victim) => ({
          label: victim.label || null,
          age_profile: victim.ageProfile || null,
          situation: victim.situation || null,
          status: victim.status || null,
          completed_steps: victim.completedSteps || [],
        })),

        hazards: incident.hazards || [],
        kit_items: incident.kitItems || [],
        called_112: incident.called112 || "not_confirmed",
        procedure_id: incident.victims?.[0]?.protocolNodeId || null,
      },
    }),
  });

  const shareUrl =
    response?.share_url ||
    response?.url ||
    response?.public_url;

  if (!shareUrl) {
    throw new Error(
      "Backend-ul nu a returnat linkul public al raportului."
    );
  }

  return {
    shareUrl,
    expiresAt: response?.expires_at || null,
    shareId: response?.share_id || response?.id || null,
  };
}