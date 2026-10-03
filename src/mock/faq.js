const ro = [
  { id: "faq-1", question: "Ce este ResQKit?", answer: "ResQKit este o aplicație de asistență pentru pregătire și situații de urgență. Include ghiduri fixe de prim ajutor, sesiuni de intervenție, verificarea trusei, istoric și ResQ AI." },
  { id: "faq-2", question: "Pot folosi protocoalele fără cont?", answer: "Da. Din ecranul de autentificare poți porni modul Urgență fără autentificare. Arhivarea în cont rămâne opțională." },
  { id: "faq-3", question: "Cum încep sau continui o intervenție?", answer: "Din pagina Acasă folosește cardul Începe o intervenție. Dacă există deja o sesiune activă, același card devine Continuă intervenția." },
  { id: "faq-4", question: "Cum verific materialele din trusă?", answer: "Deschide Verifică trusa din Acasă sau Setări. Poți utiliza camera pentru recunoaștere sau poți selecta manual materialele disponibile." },
  { id: "faq-5", question: "Unde găsesc ghidurile de prim ajutor?", answer: "Ghidurile sunt disponibile în secțiunea Ghiduri. Poți căuta o categorie sau poți folosi modul de exersare pentru aceleași protocoale fixe folosite în intervenții." },
  { id: "faq-6", question: "Ce reprezintă nivelurile de severitate din ghiduri?", answer: "Nivelurile de severitate ajută la diferențierea situațiilor. Verde indică un nivel scăzut, galben un nivel mediu, iar roșu indică o situație cu prioritate ridicată." },
  { id: "faq-7", question: "Unde pot vedea istoricul intervențiilor?", answer: "Din meniul lateral sau din Acasă poți deschide Istoric. Acolo găsești intervențiile, datele trimise și conversațiile anterioare cu ResQ AI." },
  { id: "faq-8", question: "Ce este ResQ AI?", answer: "ResQ AI este asistentul din aplicație pentru întrebări despre aplicație și suport contextual. Nu generează protocoalele medicale fixe și nu înlocuiește indicațiile 112." },
  { id: "faq-9", question: "Cum schimb limba aplicației?", answer: "Limba poate fi modificată din Setări, în secțiunea Limbă. Poți comuta între română și engleză." },
  { id: "faq-10", question: "Cum modific datele vehiculului?", answer: "Datele vehiculului asociat contului pot fi administrate din Cont și sunt afișate în pagina Vehicul." },
  { id: "faq-11", question: "Ce este Profilul de siguranță?", answer: "Profilul de siguranță păstrează local informații utile precum contactul de urgență și, cu consimțământ separat, informații medicale pe care alegi să le introduci." },
  { id: "faq-12", question: "Ce funcționează fără internet?", answer: "Protocoalele fixe și datele locale rămân disponibile. Funcțiile care necesită backend, precum anumite operațiuni AI, recunoașterea foto sau sincronizarea cu contul, pot fi limitate până revine conexiunea." },
];

const en = [
  { id: "faq-1", question: "What is ResQKit?", answer: "ResQKit is an emergency readiness and assistance app. It includes fixed first-aid guides, intervention sessions, kit checks, history and ResQ AI." },
  { id: "faq-2", question: "Can I use emergency protocols without an account?", answer: "Yes. From the sign-in screen you can start Emergency without sign-in. Account archiving remains optional." },
  { id: "faq-3", question: "How do I start or continue an intervention?", answer: "On Home, use the Start an intervention card. If a session is already active, the same card becomes Continue intervention." },
  { id: "faq-4", question: "How do I check the supplies in my first-aid kit?", answer: "Open Check kit from Home or Settings. You can use the camera for recognition or manually select available supplies." },
  { id: "faq-5", question: "Where can I find the first-aid guides?", answer: "Guides are available under Guides. You can search by category or use Practice mode for the same fixed protocols used during interventions." },
  { id: "faq-6", question: "What do the severity levels in Guides mean?", answer: "Severity levels help distinguish situations. Green indicates low priority, yellow medium priority, and red a high-priority situation." },
  { id: "faq-7", question: "Where can I see intervention history?", answer: "Open History from the side menu or Home. It contains interventions, sent data and previous ResQ AI conversations." },
  { id: "faq-8", question: "What is ResQ AI?", answer: "ResQ AI is the in-app assistant for app questions and contextual support. It does not generate the fixed medical protocols and does not replace 112 instructions." },
  { id: "faq-9", question: "How do I change the app language?", answer: "Change the language from Settings under Language. You can switch between Romanian and English." },
  { id: "faq-10", question: "How do I change vehicle information?", answer: "Vehicle information linked to your account can be managed from Account and is displayed on the Vehicle screen." },
  { id: "faq-11", question: "What is the Safety Profile?", answer: "The Safety Profile stores useful local information such as an emergency contact and, with separate consent, medical information you choose to enter." },
  { id: "faq-12", question: "What works without internet?", answer: "Fixed protocols and local data remain available. Backend-powered features such as some AI operations, photo recognition or account synchronization may be limited until connectivity returns." },
];

export const faqItems = ro;

export function getFaqItems(language = "ro") {
  return String(language).toLowerCase().startsWith("en") ? en : ro;
}
