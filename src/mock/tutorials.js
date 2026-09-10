export const woundTutorials = [
  {
    id: "small-cut",
    category: "cuts",
    title: "Tăietură superficială",
    severity: "low",
    duration: "3 min",
    description:
      "Pași de bază pentru curățarea și protejarea unei tăieturi superficiale.",
    steps: [
      "Spală-te pe mâini sau folosește mănuși dacă sunt disponibile.",
      "Clătește ușor rana cu apă curată.",
      "Îndepărtează murdăria vizibilă fără a freca agresiv.",
      "Aplică presiune ușoară dacă există sângerare.",
      "Protejează zona cu un pansament curat.",
    ],
  },

  {
    id: "deep-cut",
    category: "cuts",
    title: "Tăietură profundă",
    severity: "high",
    duration: "5 min",
    description:
      "Măsuri imediate pentru controlul unei sângerări provocate de o tăietură profundă.",
    steps: [
      "Aplică presiune directă pe rană cu material curat.",
      "Menține presiunea fără să ridici constant pansamentul.",
      "Dacă materialul se îmbibă, adaugă alt strat peste acesta.",
      "Solicită ajutor medical cât mai rapid.",
      "Dacă sângerarea este severă sau persoana își pierde starea de conștiență, apelează 112.",
    ],
  },

  {
    id: "minor-burn",
    category: "burns",
    title: "Arsură minoră",
    severity: "medium",
    duration: "4 min",
    description:
      "Primii pași pentru răcirea și protejarea unei arsuri minore.",
    steps: [
      "Îndepărtează persoana de sursa arsurii.",
      "Răcește zona cu apă curentă răcoroasă.",
      "Nu aplica gheață direct pe piele.",
      "Nu sparge veziculele.",
      "Protejează zona cu un material curat și neaderent.",
    ],
  },

  {
    id: "heavy-bleeding",
    category: "bleeding",
    title: "Sângerare abundentă",
    severity: "high",
    duration: "5 min",
    description:
      "Pași pentru controlul temporar al unei sângerări abundente.",
    steps: [
      "Apelează 112 dacă sângerarea este severă.",
      "Aplică presiune directă și fermă pe rană.",
      "Menține persoana cât mai liniștită.",
      "Nu îndepărta obiectele înfipte în rană.",
      "Monitorizează respirația și starea de conștiență.",
    ],
  },

  {
    id: "suspected-fracture",
    category: "fractures",
    title: "Suspiciune de fractură",
    severity: "medium",
    duration: "5 min",
    description:
      "Cum să protejezi o zonă posibil fracturată până la sosirea ajutorului.",
    steps: [
      "Nu încerca să îndrepți membrul.",
      "Evită mișcarea zonei afectate.",
      "Sprijină membrul în poziția găsită.",
      "Aplică rece indirect dacă este posibil.",
      "Solicită evaluare medicală.",
    ],
  },

  {
  id: "severe-burn",
  category: "burns",
  title: "Arsură severă",
  severity: "high",
  duration: "5 min",
  description:
    "Măsuri imediate pentru o arsură întinsă, profundă sau aflată într-o zonă sensibilă.",
  steps: [
    "Îndepărtează persoana de sursa arsurii, fără a te expune pericolului.",
    "Apelează 112 pentru arsuri severe, extinse sau care afectează fața ori căile respiratorii.",
    "Nu îndepărta materialele lipite de piele.",
    "Nu aplica gheață, creme sau alte substanțe direct pe rană.",
    "Acoperă ușor zona cu un material curat, dacă este posibil.",
    "Monitorizează respirația și starea persoanei până la sosirea ajutorului.",
  ],
},

{
  id: "nosebleed",
  category: "bleeding",
  title: "Sângerare nazală",
  severity: "low",
  duration: "5 min",
  description:
    "Pași de bază pentru controlul unei sângerări nazale.",
  steps: [
    "Așază persoana în poziție șezândă.",
    "Înclină ușor capul înainte.",
    "Comprimă partea moale a nasului.",
    "Menține presiunea continuu câteva minute.",
    "Evită înclinarea capului pe spate.",
    "Solicită ajutor medical dacă sângerarea este abundentă sau nu se oprește.",
  ],
},

{
  id: "open-fracture",
  category: "fractures",
  title: "Fractură deschisă",
  severity: "high",
  duration: "5 min",
  description:
    "Măsuri de protecție în cazul unei fracturi asociate cu o plagă deschisă.",
  steps: [
    "Apelează 112.",
    "Nu încerca să repoziționezi osul sau membrul.",
    "Nu împinge țesuturile sau osul înapoi.",
    "Controlează sângerarea din jurul rănii fără a apăsa direct pe osul expus.",
    "Menține zona cât mai nemișcată.",
    "Monitorizează starea persoanei până la sosirea ajutorului.",
  ],
},

{
  id: "adult-cpr",
  category: "cpr",
  title: "Resuscitare adult",
  severity: "high",
  duration: "5 min",
  description:
    "Pași generali pentru reacția la o persoană inconștientă care nu respiră normal.",
  steps: [
    "Verifică dacă zona este sigură.",
    "Verifică reacția persoanei și respirația.",
    "Apelează 112 sau roagă pe cineva să sune.",
    "Urmează instrucțiunile operatorului 112.",
    "Dacă ești instruit și este indicat, începe compresiile toracice.",
    "Folosește un defibrilator automat extern dacă este disponibil și urmează instrucțiunile acestuia.",
  ],
},

{
  id: "choking-adult",
  category: "choking",
  title: "Sufocare la adult",
  severity: "high",
  duration: "4 min",
  description:
    "Ce să faci atunci când un adult prezintă semne de obstrucție severă a căilor respiratorii.",
  steps: [
    "Verifică dacă persoana poate vorbi, tuși sau respira.",
    "Dacă poate tuși eficient, încurajează tusea.",
    "Dacă nu poate respira sau vorbi, apelează 112.",
    "Aplică manevrele de prim ajutor numai conform instruirii pe care o ai și indicațiilor operatorului.",
    "Dacă persoana devine inconștientă, urmează instrucțiunile pentru resuscitare.",
  ],
},

{
  id: "suspected-poisoning",
  category: "poisoning",
  title: "Suspiciune de intoxicație",
  severity: "high",
  duration: "4 min",
  description:
    "Pași generali în cazul unei posibile expuneri la o substanță toxică.",
  steps: [
    "Îndepărtează persoana de sursa pericolului numai dacă poți face acest lucru în siguranță.",
    "Nu provoca vărsături decât dacă un profesionist medical îți spune să o faci.",
    "Identifică substanța implicată, dacă este posibil și sigur.",
    "Apelează 112 dacă persoana prezintă simptome severe sau starea se agravează.",
    "Urmează instrucțiunile operatorului și păstrează ambalajul substanței pentru identificare.",
  ],
},

{
  id: "severe-allergic-reaction",
  category: "allergicReaction",
  title: "Reacție alergică severă",
  severity: "high",
  duration: "4 min",
  description:
    "Recunoașterea unei reacții alergice severe și pașii de urmat până la sosirea ajutorului.",
  steps: [
    "Apelează 112 dacă apar dificultăți de respirație, umflarea limbii sau gâtului ori stare de leșin.",
    "Îndepărtează alergenul dacă este posibil și sigur.",
    "Ajută persoana să folosească medicația de urgență prescrisă pentru ea, conform instrucțiunilor acesteia.",
    "Menține persoana sub observație.",
    "Dacă își pierde starea de conștiență, verifică respirația și urmează instrucțiunile operatorului 112.",
  ],
},

{
  id: "car-accident",
  category: "carAccident",
  title: "Accident rutier",
  severity: "high",
  duration: "5 min",
  description:
    "Pașii inițiali atunci când ajungi la locul unui accident rutier.",
  steps: [
    "Asigură-te că nu te expui traficului, incendiului sau altor pericole.",
    "Apelează 112 și oferă locația accidentului.",
    "Nu muta victimele decât dacă există un pericol imediat.",
    "Verifică dacă persoanele sunt conștiente și respiră.",
    "Controlează sângerările vizibile dacă poți face acest lucru în siguranță.",
    "Urmează instrucțiunile operatorului până la sosirea echipajelor de urgență.",
  ],
},
];

export function getTutorialsByCategory(category) {
  return woundTutorials.filter(
    (tutorial) => tutorial.category === category
  );
}

export function getTutorialById(id) {
  return woundTutorials.find(
    (tutorial) => tutorial.id === id
  );
}