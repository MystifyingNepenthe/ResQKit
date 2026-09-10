export const appTutorials = [
  {
    id: "gettingStarted",
    title: "Introducere",
    icon: "rocket-launch-outline",
    description:
      "Află cum este organizată aplicația ResQKit și care sunt funcțiile principale.",
    steps: [
      "Autentifică-te sau creează un cont nou.",
      "Conectează dispozitivul ResQKit la aplicație.",
      "Verifică starea și bateria dispozitivului din pagina Acasă.",
      "Completează informațiile vehiculului.",
      "Folosește secțiunea Ghiduri pentru instrucțiuni de prim ajutor.",
      "Folosește asistentul AI pentru întrebări și suport suplimentar.",
    ],
  },

  {
    id: "connectDevice",
    title: "Conectarea ResQKit",
    icon: "bluetooth-connect",
    description:
      "Conectează dispozitivul ResQKit la aplicație pentru a vedea starea și bateria acestuia.",
    steps: [
      "Pornește dispozitivul ResQKit.",
      "Activează Bluetooth pe telefon.",
      "Deschide pagina de conectare ResQKit.",
      "Apasă butonul de conectare.",
      "Așteaptă confirmarea conexiunii.",
      "După conectare vei fi redirecționat către pagina Acasă.",
    ],
  },

  {
    id: "home",
    title: "Pagina Acasă",
    icon: "home-outline",
    description:
      "Pagina Acasă îți oferă acces rapid la starea dispozitivului și funcțiile principale.",
    steps: [
      "Verifică dacă ResQKit este conectat.",
      "Consultă nivelul bateriei.",
      "Folosește butonul „Sincronizează acum” pentru actualizarea stării.",
      "Folosește bara de căutare pentru a găsi rapid informații.",
      "Deschide asistentul AI folosind butonul flotant.",
    ],
  },

  {
    id: "vehicle",
    title: "Vehicul",
    icon: "car-outline",
    description:
      "Secțiunea Vehicul păstrează informațiile mașinii asociate contului tău.",
    steps: [
      "Deschide tab-ul Vehicul.",
      "Verifică modelul mașinii.",
      "Verifică numărul de înmatriculare.",
      "Verifică seria VIN.",
      "Folosește „Găsește ResQKit” pentru a reda un semnal sonor pe dispozitiv.",
    ],
  },

  {
    id: "ai",
    title: "Asistent AI",
    icon: "robot-outline",
    description:
    "Asistentul AI ResQKit te ajută cu întrebări despre aplicație și îți poate oferi ghidare suplimentară.",
    steps: [
      "Apasă butonul flotant AI disponibil în aplicație.",
      "Scrie întrebarea în câmpul de mesaj.",
      "Poți folosi sugestiile rapide disponibile.",
      "Citește cu atenție răspunsurile primite.",
      "În situații de urgență reală, contactează serviciile de urgență.",
    ],
  },

  {
    id: "settings",
    title: "Setări",
    icon: "cog-outline",
    description:
      "Din Setări poți administra contul, dispozitivul și preferințele aplicației.",
    steps: [
      "Deschide tab-ul Setări.",
      "Accesează Cont pentru modificarea datelor personale.",
      "Accesează Dispozitiv pentru informații despre ResQKit.",
      "Schimbă limba aplicației din secțiunea Limbă.",
    ],
  },
];

export function getAppTutorialById(id) {
  return appTutorials.find(
    (tutorial) => tutorial.id === id
  );
}