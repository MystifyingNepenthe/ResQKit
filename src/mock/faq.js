const ro = [
  { id: "faq-1", question: "Ce este ResQKit?", answer: "ResQKit este un dispozitiv portabil pentru situații de urgență, conceput pentru a oferi acces rapid la informații, ghiduri și funcții de asistență prin aplicația mobilă." },
  { id: "faq-2", question: "Cum conectez dispozitivul ResQKit?", answer: "Poți conecta dispozitivul din ecranul dedicat de conectare. Urmează pașii afișați în aplicație și asigură-te că dispozitivul este pornit și disponibil pentru asociere." },
  { id: "faq-3", question: "Pot folosi aplicația fără ResQKit conectat?", answer: "Da. Poți accesa ghidurile, tutorialele, setările și alte funcții ale aplicației chiar dacă dispozitivul nu este conectat. Funcțiile care necesită date de la dispozitiv vor fi limitate." },
  { id: "faq-4", question: "Unde pot vedea nivelul bateriei dispozitivului?", answer: "Nivelul bateriei este afișat pe pagina principală atunci când ResQKit este conectat. Poți folosi și opțiunea de sincronizare pentru actualizarea informațiilor." },
  { id: "faq-5", question: "Ce face funcția „Găsește ResQKit”?", answer: "Funcția activează un semnal sonor pe dispozitiv pentru a te ajuta să îl localizezi mai ușor." },
  { id: "faq-6", question: "Unde găsesc ghidurile de prim ajutor?", answer: "Ghidurile sunt disponibile în secțiunea Ghiduri. Poți selecta categoria dorită și apoi tipul situației pentru a vedea pașii recomandați." },
  { id: "faq-7", question: "Ce reprezintă nivelurile de severitate din ghiduri?", answer: "Nivelurile de severitate ajută la diferențierea situațiilor. Verde indică un nivel scăzut, galben un nivel mediu, iar roșu indică o situație cu prioritate ridicată." },
  { id: "faq-8", question: "Unde pot vedea istoricul intervențiilor?", answer: "Din meniul lateral poți deschide Istoric. Acolo găsești intervențiile înregistrate, datele trimise operatorilor și conversațiile anterioare cu ResQ AI." },
  { id: "faq-9", question: "Ce este ResQ AI?", answer: "ResQ AI este asistentul din aplicație, conceput pentru a oferi informații și suport contextual. Pentru situații critice, instrucțiunile serviciilor de urgență și ale personalului specializat au prioritate." },
  { id: "faq-10", question: "Cum schimb limba aplicației?", answer: "Limba poate fi modificată din Setări, în secțiunea Limbă. Poți comuta între română și engleză." },
  { id: "faq-11", question: "Cum modific datele vehiculului?", answer: "Datele vehiculului asociat contului pot fi administrate din secțiunea dedicată contului și sunt afișate în pagina Vehicul." },
  { id: "faq-12", question: "Ce fac dacă dispozitivul nu se mai sincronizează?", answer: "Verifică dacă ResQKit este pornit și conectat, apoi apasă „Sincronizează acum” din pagina principală. Dacă problema persistă, poți accesa secțiunea Contact pentru suport." },
];

const en = [
  { id: "faq-1", question: "What is ResQKit?", answer: "ResQKit is a portable emergency device designed to provide quick access to information, guides, and assistance features through the mobile app." },
  { id: "faq-2", question: "How do I connect the ResQKit device?", answer: "You can connect the device from the dedicated connection screen. Follow the steps shown in the app and make sure the device is powered on and available for pairing." },
  { id: "faq-3", question: "Can I use the app without ResQKit connected?", answer: "Yes. You can access guides, tutorials, settings, and other app features even when the device is not connected. Features that require device data will be limited." },
  { id: "faq-4", question: "Where can I see the device battery level?", answer: "The battery level is shown on the Home screen when ResQKit is connected. You can also use the sync option to refresh the information." },
  { id: "faq-5", question: "What does ‘Find ResQKit’ do?", answer: "It plays a sound on the device to help you locate it more easily." },
  { id: "faq-6", question: "Where can I find the first-aid guides?", answer: "The guides are available in the Guides section. Choose a category and then the relevant situation to view the recommended steps." },
  { id: "faq-7", question: "What do the severity levels in the guides mean?", answer: "Severity levels help distinguish situations. Green indicates low priority, yellow medium priority, and red a high-priority situation." },
  { id: "faq-8", question: "Where can I see intervention history?", answer: "Open History from the side menu. There you can see recorded interventions, data sent to operators, and previous ResQ AI conversations." },
  { id: "faq-9", question: "What is ResQ AI?", answer: "ResQ AI is the in-app assistant designed to provide information and contextual support. In critical situations, instructions from emergency services and qualified personnel take priority." },
  { id: "faq-10", question: "How do I change the app language?", answer: "You can change the language from Settings, under Language. You can switch between Romanian and English." },
  { id: "faq-11", question: "How do I change the vehicle information?", answer: "Vehicle information linked to the account can be managed from the Account section and is displayed on the Vehicle screen." },
  { id: "faq-12", question: "What should I do if the device stops syncing?", answer: "Check that ResQKit is powered on and connected, then tap ‘Sync now’ on the Home screen. If the problem continues, open Contact for support." },
];

export const faqItems = ro;
export function getFaqItems(language = "ro") {
  return String(language).toLowerCase().startsWith("en") ? en : ro;
}
