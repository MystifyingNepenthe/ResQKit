import { ROUTES } from "../constants/routes";
import { woundGuides } from "../mock/guides";
import { getAppTutorialById } from "../mock/appTutorials";
import { getTutorialById } from "../mock/tutorials";
import {
  getDynamicProtocolText,
  getProtocolNode,
  getSituations,
} from "../data/protocols/protocolData";
import i18n from "../localization/i18n";

function normalizeText(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9%]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isEnglishLanguage(language) {
  return String(language || "ro").toLowerCase().startsWith("en");
}

function copy(language, ro, en) {
  return isEnglishLanguage(language) ? en : ro;
}

function hasAny(text, fragments) {
  return fragments.some((fragment) => text.includes(fragment));
}

function hasAll(text, fragments) {
  return fragments.every((fragment) => text.includes(fragment));
}

function makeRouteAction({ route, params, title, description, buttonLabel }) {
  return {
    id: `ai-fast-nav-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: "route",
    route,
    params,
    title,
    description,
    buttonLabel,
  };
}

function makeTabAction({ tab, params, title, description, buttonLabel }) {
  return {
    id: `ai-fast-nav-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    kind: "tab",
    tab,
    params,
    title,
    description,
    buttonLabel,
  };
}

function activeVictimFor(incident) {
  if (!incident) return null;
  return (
    incident.victims?.find((victim) => victim.id === incident.activeVictimId) ||
    incident.victims?.[0] ||
    null
  );
}

function emergencyResumeTarget(incident) {
  if (!incident) return ROUTES.INCIDENT_START;

  if (
    incident.called112 !== "called" &&
    incident.called112 !== "already_called"
  ) {
    return ROUTES.CALL_112_GATE;
  }

  const active = activeVictimFor(incident);
  if (!active?.ageProfile) return ROUTES.AGE_SELECTION;
  if (!active?.situation) return ROUTES.SITUATION_SELECTION;
  if (!incident.kitReviewedAt) return ROUTES.KIT_PREPARATION;
  if (active?.protocolNodeId) return ROUTES.PROTOCOL;
  return ROUTES.SITUATION_SELECTION;
}

function genericPageAction(language, { kind = "route", route, tab, params, title, description, buttonLabel }) {
  const payload = {
    params,
    title,
    description:
      description ||
      copy(
        language,
        `Poți deschide ${title} când ești gata.`,
        `You can open ${title} when you're ready.`
      ),
    buttonLabel:
      buttonLabel ||
      copy(language, `Deschide ${title}`, `Open ${title}`),
  };

  return kind === "tab"
    ? makeTabAction({ ...payload, tab })
    : makeRouteAction({ ...payload, route });
}

function appGuidesAction(language) {
  return makeTabAction({
    tab: ROUTES.GUIDES,
    params: { guideType: "app" },
    title: copy(language, "Ghidurile aplicației", "App guides"),
    description: copy(
      language,
      "Dacă vrei să afli mai multe despre funcțiile ResQKit, poți continua în ghidurile aplicației.",
      "If you want to learn more about ResQKit features, you can continue in the app guides."
    ),
    buttonLabel: copy(language, "Vezi ghidurile aplicației", "View app guides"),
  });
}

function deviceInfoAction(language) {
  return makeRouteAction({
    route: ROUTES.DEVICE_INFO,
    title: copy(language, "Detalii ResQKit", "ResQKit details"),
    description: copy(
      language,
      "Dacă vrei să vezi toate informațiile salvate despre dispozitiv, le găsești aici.",
      "If you want to see all saved device information, you can find it here."
    ),
    buttonLabel: copy(language, "Vezi detaliile dispozitivului", "View device details"),
  });
}

function vehicleAction(language) {
  return makeTabAction({
    tab: ROUTES.VEHICLE,
    title: copy(language, "Pagina Vehicul", "Vehicle page"),
    description: copy(
      language,
      "Poți vedea aici modelul, numărul de înmatriculare și VIN-ul salvate în aplicație.",
      "You can view the saved model, license plate and VIN here."
    ),
    buttonLabel: copy(language, "Deschide Vehicul", "Open Vehicle"),
  });
}

function connectTutorialAction(language) {
  const tutorial = getAppTutorialById("connectDevice", language);

  return makeRouteAction({
    route: ROUTES.APP_GUIDE_DETAIL,
    params: { tutorialId: "connectDevice" },
    title: tutorial?.title || copy(language, "Conectarea ResQKit", "Connect ResQKit"),
    description: copy(
      language,
      "Dacă vrei instrucțiunile complete, poți deschide tutorialul.",
      "If you want the full instructions, you can open the tutorial."
    ),
    buttonLabel: copy(language, "Vezi tutorialul complet", "View full tutorial"),
  });
}

function appTutorialAction(language, tutorialId) {
  const tutorial = getAppTutorialById(tutorialId, language);
  if (!tutorial) return appGuidesAction(language);

  return makeRouteAction({
    route: ROUTES.APP_GUIDE_DETAIL,
    params: { tutorialId },
    title: tutorial.title,
    description: copy(
      language,
      "Dacă vrei mai multe detalii, poți deschide tutorialul complet.",
      "If you want more details, you can open the full tutorial."
    ),
    buttonLabel: copy(language, "Vezi tutorialul complet", "View full tutorial"),
  });
}

function firstAidGuideAction(language, tutorialId) {
  const tutorial = getTutorialById(tutorialId, language);
  if (!tutorial) return null;

  return makeRouteAction({
    route: ROUTES.GUIDE_DETAIL,
    params: { tutorialId },
    title: tutorial.title,
    description: copy(
      language,
      "Pentru toți pașii validați din ResQKit, poți deschide ghidul complet.",
      "For all validated ResQKit steps, you can open the full guide."
    ),
    buttonLabel: copy(language, "Vezi ghidul complet", "View full guide"),
  });
}

function firstAidCategoryAction(language, categoryId) {
  const guide = woundGuides.find((item) => item.id === categoryId);
  const categoryTitle = guide ? i18n.t(guide.titleKey) : categoryId;

  return makeRouteAction({
    route: ROUTES.GUIDE_CATEGORY,
    params: { categoryId, categoryTitle },
    title: categoryTitle,
    description: copy(
      language,
      "Poți vedea ghidurile disponibile pentru această categorie.",
      "You can view the available guides in this category."
    ),
    buttonLabel: copy(language, `Vezi ${categoryTitle}`, `View ${categoryTitle}`),
  });
}

function emergencyProtocolAction(language) {
  return makeRouteAction({
    route: ROUTES.PROTOCOL,
    title: copy(language, "Protocolul intervenției", "Intervention protocol"),
    description: copy(
      language,
      "Poți reveni la protocol pentru a continua pas cu pas în interfața ResQKit.",
      "You can return to the protocol to continue step by step in ResQKit."
    ),
    buttonLabel: copy(language, "Deschide protocolul", "Open protocol"),
  });
}

function guideResult(language, tutorialId, intro, nextMedicalContext = null) {
  const tutorial = getTutorialById(tutorialId, language);
  return {
    assistantText:
      intro ||
      copy(
        language,
        `Descrierea se potrivește cu ghidul ResQKit „${tutorial?.title || tutorialId}”. Dacă vrei, poți deschide ghidul complet mai jos.`,
        `Your description matches the ResQKit “${tutorial?.title || tutorialId}” guide. If you want, you can open the full guide below.`
      ),
    navigationAction: firstAidGuideAction(language, tutorialId),
    nextMedicalContext,
  };
}

function categoryResult(language, categoryId, assistantText) {
  return {
    assistantText,
    navigationAction: firstAidCategoryAction(language, categoryId),
    nextMedicalContext: categoryId,
  };
}

function resolveMedicalIntent({ normalized, language, pendingMedicalContext }) {
  const context = pendingMedicalContext || null;

  // BURNS -------------------------------------------------
  const mentionsBurn =
    context === "burns" ||
    hasAny(normalized, ["arsura", "arsuri", "m am ars", "mam ars", "oparit", "oparire", "burn"]);

  if (mentionsBurn) {
    const severe = hasAny(normalized, [
      "basici",
      "vezicule",
      "fata",
      "gat",
      "cale respiratorie",
      "respiratie",
      "intinsa",
      "extinsa",
      "zona mare",
      "foarte mare",
      "profunda",
      "piele alba",
      "piele neagra",
      "innegrita",
      "carbonizata",
      "electric",
      "chimic",
    ]);

    const minor = hasAny(normalized, [
      "mica",
      "mic ",
      "minor",
      "doar rosie",
      "doar rosu",
      "zona mica",
      "pe deget",
      "superficial",
    ]);

    if (severe) {
      return guideResult(
        language,
        "severe-burn",
        copy(
          language,
          "Descrierea indică o arsură care poate necesita ghidul pentru arsură severă. Dacă arsura este extinsă, profundă, afectează fața/gâtul sau apar probleme de respirație, apelează 112. Poți deschide ghidul complet mai jos.",
          "Your description may require the severe-burn guide. If the burn is extensive, deep, affects the face/neck, or there are breathing problems, call emergency services. You can open the full guide below."
        )
      );
    }

    if (minor) {
      return guideResult(language, "minor-burn");
    }

    return categoryResult(
      language,
      "burns",
      copy(
        language,
        "Ca să aleg ghidul potrivit: zona este mică sau întinsă și este doar roșie ori există și bășici/modificări importante ale pielii? Dacă preferi, poți deschide categoria Arsuri mai jos.",
        "To choose the right guide: is the area small or extensive, and is it only red or are there blisters/major skin changes? If you prefer, you can open the Burns category below."
      )
    );
  }

  // CUTS --------------------------------------------------
  const mentionsCut =
    context === "cuts" ||
    hasAny(normalized, ["taietura", "taiat", "m am taiat", "mam taiat", "cut ", "cut myself"]);

  if (mentionsCut) {
    const deep = hasAny(normalized, [
      "adanca",
      "adanc",
      "marginile sunt departate",
      "marginile departate",
      "se vede tesut",
      "foarte profunda",
      "deep cut",
    ]);
    const superficial = hasAny(normalized, ["superficiala", "superficial", "mica", "mic ", "putin", "zgarietura"]);

    if (deep) return guideResult(language, "deep-cut");
    if (superficial) return guideResult(language, "small-cut");

    return categoryResult(
      language,
      "cuts",
      copy(
        language,
        "Ca să aleg ghidul potrivit: tăietura este superficială sau pare adâncă, cu marginile depărtate? Poți vedea și categoria Tăieturi mai jos.",
        "To choose the right guide: is the cut superficial, or does it look deep with separated edges? You can also open the Cuts category below."
      )
    );
  }

  // BLEEDING ----------------------------------------------
  const mentionsBleeding =
    context === "bleeding" ||
    hasAny(normalized, ["sangerare", "sangereaza", "curge sange", "blood", "bleeding"]);

  if (mentionsBleeding) {
    if (hasAny(normalized, ["din nas", "nasul", "nosebleed", "nose bleeding"])) {
      return guideResult(language, "nosebleed");
    }

    if (hasAny(normalized, ["abundenta", "foarte mult", "nu se opreste", "tasneste", "heavy bleeding", "severe bleeding"])) {
      return guideResult(language, "heavy-bleeding");
    }

    return categoryResult(
      language,
      "bleeding",
      copy(
        language,
        "Ca să aleg ghidul potrivit: sângerarea este nazală sau este o sângerare abundentă dintr-o rană? Poți vedea categoria Sângerări mai jos.",
        "To choose the right guide: is this a nosebleed, or heavy bleeding from a wound? You can open the Bleeding category below."
      )
    );
  }

  // FRACTURES ---------------------------------------------
  const mentionsFracture =
    context === "fractures" ||
    hasAny(normalized, ["fractura", "fracturat", "os rupt", "broken bone", "fracture"]);

  if (mentionsFracture) {
    if (hasAny(normalized, ["osul este vizibil", "os vizibil", "os expus", "fractura deschisa", "open fracture"])) {
      return guideResult(language, "open-fracture");
    }

    if (hasAny(normalized, ["cred", "suspect", "posibil", "probabil", "fracturat", "fractura", "broken bone"])) {
      return guideResult(language, "suspected-fracture");
    }

    return categoryResult(
      language,
      "fractures",
      copy(
        language,
        "Poți deschide categoria Fracturi pentru a alege ghidul potrivit situației.",
        "You can open the Fractures category to choose the guide that fits the situation."
      )
    );
  }

  // CPR ---------------------------------------------------
  const mentionsCpr =
    context === "cpr" ||
    hasAny(normalized, ["resuscitare", "rcp", "cpr", "nu raspunde", "inconstient"]);

  if (mentionsCpr) {
    const notBreathing = hasAny(normalized, ["nu respira", "nu respira normal", "respiratie anormala", "not breathing"]);
    const adult = hasAny(normalized, ["adult", "barbat", "femeie", "persoana adulta"]);

    if (notBreathing && adult) return guideResult(language, "adult-cpr");

    return categoryResult(
      language,
      "cpr",
      copy(
        language,
        "Dacă persoana nu răspunde și nu respiră normal, apelează 112. Pentru alegerea ghidului potrivit, poți deschide categoria Resuscitare mai jos.",
        "If the person is unresponsive and not breathing normally, call emergency services. You can open the CPR category below to choose the appropriate guide."
      )
    );
  }

  // CHOKING -----------------------------------------------
  const mentionsChoking =
    context === "choking" ||
    hasAny(normalized, ["sufocare", "se sufoca", "s a inecat", "s-a inecat", "choking", "airway"]);

  if (mentionsChoking) {
    const adult = hasAny(normalized, ["adult", "barbat", "femeie", "persoana"]);
    if (adult || hasAny(normalized, ["nu poate vorbi", "nu poate respira"])) {
      return guideResult(language, "choking-adult");
    }

    return categoryResult(
      language,
      "choking",
      copy(
        language,
        "Poți deschide categoria Sufocare pentru a vedea ghidul disponibil.",
        "You can open the Choking category to view the available guide."
      )
    );
  }

  // POISONING ---------------------------------------------
  if (
    context === "poisoning" ||
    hasAny(normalized, ["intoxicatie", "otravire", "otravit", "substanta toxica", "poisoning", "poisoned"])
  ) {
    return guideResult(language, "suspected-poisoning");
  }

  // ALLERGIC REACTION -------------------------------------
  const mentionsAllergy =
    context === "allergicReaction" ||
    hasAny(normalized, ["reactie alergica", "alergie", "anafilax", "allergic reaction", "allergy"]);

  if (mentionsAllergy) {
    const severe = hasAny(normalized, ["nu poate respira", "dificultati de respiratie", "gat umflat", "limba umflata", "lesin", "faint", "swollen throat"]);
    if (severe) return guideResult(language, "severe-allergic-reaction");

    return categoryResult(
      language,
      "allergicReaction",
      copy(
        language,
        "Dacă apar dificultăți de respirație, umflarea limbii/gâtului sau leșin, apelează 112. Poți deschide categoria Reacții alergice mai jos.",
        "If there is difficulty breathing, swelling of the tongue/throat, or fainting, call emergency services. You can open the Allergic reactions category below."
      )
    );
  }

  // ROAD ACCIDENT -----------------------------------------
  if (
    context === "carAccident" ||
    hasAny(normalized, ["accident rutier", "accident de masina", "accident auto", "car accident", "road accident"])
  ) {
    return guideResult(language, "car-accident");
  }

  return null;
}

function resolveExplicitPageNavigation({ normalized, language, incident }) {
  const asksNavigate = hasAny(normalized, [
    "deschide",
    "arata",
    "du ma",
    "mergi",
    "vreau pagina",
    "open",
    "show",
    "go to",
  ]);

  if (!asksNavigate) return null;

  const pageTargets = [
    {
      aliases: ["pagina principala", "home", "acasa"],
      action: genericPageAction(language, { kind: "tab", tab: ROUTES.HOME, title: copy(language, "Acasă", "Home") }),
    },
    {
      aliases: ["pagina masinii", "pagina vehicul", "vehicul", "vehicle", "car page"],
      action: vehicleAction(language),
    },
    {
      aliases: ["setari", "settings"],
      action: genericPageAction(language, { kind: "tab", tab: ROUTES.SETTINGS, title: copy(language, "Setări", "Settings") }),
    },
    {
      aliases: ["cont", "account", "profil"],
      action: genericPageAction(language, { route: ROUTES.ACCOUNT, title: copy(language, "Cont", "Account") }),
    },
    {
      aliases: ["istoric", "history"],
      action: genericPageAction(language, { route: ROUTES.HISTORY, title: copy(language, "Istoric", "History") }),
    },
    {
      aliases: ["faq", "intrebari frecvente"],
      action: genericPageAction(language, { route: ROUTES.FAQ, title: "FAQ" }),
    },
    {
      aliases: ["contact"],
      action: genericPageAction(language, { route: ROUTES.CONTACT, title: copy(language, "Contact", "Contact") }),
    },
    {
      aliases: ["notificari", "notifications"],
      action: genericPageAction(language, { route: ROUTES.NOTIFICATIONS, title: copy(language, "Notificări", "Notifications") }),
    },
    {
      aliases: ["limba", "language"],
      action: genericPageAction(language, { route: ROUTES.LANGUAGE, title: copy(language, "Limbă", "Language") }),
    },
    {
      aliases: ["informatii dispozitiv", "detalii dispozitiv", "device info", "detalii resqkit"],
      action: deviceInfoAction(language),
    },
    {
      aliases: ["profil de siguranta", "safety profile"],
      action: genericPageAction(language, { route: ROUTES.SAFETY_PROFILE, title: copy(language, "Profil de siguranță", "Safety profile") }),
    },
    {
      aliases: ["consimtamant", "consent"],
      action: genericPageAction(language, { route: ROUTES.CONSENT, title: copy(language, "Consimțământ", "Consent") }),
    },
    {
      aliases: ["truse inregistrate", "registered kits"],
      action: genericPageAction(language, { route: ROUTES.REGISTERED_KITS, title: copy(language, "ResQKit-uri înregistrate", "Registered kits") }),
    },
    {
      aliases: ["setari avansate", "advanced settings"],
      action: genericPageAction(language, { route: ROUTES.ADVANCED_SETTINGS, title: copy(language, "Setări avansate", "Advanced settings") }),
    },
    {
      aliases: ["reglementari", "regulations"],
      action: genericPageAction(language, { route: ROUTES.REGULATIONS, title: copy(language, "Reglementări", "Regulations") }),
    },
    {
      aliases: ["conectare", "conecteaza dispozitiv", "connect device", "connection"],
      action: genericPageAction(language, { route: ROUTES.CONNECT_DEVICE, title: copy(language, "Conectare ResQKit", "Connect ResQKit") }),
    },
    {
      aliases: ["mod practica", "practica", "practice"],
      action: genericPageAction(language, { route: ROUTES.PRACTICE_HOME, title: copy(language, "Mod practică", "Practice mode") }),
    },
  ];

  if (incident) {
    pageTargets.push(
      {
        aliases: ["victime", "victims"],
        action: genericPageAction(language, { route: ROUTES.VICTIMS, title: copy(language, "Victime", "Victims") }),
      },
      {
        aliases: ["triaj", "triage"],
        action: genericPageAction(language, { route: ROUTES.TRIAGE, title: copy(language, "Triaj", "Triage") }),
      },
      {
        aliases: ["handoff", "predare"],
        action: genericPageAction(language, { route: ROUTES.HANDOFF, title: copy(language, "Predare informații", "Handoff") }),
      },
      {
        aliases: ["raport", "report"],
        action: genericPageAction(language, { route: ROUTES.REPORT, title: copy(language, "Raport", "Report") }),
      },
      {
        aliases: ["protocol"],
        action: emergencyProtocolAction(language),
      },
      {
        aliases: ["materiale", "pregatire trusa", "kit preparation"],
        action: genericPageAction(language, { route: ROUTES.KIT_PREPARATION, title: copy(language, "Pregătirea materialelor", "Kit preparation") }),
      }
    );
  }

  const match = pageTargets.find((item) => hasAny(normalized, item.aliases));
  if (!match) return null;

  return {
    assistantText: copy(
      language,
      `Sigur. Am pregătit redirecționarea către ${match.action.title}. O poți deschide din butonul de mai jos.`,
      `Sure. I prepared the redirect to ${match.action.title}. You can open it using the button below.`
    ),
    navigationAction: match.action,
    nextMedicalContext: null,
  };
}

/**
 * Handles deterministic app intents locally for speed and reliability.
 * Returning null means the message should be sent to the LLM.
 */
export function resolveFastIntent({
  text,
  language = "ro",
  device,
  vehicle,
  incident,
  pendingMedicalContext = null,
}) {
  const normalized = normalizeText(text);
  if (!normalized) return null;

  // --------------------------------------------------
  // What is ResQKit?
  // --------------------------------------------------
  const asksWhatIsResQKit =
    hasAny(normalized, [
      "ce este resqkit",
      "ce e resqkit",
      "ce face resqkit",
      "cu ce ma ajuta resqkit",
      "la ce foloseste resqkit",
      "what is resqkit",
      "what does resqkit do",
      "what can resqkit do",
    ]) || normalized === "resqkit";

  if (asksWhatIsResQKit) {
    return {
      assistantText: copy(
        language,
        "ResQKit este un sistem de asistență pentru situații de prim ajutor și intervenții, format din aplicația mobilă și dispozitivul ResQKit. Aplicația include ghiduri de prim ajutor, sesiuni de intervenție, informații despre vehicul și ResQ AI. Dacă vrei să afli mai multe, poți deschide ghidurile aplicației de mai jos.",
        "ResQKit is an assistance system for first aid and interventions, made up of the mobile app and the ResQKit device. The app includes first-aid guides, intervention sessions, vehicle information and ResQ AI. If you want to learn more, you can open the app guides below."
      ),
      navigationAction: appGuidesAction(language),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // Device battery/status.
  // --------------------------------------------------
  const asksBattery = hasAny(normalized, ["baterie", "battery", "acumulator"]);

  if (asksBattery) {
    const connected = Boolean(device?.connected);
    const battery =
      connected && typeof device?.battery === "number"
        ? Math.max(0, Math.min(100, device.battery))
        : null;

    const assistantText = !connected
      ? copy(
          language,
          "ResQKit apare ca deconectat în starea curentă a aplicației, deci nivelul bateriei nu este disponibil. Dacă vrei, poți vedea detaliile dispozitivului mai jos.",
          "ResQKit appears disconnected in the current app state, so the battery level is not available. If you want, you can view the device details below."
        )
      : battery == null
        ? copy(
            language,
            "ResQKit este conectat în starea curentă a aplicației, dar nivelul bateriei nu este disponibil. Dacă vrei, poți vedea detaliile dispozitivului mai jos.",
            "ResQKit is connected in the current app state, but the battery level is not available. If you want, you can view the device details below."
          )
        : copy(
            language,
            `ResQKit are ${battery}% baterie în starea curentă a aplicației. Dacă vrei, poți vedea toate detaliile dispozitivului mai jos.`,
            `ResQKit has ${battery}% battery in the current app state. If you want, you can view all device details below.`
          );

    return {
      assistantText,
      navigationAction: deviceInfoAction(language),
      nextMedicalContext: null,
    };
  }

  const asksDeviceStatus = hasAny(normalized, [
    "starea curenta a dispozitivului",
    "starea dispozitivului",
    "status resqkit",
    "statusul resqkit",
    "device status",
    "resqkit status",
    "este resqkit conectat",
  ]);

  if (asksDeviceStatus) {
    const connected = Boolean(device?.connected);
    const battery =
      connected && typeof device?.battery === "number"
        ? Math.max(0, Math.min(100, device.battery))
        : null;

    return {
      assistantText: connected
        ? copy(
            language,
            battery == null
              ? "ResQKit apare ca conectat în starea curentă a aplicației. Nivelul bateriei nu este disponibil."
              : `ResQKit apare ca conectat și are ${battery}% baterie în starea curentă a aplicației.`,
            battery == null
              ? "ResQKit appears connected in the current app state. The battery level is not available."
              : `ResQKit appears connected and has ${battery}% battery in the current app state.`
          )
        : copy(
            language,
            "ResQKit apare ca deconectat în starea curentă a aplicației.",
            "ResQKit appears disconnected in the current app state."
          ),
      navigationAction: deviceInfoAction(language),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // Vehicle facts.
  // --------------------------------------------------
  const asksVin =
    /(^| )vin( |$)/.test(normalized) ||
    hasAny(normalized, ["serie sasiu", "seria de sasiu", "chassis number"]);

  if (asksVin) {
    const vin = String(vehicle?.vin || "").trim();
    return {
      assistantText: vin
        ? copy(
            language,
            `VIN-ul salvat în aplicație este: ${vin}. Dacă vrei, poți deschide pagina Vehicul mai jos.`,
            `The VIN saved in the app is: ${vin}. If you want, you can open the Vehicle page below.`
          )
        : copy(
            language,
            "Nu există momentan un VIN salvat în aplicație. Poți verifica sau completa informațiile din pagina Vehicul.",
            "There is currently no VIN saved in the app. You can check or complete the information on the Vehicle page."
          ),
      navigationAction: vehicleAction(language),
      nextMedicalContext: null,
    };
  }

  const asksPlate = hasAny(normalized, [
    "numar de inmatriculare",
    "numarul de inmatriculare",
    "license plate",
    "registration number",
  ]);

  if (asksPlate) {
    const plate = String(vehicle?.plate || "").trim();
    return {
      assistantText: plate
        ? copy(language, `Numărul de înmatriculare salvat în aplicație este: ${plate}.`, `The license plate saved in the app is: ${plate}.`)
        : copy(language, "Nu există momentan un număr de înmatriculare salvat în aplicație.", "There is currently no license plate saved in the app."),
      navigationAction: vehicleAction(language),
      nextMedicalContext: null,
    };
  }

  const asksVehicleModel =
    hasAny(normalized, ["modelul masinii", "model masina", "vehicle model"]) &&
    !hasAny(normalized, ["deschide", "open"]);

  if (asksVehicleModel) {
    const model = String(vehicle?.model || "").trim();
    return {
      assistantText: model
        ? copy(language, `Modelul salvat în aplicație este: ${model}.`, `The vehicle model saved in the app is: ${model}.`)
        : copy(language, "Nu există momentan un model de vehicul salvat în aplicație.", "There is currently no vehicle model saved in the app."),
      navigationAction: vehicleAction(language),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // How to connect — answer first + optional tutorial.
  // --------------------------------------------------
  const asksHowToConnect =
    hasAny(normalized, ["cum conectez", "cum pot conecta", "how do i connect", "how to connect"]) &&
    hasAny(normalized, ["resqkit", "dispozitiv", "device"]);

  if (asksHowToConnect) {
    const tutorial = getAppTutorialById("connectDevice", language);
    const steps = (tutorial?.steps || []).slice(0, 4);
    const numbered = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");

    return {
      assistantText: copy(
        language,
        `Pentru conectare:\n${numbered}\nDacă vrei instrucțiunile complete, poți deschide tutorialul de mai jos.`,
        `To connect:\n${numbered}\nIf you want the full instructions, you can open the tutorial below.`
      ),
      navigationAction: connectTutorialAction(language),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // App-guide questions — same answer-first + card flow.
  // --------------------------------------------------
  const appGuideIntent = [
    { id: "gettingStarted", aliases: ["cum incep", "cum folosesc aplicatia", "introducere resqkit", "getting started"] },
    { id: "home", aliases: ["cum folosesc home", "cum folosesc pagina acasa", "pagina acasa", "home screen"] },
    { id: "vehicle", aliases: ["cum folosesc vehicul", "cum folosesc pagina masinii", "cum folosesc vehicle"] },
    { id: "ai", aliases: ["cum folosesc ai", "cum folosesc asistentul ai", "asistent ai"] },
    { id: "settings", aliases: ["cum folosesc setari", "ce pot face in setari", "settings guide"] },
  ].find((item) => hasAny(normalized, item.aliases));

  if (appGuideIntent && !hasAny(normalized, ["deschide", "open"])) {
    const tutorial = getAppTutorialById(appGuideIntent.id, language);
    const steps = (tutorial?.steps || []).slice(0, 4);
    const numbered = steps.map((step, index) => `${index + 1}. ${step}`).join("\n");
    return {
      assistantText: copy(
        language,
        `${tutorial?.description || ""}${numbered ? `\n${numbered}` : ""}\nDacă vrei, poți deschide tutorialul complet mai jos.`,
        `${tutorial?.description || ""}${numbered ? `\n${numbered}` : ""}\nIf you want, you can open the full tutorial below.`
      ).trim(),
      navigationAction: appTutorialAction(language, appGuideIntent.id),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // All first-aid guide families use the same deterministic flow.
  // This intentionally runs BEFORE generic page navigation.
  // --------------------------------------------------
  const medicalResult = resolveMedicalIntent({
    normalized,
    language,
    pendingMedicalContext,
  });

  if (medicalResult) return medicalResult;

  // --------------------------------------------------
  // General guide navigation.
  // --------------------------------------------------
  const asksOpenGuides =
    hasAny(normalized, ["deschide", "arata", "open", "show"]) &&
    hasAny(normalized, ["ghid", "ghiduri", "guides"]);

  if (asksOpenGuides) {
    const appGuides = hasAny(normalized, ["aplicatie", "app"]);
    return {
      assistantText: copy(
        language,
        appGuides
          ? "Am pregătit ghidurile aplicației. Le poți deschide din butonul de mai jos."
          : "Am pregătit ghidurile de prim ajutor. Le poți deschide din butonul de mai jos.",
        appGuides
          ? "I prepared the app guides. You can open them using the button below."
          : "I prepared the first-aid guides. You can open them using the button below."
      ),
      navigationAction: makeTabAction({
        tab: ROUTES.GUIDES,
        params: { guideType: appGuides ? "app" : "wounds" },
        title: copy(language, appGuides ? "Ghidurile aplicației" : "Ghiduri de prim ajutor", appGuides ? "App guides" : "First-aid guides"),
        description: copy(language, "Poți continua în secțiunea Ghiduri când ești gata.", "You can continue in Guides when you're ready."),
        buttonLabel: copy(language, "Deschide Ghiduri", "Open Guides"),
      }),
      nextMedicalContext: null,
    };
  }

  // --------------------------------------------------
  // Explicit page navigation — cards for all safe pages.
  // --------------------------------------------------
  const pageNavigation = resolveExplicitPageNavigation({ normalized, language, incident });
  if (pageNavigation) return pageNavigation;

  // --------------------------------------------------
  // Emergency session.
  // --------------------------------------------------
  const asksStartEmergency = hasAny(normalized, [
    "incep o interventie",
    "incepe interventia",
    "incep o sesiune de urgenta",
    "incepe o sesiune de urgenta",
    "start intervention",
    "start emergency",
  ]);

  if (asksStartEmergency && !incident) {
    return {
      assistantText: copy(
        language,
        "Am pregătit ecranul de început al intervenției. Sesiunea va porni doar după ce confirmi în aplicație.",
        "I prepared the intervention start screen. The session will start only after you confirm in the app."
      ),
      navigationAction: genericPageAction(language, {
        route: ROUTES.INCIDENT_START,
        title: copy(language, "Începe o intervenție", "Start an intervention"),
        description: copy(language, "Pornirea sesiunii se confirmă în interfața ResQKit.", "Starting the session is confirmed in the ResQKit interface."),
        buttonLabel: copy(language, "Mergi la intervenție", "Go to intervention"),
      }),
      nextMedicalContext: null,
    };
  }

  if (incident) {
    const active = activeVictimFor(incident);

    const asksCurrentSituation = hasAny(normalized, [
      "ce situatie este activa",
      "care este situatia activa",
      "ce situatie am selectat",
      "what situation is active",
    ]);

    if (asksCurrentSituation) {
      const situation = getSituations(language).find((item) => item.id === active?.situation);
      return {
        assistantText: situation
          ? copy(language, `Situația selectată pentru victima activă este: ${situation.label}.`, `The selected situation for the active victim is: ${situation.label}.`)
          : copy(language, "Nu a fost selectat încă tipul situației pentru victima activă.", "A situation type has not been selected yet for the active victim."),
        nextMedicalContext: null,
      };
    }

    const asks112 = hasAny(normalized, ["112 a fost apelat", "a fost apelat 112", "s a sunat la 112", "has 112 been called"]);

    if (asks112) {
      const called = incident.called112 === "called" || incident.called112 === "already_called";
      return {
        assistantText: called
          ? copy(language, "Da, în sesiunea activă 112 este marcat ca apelat.", "Yes, 112 is marked as called in the active session.")
          : copy(language, "Nu, în sesiunea activă 112 nu este încă marcat ca apelat.", "No, 112 is not yet marked as called in the active session."),
        nextMedicalContext: null,
      };
    }

    const asksCurrentStep = hasAny(normalized, [
      "ce fac acum",
      "care este pasul curent",
      "pasul curent",
      "explica pasul curent",
      "explica mi pasul",
      "what do i do now",
      "current step",
    ]);

    if (asksCurrentStep) {
      if (!active?.protocolNodeId) {
        const target = emergencyResumeTarget(incident);
        return {
          assistantText: copy(language, "Sesiunea este activă, dar nu există încă un pas de protocol selectat. Poți continua intervenția din butonul de mai jos.", "The session is active, but there is no protocol step selected yet. You can continue the intervention using the button below."),
          navigationAction: makeRouteAction({
            route: target,
            params: target === ROUTES.KIT_PREPARATION ? { nextRoute: ROUTES.PROTOCOL } : undefined,
            title: copy(language, "Continuă intervenția", "Continue intervention"),
            description: copy(language, "Revino la punctul potrivit al sesiunii active.", "Return to the appropriate point in the active session."),
            buttonLabel: copy(language, "Continuă sesiunea", "Continue session"),
          }),
          nextMedicalContext: null,
        };
      }

      const node = getProtocolNode(active.protocolNodeId, language);
      if (!node) return null;

      const protocolText = node.dynamicText
        ? getDynamicProtocolText(active.protocolNodeId, active.ageProfile, language)
        : node.text;

      const warning = String(node.warning || "").trim();
      const assistantText = [
        node.title ? `${node.title}:` : null,
        protocolText || null,
        warning ? copy(language, `Atenție: ${warning}`, `Warning: ${warning}`) : null,
      ]
        .filter(Boolean)
        .join("\n");

      return {
        assistantText,
        navigationAction: emergencyProtocolAction(language),
        nextMedicalContext: null,
      };
    }

    const asksContinueEmergency = hasAny(normalized, [
      "continua interventia",
      "continua sesiunea",
      "du ma inapoi la interventie",
      "continue intervention",
      "continue session",
    ]);

    if (asksContinueEmergency) {
      const target = emergencyResumeTarget(incident);
      return {
        assistantText: copy(language, "Am pregătit revenirea la intervenția activă. Poți continua din butonul de mai jos.", "I prepared your return to the active intervention. You can continue using the button below."),
        navigationAction: makeRouteAction({
          route: target,
          params: target === ROUTES.KIT_PREPARATION ? { nextRoute: ROUTES.PROTOCOL } : undefined,
          title: copy(language, "Continuă sesiunea activă", "Continue active session"),
          description: copy(language, "Revino la punctul potrivit al intervenției.", "Return to the appropriate point in the intervention."),
          buttonLabel: copy(language, "Continuă sesiunea", "Continue session"),
        }),
        nextMedicalContext: null,
      };
    }

    const asksVictims = hasAny(normalized, ["arata mi victimele", "lista victimelor", "deschide victimele", "show victims"]);

    if (asksVictims) {
      return {
        assistantText: copy(language, `Sesiunea are ${incident.victims?.length || 0} victimă/victime înregistrate. Poți deschide lista din butonul de mai jos.`, `The session has ${incident.victims?.length || 0} registered victim(s). You can open the list using the button below.`),
        navigationAction: genericPageAction(language, {
          route: ROUTES.VICTIMS,
          title: copy(language, "Victimele intervenției", "Intervention victims"),
          description: copy(language, "Lista este gestionată în ecranul Victime.", "The list is managed on the Victims screen."),
          buttonLabel: copy(language, "Arată victimele", "Show victims"),
        }),
        nextMedicalContext: null,
      };
    }
  }

  return null;
}
