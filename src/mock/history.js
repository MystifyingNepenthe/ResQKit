export const interventionHistory = [
  {
    id: "intervention-1",
    type: "intervention",
    title: "Accident rutier detectat",
    description:
      "ResQKit a înregistrat un posibil incident rutier și a pornit fluxul de asistență.",
    date: "8 septembrie 2026",
    time: "14:32",
    status: "Finalizat",
    details: [
      "Impact detectat",
      "Instrucțiuni de prim ajutor afișate",
      "Date pregătite pentru operator",
      "Intervenție încheiată",
    ],
  },

  {
    id: "intervention-2",
    type: "intervention",
    title: "Asistență prim ajutor",
    description:
      "A fost accesat un ghid de prim ajutor pentru controlul unei sângerări.",
    date: "5 septembrie 2026",
    time: "18:45",
    status: "Finalizat",
    details: [
      "Ghid deschis: Sângerare",
      "Instrucțiuni parcurse",
      "Sesiune încheiată",
    ],
  },
];

export const operatorHistory = [
  {
    id: "operator-1",
    type: "operator",
    title: "Date trimise operatorului",
    description:
      "Informațiile disponibile despre incident au fost transmise operatorului.",
    date: "8 septembrie 2026",
    time: "14:35",
    status: "Trimis",
    details: [
      "Tip incident: Accident rutier",
      "Impact detectat: Da",
      "Locație: Disponibilă",
      "Nivel baterie ResQKit: 74%",
      "Vehicul asociat: Disponibil",
    ],
  },

  {
    id: "operator-2",
    type: "operator",
    title: "Date incident transmise",
    description:
      "Datele colectate în timpul intervenției au fost trimise cu succes.",
    date: "5 septembrie 2026",
    time: "18:47",
    status: "Trimis",
    details: [
      "Tip incident: Prim ajutor",
      "Ghid utilizat: Sângerare",
      "Locație: Disponibilă",
    ],
  },
];

export const aiConversationHistory = [
  {
    id: "ai-1",
    type: "ai",
    title: "Conversație cu ResQ AI",
    description:
      "Cum pot opri o sângerare până ajunge ajutorul?",
    date: "5 septembrie 2026",
    time: "18:43",
    status: "Încheiată",
    details: [
      "Utilizator: Cum pot opri o sângerare?",
      "ResQ AI: Aplică presiune fermă și continuă pe rană folosind material curat.",
    ],
  },

  {
    id: "ai-2",
    type: "ai",
    title: "Conversație cu ResQ AI",
    description:
      "Ce trebuie să fac după un impact rutier?",
    date: "1 septembrie 2026",
    time: "10:20",
    status: "Încheiată",
    details: [
      "Utilizator: Ce trebuie să fac după un impact?",
      "ResQ AI: Verifică dacă există pericole imediate și evaluează starea persoanelor implicate.",
    ],
  },
];