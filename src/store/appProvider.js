import { useCallback, useEffect, useMemo, useState } from "react";
import { useNetworkState } from "expo-network";

import AppContext from "./appContext";
import i18n from "../localization/i18n";
import {
  DEFAULT_CONSENT,
  DEFAULT_SAFETY_PROFILE,
  DEFAULT_SETTINGS,
  STORAGE_KEYS,
  appendInstitutionalLog,
  closeAndRetainIncident,
  deleteRetainedIncident,
  loadAppData,
  getJSON,
  newIncident,
  newVictim,
  removeKey,
  setJSON,
} from "../services/storageService";
import { getAuthToken } from "../services/apiClient";
import * as authService from "../services/authService";

const EMPTY_USER = { firstName: "", lastName: "", email: "", profilePicture: null };
const EMPTY_VEHICLE = { model: "", plate: "", vin: "" };

function backendUserToLocal(backendUser, fallback = EMPTY_USER) {
  if (!backendUser) return fallback;
  const parts = (backendUser.name || "").trim().split(/\s+/).filter(Boolean);
  return {
    ...fallback,
    id: backendUser.id,
    email: backendUser.email || fallback.email,
    firstName: parts[0] || fallback.firstName || "",
    lastName: parts.slice(1).join(" ") || fallback.lastName || "",
    name: backendUser.name || "",
    role: backendUser.role || "user",
  };
}

function normalizeKit(kit = {}) {
  const now = new Date().toISOString();
  return {
    id: kit.id || `kit-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    label: String(kit.label || "").trim() || "Trusa medicală",
    kitType: kit.kitType || kit.kit_type || "vehicle",
    locationNote: kit.locationNote || kit.location_note || "",
    itemCodes: Array.isArray(kit.itemCodes)
      ? [...new Set(kit.itemCodes)]
      : Array.isArray(kit.contents)
        ? [...new Set(kit.contents)]
        : [],
    source: kit.source || "manual",
    lastChecked: kit.lastChecked || kit.last_checked || now,
    createdAt: kit.createdAt || now,
    updatedAt: kit.updatedAt || kit.updated_at || now,
  };
}

export default function AppProvider({ children }) {
  const networkState = useNetworkState();
  const online = networkState.isInternetReachable ?? networkState.isConnected ?? true;

  const [user, setUserState] = useState(EMPTY_USER);
  const [vehicle, setVehicleState] = useState(EMPTY_VEHICLE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const [consent, setConsentState] = useState(DEFAULT_CONSENT);
  const [safetyProfile, setSafetyProfileState] = useState(DEFAULT_SAFETY_PROFILE);
  const [settings, setSettingsState] = useState(DEFAULT_SETTINGS);
  const [incident, setIncidentState] = useState(null);
  const [retainedIncidents, setRetainedIncidents] = useState([]);
  const [institutionalLog, setInstitutionalLog] = useState([]);
  const [registeredKits, setRegisteredKitsState] = useState([]);
  const [activeKitId, setActiveKitIdState] = useState(null);
  const [aiNavigationAction, setAiNavigationAction] = useState(null);
  const [aiConversationScope, setAiConversationScope] = useState("general");
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    let alive = true;
    void (async () => {
      const data = await loadAppData();
      const [savedUser, savedVehicle] = await Promise.all([
        getJSON(STORAGE_KEYS.user, EMPTY_USER),
        getJSON(STORAGE_KEYS.vehicle, EMPTY_VEHICLE),
      ]);
      if (!alive) return;
      setConsentState(data.consent || DEFAULT_CONSENT);
      setSafetyProfileState(data.safetyProfile || DEFAULT_SAFETY_PROFILE);
      setSettingsState(data.settings || DEFAULT_SETTINGS);
      setIncidentState(data.incident || null);
      setRetainedIncidents(data.retained || []);
      setInstitutionalLog(data.institutionalLog || []);
      const loadedKits = Array.isArray(data.registeredKits) ? data.registeredKits.map(normalizeKit) : [];
      setRegisteredKitsState(loadedKits);
      setActiveKitIdState(data.activeKitId || loadedKits[0]?.id || null);
      setUserState(savedUser || EMPTY_USER);
      setVehicleState(savedVehicle || EMPTY_VEHICLE);
      if (data.settings?.uiLanguage) void i18n.changeLanguage(data.settings.uiLanguage);
      setAppReady(true);

      const token = await getAuthToken();
      if (!alive) return;
      if (!token) {
        setIsLoggedIn(false);
        setAuthReady(true);
        return;
      }
      try {
        const backendUser = await authService.getCurrentUser();
        if (!alive) return;
        const local = backendUserToLocal(backendUser, savedUser || EMPTY_USER);
        setUserState(local);
        await setJSON(STORAGE_KEYS.user, local);
        setIsLoggedIn(true);
      } catch {
        if (alive) setIsLoggedIn(Boolean(token));
      } finally {
        if (alive) setAuthReady(true);
      }
    })();
    return () => { alive = false; };
  }, []);

  const setUser = useCallback((value) => {
    setUserState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      void setJSON(STORAGE_KEYS.user, next);
      return next;
    });
  }, []);

  const setVehicle = useCallback((value) => {
    setVehicleState((prev) => {
      const next = typeof value === "function" ? value(prev) : value;
      void setJSON(STORAGE_KEYS.vehicle, next);
      return next;
    });
  }, []);

  const updateConsent = useCallback((patch) => {
    setConsentState((prev) => {
      const next = { ...prev, ...patch };
      void setJSON(STORAGE_KEYS.consent, next);
      return next;
    });
  }, []);

  const updateSafetyProfile = useCallback((patch) => {
    setSafetyProfileState((prev) => {
      const next = { ...prev, ...patch };
      void setJSON(STORAGE_KEYS.safetyProfile, next);
      return next;
    });
  }, []);

  const updateSettings = useCallback((patch) => {
    setSettingsState((prev) => {
      const next = {
        ...prev,
        ...patch,
        notifications: patch.notifications ? { ...prev.notifications, ...patch.notifications } : prev.notifications,
      };
      void setJSON(STORAGE_KEYS.settings, next);
      if (patch.uiLanguage) void i18n.changeLanguage(patch.uiLanguage);
      return next;
    });
  }, []);

  const saveRegisteredKit = useCallback((kit, { makeActive = true } = {}) => {
    const normalized = normalizeKit(kit);
    setRegisteredKitsState((current) => {
      const existing = current.find((entry) => entry.id === normalized.id);
      const next = existing
        ? current.map((entry) => entry.id === normalized.id ? { ...entry, ...normalized, createdAt: entry.createdAt } : entry)
        : [normalized, ...current];
      void setJSON(STORAGE_KEYS.registeredKits, next);
      return next;
    });
    if (makeActive) {
      setActiveKitIdState(normalized.id);
      void setJSON(STORAGE_KEYS.activeKitId, normalized.id);
    }
    return normalized;
  }, []);

  const deleteRegisteredKitLocal = useCallback((kitId) => {
    const next = registeredKits.filter((entry) => entry.id !== kitId);
    setRegisteredKitsState(next);
    void setJSON(STORAGE_KEYS.registeredKits, next);

    if (activeKitId === kitId) {
      const nextActive = next[0]?.id || null;
      setActiveKitIdState(nextActive);
      void setJSON(STORAGE_KEYS.activeKitId, nextActive);
    }
  }, [registeredKits, activeKitId]);

  const setActiveKitId = useCallback((kitId) => {
    setActiveKitIdState(kitId || null);
    void setJSON(STORAGE_KEYS.activeKitId, kitId || null);
  }, []);

  const activeKit = useMemo(
    () => registeredKits.find((entry) => entry.id === activeKitId) || registeredKits[0] || null,
    [registeredKits, activeKitId]
  );

  const startIncident = useCallback(() => {
    const fresh = newIncident();
    if (activeKit) {
      fresh.kitItems = [...activeKit.itemCodes];
      fresh.kitSource = "saved_kit";
      fresh.kitReviewedAt = activeKit.lastChecked || activeKit.updatedAt || new Date().toISOString();
      fresh.activeKitId = activeKit.id;
      fresh.activeKitLabel = activeKit.label;
    }
    setIncidentState(fresh);
    void setJSON(STORAGE_KEYS.incident, fresh);
    return fresh;
  }, [activeKit]);

  const updateIncident = useCallback((patch) => {
    setIncidentState((prev) => {
      const base = prev || newIncident();
      const update = typeof patch === "function" ? patch(base) : patch;
      const next = { ...base, ...update, updatedAt: new Date().toISOString() };
      void setJSON(STORAGE_KEYS.incident, next);
      return next;
    });
  }, []);

  const addVictim = useCallback(() => {
    setIncidentState((prev) => {
      const base = prev || newIncident();
      const victim = newVictim(base.victims.length);
      const next = { ...base, victims: [...base.victims, victim], activeVictimId: victim.id, updatedAt: new Date().toISOString() };
      void setJSON(STORAGE_KEYS.incident, next);
      return next;
    });
  }, []);

  const updateVictim = useCallback((victimId, patch) => {
    updateIncident((base) => ({
      victims: base.victims.map((victim) => victim.id === victimId ? { ...victim, ...patch } : victim),
    }));
  }, [updateIncident]);

  const updateActiveVictim = useCallback((patch) => {
    updateIncident((base) => ({
      victims: base.victims.map((victim) => victim.id === base.activeVictimId ? { ...victim, ...patch } : victim),
    }));
  }, [updateIncident]);

  const selectVictim = useCallback((victimId) => updateIncident({ activeVictimId: victimId }), [updateIncident]);

  const discardIncident = useCallback(() => {
    setIncidentState(null);
    void removeKey(STORAGE_KEYS.incident);
  }, []);

  const closeIncident = useCallback(async () => {
    const current = incident;
    setIncidentState(null);
    const retained = await closeAndRetainIncident(current, settings.retention);
    setRetainedIncidents(retained);
  }, [incident, settings.retention]);

  const deleteRetained = useCallback(async (id) => {
    const next = await deleteRetainedIncident(id);
    setRetainedIncidents(next);
  }, []);

  const logInstitutional = useCallback((entry) => {
    const full = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      at: new Date().toISOString(),
    };
    setInstitutionalLog((prev) => {
      const next = [...prev, full].slice(-100);
      void appendInstitutionalLog(full);
      return next;
    });
  }, []);

  const clearInstitutionalLog = useCallback(() => {
    setInstitutionalLog([]);
    void removeKey(STORAGE_KEYS.institutionalLog);
  }, []);

  const clearAiNavigationAction = useCallback(() => {
    setAiNavigationAction(null);
  }, []);

  const signIn = useCallback(async (email, password) => {
    const backendUser = await authService.login(email, password);
    const local = backendUserToLocal(backendUser, user);
    setUser(local);
    setIsLoggedIn(true);
    return local;
  }, [setUser, user]);

  const signUp = useCallback(async ({ email, password, firstName, lastName }) => {
    const name = `${firstName || ""} ${lastName || ""}`.trim();
    const backendUser = await authService.register({ email, password, name });
    const local = backendUserToLocal(backendUser, { ...user, firstName, lastName, email });
    setUser(local);
    setIsLoggedIn(true);
    return local;
  }, [setUser, user]);

  const signOut = useCallback(async () => {
    await authService.logout();
    setIsLoggedIn(false);
  }, []);

  const value = useMemo(() => ({
    user, setUser,
    vehicle, setVehicle,
    isLoggedIn, setIsLoggedIn,
    authReady, appReady, online,
    consent, updateConsent,
    safetyProfile, updateSafetyProfile,
    settings, updateSettings,
    registeredKits, activeKit, activeKitId, saveRegisteredKit, deleteRegisteredKitLocal, setActiveKitId,
    incident, startIncident, updateIncident, addVictim, updateVictim, updateActiveVictim, selectVictim, discardIncident, closeIncident,
    retainedIncidents, deleteRetained,
    institutionalLog, logInstitutional, clearInstitutionalLog,
    aiNavigationAction, setAiNavigationAction, clearAiNavigationAction,
    aiConversationScope, setAiConversationScope,
    signIn, signUp, signOut,
  }), [
    user, setUser, vehicle, setVehicle, isLoggedIn, authReady, appReady, online,
    consent, updateConsent, safetyProfile, updateSafetyProfile, settings, updateSettings,
    registeredKits, activeKit, activeKitId, saveRegisteredKit, deleteRegisteredKitLocal, setActiveKitId,
    incident, startIncident, updateIncident, addVictim, updateVictim, updateActiveVictim, selectVictim, discardIncident, closeIncident,
    retainedIncidents, deleteRetained, institutionalLog, logInstitutional, clearInstitutionalLog,
    aiNavigationAction, clearAiNavigationAction, aiConversationScope, signIn, signUp, signOut,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
