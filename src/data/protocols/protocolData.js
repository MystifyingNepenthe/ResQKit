import * as ro from "./protocolData.ro";
import * as en from "./protocolData.en";
import { normalizeLanguage } from "../../hooks/useLocale";

function bundle(language) {
  return normalizeLanguage(language) === "en" ? en : ro;
}

export function getAgeProfiles(language) {
  return bundle(language).AGE_PROFILES;
}

export function getSituations(language) {
  return bundle(language).SITUATIONS;
}

export function getProtocolNode(nodeId, language) {
  return bundle(language).PROTOCOLS[nodeId];
}

export function getDynamicProtocolText(nodeId, ageProfile, language) {
  return bundle(language).getDynamicProtocolText(nodeId, ageProfile);
}

export function getSvbStart(ageProfile) {
  return ro.getSvbStart(ageProfile);
}

export function getSituationStart(situation, ageProfile) {
  return ro.getSituationStart(situation, ageProfile);
}
