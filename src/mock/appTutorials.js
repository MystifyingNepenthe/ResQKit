const ro = [
  {
    id: "gettingStarted",
    title: "Introducere",
    icon: "rocket-launch-outline",
    description: "Află cum este organizată aplicația ResQKit și care sunt funcțiile principale.",
    steps: [
      "Autentifică-te sau folosește modul de urgență fără cont.",
      "Completează Profilul de siguranță și contactul de urgență.",
      "Pornește o intervenție pentru triaj și protocoale pas cu pas.",
      "Folosește Ghiduri pentru învățare și exersare.",
      "Verifică materialele din trusă cu camera sau prin selecție manuală.",
      "Folosește ResQ AI pentru întrebări despre aplicație și suport contextual.",
    ],
  },
  {
    id: "kitCheck",
    title: "Verificarea trusei",
    icon: "clipboard-check-outline",
    description: "Verifică rapid ce materiale ai disponibile în trusa de prim ajutor.",
    steps: [
      "Deschide Verifică trusa din Acasă sau Setări.",
      "Poți folosi camera pentru recunoașterea materialelor.",
      "Poți bifa manual fiecare material disponibil.",
      "Materialele selectate apar în culoarea principală a aplicației.",
      "Într-o intervenție, selecția materialelor este folosită doar pentru a evidenția ce ai la îndemână; protocolul medical rămâne fix.",
    ],
  },
  {
    id: "home",
    title: "Pagina Acasă",
    icon: "home-outline",
    description: "Pagina Acasă oferă acces rapid la pregătirea pentru urgență și funcțiile principale.",
    steps: [
      "Folosește bara de căutare pentru a găsi rapid ghiduri.",
      "Începe sau continuă o intervenție din cardul principal.",
      "Verifică progresul din Pregătire pentru urgență.",
      "Folosește Acțiuni rapide pentru ghiduri, trusă, istoric și exersare RCP.",
      "Deschide asistentul AI folosind butonul flotant.",
    ],
  },
  {
    id: "vehicle",
    title: "Vehicul",
    icon: "car-outline",
    description: "Secțiunea Vehicul păstrează informațiile mașinii asociate contului tău.",
    steps: [
      "Deschide tab-ul Vehicul.",
      "Verifică modelul mașinii.",
      "Verifică numărul de înmatriculare.",
      "Verifică seria VIN.",
      "Poți modifica aceste date din Cont.",
    ],
  },
  {
    id: "ai",
    title: "Asistent AI",
    icon: "robot-outline",
    description: "ResQ AI te ajută cu întrebări despre aplicație și suport contextual.",
    steps: [
      "Apasă butonul flotant AI disponibil în aplicație.",
      "Scrie întrebarea în câmpul de mesaj.",
      "Poți folosi sugestiile rapide disponibile.",
      "Citește cu atenție răspunsurile primite.",
      "În situații de urgență reală, protocoalele fixe și indicațiile 112 au prioritate.",
    ],
  },
  {
    id: "settings",
    title: "Setări",
    icon: "cog-outline",
    description: "Din Setări poți administra contul, profilul de siguranță, trusele și preferințele aplicației.",
    steps: [
      "Deschide tab-ul Setări.",
      "Accesează Cont pentru modificarea datelor personale și ale vehiculului.",
      "Completează Profilul de siguranță și Consimțământul.",
      "Administrează kiturile înregistrate sau verifică o trusă.",
      "Schimbă limba aplicației din secțiunea Limbă.",
    ],
  },
];

const en = [
  {
    id: "gettingStarted",
    title: "Getting started",
    icon: "rocket-launch-outline",
    description: "Learn how the ResQKit app is organized and what its main features are.",
    steps: [
      "Sign in or use emergency mode without an account.",
      "Complete your Safety Profile and emergency contact.",
      "Start an intervention for triage and step-by-step protocols.",
      "Use Guides for learning and practice.",
      "Check first-aid kit supplies with the camera or manual selection.",
      "Use ResQ AI for app questions and contextual support.",
    ],
  },
  {
    id: "kitCheck",
    title: "Check your kit",
    icon: "clipboard-check-outline",
    description: "Quickly check which first-aid supplies are available.",
    steps: [
      "Open Check kit from Home or Settings.",
      "You can use the camera to recognize supplies.",
      "You can manually select each available supply.",
      "Selected supplies use the app's primary color.",
      "During an intervention, supply selection only highlights what is available; the medical protocol remains fixed.",
    ],
  },
  {
    id: "home",
    title: "Home screen",
    icon: "home-outline",
    description: "Home provides quick access to emergency readiness and the app's main features.",
    steps: [
      "Use search to quickly find guides.",
      "Start or continue an intervention from the main card.",
      "Check your Emergency readiness progress.",
      "Use Quick actions for guides, kit check, history and CPR practice.",
      "Open the AI assistant using the floating button.",
    ],
  },
  {
    id: "vehicle",
    title: "Vehicle",
    icon: "car-outline",
    description: "The Vehicle section stores information about the car linked to your account.",
    steps: [
      "Open the Vehicle tab.",
      "Check the vehicle model.",
      "Check the license plate.",
      "Check the VIN.",
      "You can edit these details from Account.",
    ],
  },
  {
    id: "ai",
    title: "AI Assistant",
    icon: "robot-outline",
    description: "ResQ AI helps with app questions and contextual support.",
    steps: [
      "Tap the floating AI button available throughout the app.",
      "Type your question in the message field.",
      "You can use the available quick suggestions.",
      "Read the answers carefully.",
      "In a real emergency, fixed protocols and 112 instructions take priority.",
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: "cog-outline",
    description: "In Settings you can manage your account, Safety Profile, kits and app preferences.",
    steps: [
      "Open the Settings tab.",
      "Open Account to edit personal and vehicle information.",
      "Complete your Safety Profile and Consent settings.",
      "Manage registered kits or check a kit.",
      "Change the app language under Language.",
    ],
  },
];

export const appTutorials = ro;

export function getAppTutorialById(id, language = "ro") {
  const list = String(language).toLowerCase().startsWith("en") ? en : ro;
  return list.find((tutorial) => tutorial.id === id);
}
