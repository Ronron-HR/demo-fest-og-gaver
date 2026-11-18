/* Alt indhold ligger her. Kilder står i research.md (F = Facebook-siden, hentet 18. november 2026).
   Alt der ikke stod på kilderne er null og vises som "[tjek med stedet]". */
window.FOG = {
  navn: 'Fest og Gaver',
  beskrivelse: 'Butik med rigtig lækkert brugskunst, masser af skønne blomster og velsmagende specialiteter.', // butikkens egen tekst (F)
  adresse: 'Bystævnet 1, 8520 Lystrup',
  telefon: '+4522532125',
  telefonVis: '22 53 21 25',
  mail: 'post@chrisfestogfarver.dk', // stavet sådan på Facebook: [tjek med stedet]
  messenger: 'https://m.me/100057599344082',
  facebook: 'https://www.facebook.com/p/Fest-og-Gaver-100057599344082/',
  kort: 'https://www.google.com/maps/search/?api=1&query=Byst%C3%A6vnet+1+8520+Lystrup',

  // Sæsonbanner. Skift tekst og datoer her.
  saeson: { aktiv: true, fra: '2026-11-01', til: '2027-01-06', tekst: 'Jul og nytår: julekalendere, juleøl og julevarer er kommet hjem.' },

  // Åbningstider fra Facebook (siden angiver, at de er ca. 6 måneder gamle). 0 = søndag. null = lukket.
  tider: { 0: null, 1: null, 2: [10, 17], 3: [10, 17], 4: [10, 17], 5: [10, 17], 6: [9, 13] },
  tiderNote: 'Tiderne står på Facebook og er ca. 6 måneder gamle. Andre sider viser andre tider.',

  // Anledninger = kun dem, opslagene og billederne viser.
  anledninger: [
    { id: 'mors', navn: 'Mors dag', ord: 'MORS', tekst: 'Sig tak med en buket blomster eller en hyggekurv.', kilde: 'Opslag 4. maj 2026', fotos: ['foto-07', 'foto-08', 'foto-37'] },
    { id: 'fars', navn: 'Fars dag', ord: 'FARS', tekst: 'Øl i trækasse med "Glædelig Far\'s Dag" og chokoladeflødeboller.', kilde: 'Billeder fra butikken', fotos: ['foto-26', 'foto-29', 'foto-32'] },
    { id: 'vaert', navn: 'Værtindegave', ord: 'GAVE', tekst: 'Skal du have en værtindegave eller en buket med? Der er både specialiteter og blomster.', kilde: 'Opslag før sommerferien', fotos: ['foto-27', 'foto-30', 'foto-22'] },
    { id: 'jul', navn: 'Jul', ord: 'JUL', tekst: 'Julekalendere, juleøl og julevarer. Der kommer flere.', kilde: 'Opslag 28. oktober og 12. november 2026', fotos: ['foto-17', 'foto-24', 'foto-23'] },
    { id: 'paaske', navn: 'Påske', ord: 'PÅSKE', tekst: 'Påskechokolade og planter. Tilbud og priser: [tjek med stedet].', kilde: 'Opslag 8. april 2026', fotos: ['foto-02', 'foto-19', 'foto-08'] },
    { id: 'grill', navn: 'Sommer og grill', ord: 'GRILL', tekst: 'Marinade, bread dipper og sennep til grill- og sommerbordet.', kilde: 'Opslag om grill og sommerbord', fotos: ['foto-27', 'foto-22', 'foto-06'] },
    { id: 'hygge', navn: 'Hverdagshygge', ord: 'HYGGE', tekst: 'Planter, lys og små gaver til en hyggeligere dag.', kilde: 'Opslag om efterår og hygge', fotos: ['foto-01', 'foto-02', 'foto-06'] }
  ],

  // Billeder. Alle er butikkens egne (Facebook). Skift filer i assets/fotos/ og ret her.
  fotos: {
    'foto-01': { w: 1536, h: 2048, alt: 'Butikkens indre med hylder, gaveartikler, en grøn plante og en trætønde' },
    'foto-02': { w: 2048, h: 1536, alt: 'Farverige potteplanter og lys på hvide borde i butikken' },
    'foto-06': { w: 1080, h: 1920, alt: 'Butikken indefra med et glasbord med flasker, krukker og planter' },
    'foto-07': { w: 1520, h: 1520, alt: 'Buket med orange, gule og røde blomster' },
    'foto-08': { w: 988, h: 988, alt: 'Buket i gule og orange nuancer' },
    'foto-17': { w: 2048, h: 1367, alt: 'Sølvfade, lysestager og en hvid hortensia' },
    'foto-19': { w: 1536, h: 2048, alt: 'Plante med grønne og røde blade' },
    'foto-22': { w: 1177, h: 1080, alt: 'Hylde med olier, sauce og flasker i butikken' },
    'foto-23': { w: 1080, h: 1081, alt: 'Hylder og borde med flasker og specialiteter og en gul vase' },
    'foto-24': { w: 1080, h: 1138, alt: 'Gaveæsker med specialøl på en hylde' },
    'foto-26': { w: 1080, h: 1132, alt: 'Træskilt med teksten Glædelig Far\'s Dag over tre flasker øl' },
    'foto-27': { w: 978, h: 978, alt: 'Øl, sennep, marmelade og rom på et træbræt' },
    'foto-29': { w: 1047, h: 1046, alt: 'Chokoladeflødeboller med et skilt om Far\'s dag' },
    'foto-30': { w: 1003, h: 1003, alt: 'Glas med rom-vingummi' },
    'foto-32': { w: 1045, h: 1045, alt: 'Gaveæske med flasker og lakridslikør' },
    'foto-37': { w: 1080, h: 1080, alt: 'Buket med orange blomster og liljer' }
  },

  // Sådan hjælper vi: kun det, butikken selv skriver og viser.
  hjaelp: [
    { titel: 'Buketter og blomster', tekst: 'Buketter og "snit" er klar fra kl. 11 på travle dage.', note: 'Opslag om åbningstider' },
    { titel: 'Planter', tekst: 'Potteplanter, sammenplantninger og planteposer.', note: 'Opslag om planter' },
    { titel: 'Gaver og specialiteter', tekst: 'Brugskunst, øl, sennep, rom, lakrids og flødeboller.', note: 'Billeder og beskrivelse' },
    { titel: 'Hent i butikken', tekst: 'Butikken tilbyder afhentning i forretningen.', note: 'Facebook: "In-store pickup"' },
    { titel: 'Buketter i automaten', tekst: 'Butikken har haft buketter i en automat. Hvor og hvornår: [tjek med stedet].', note: 'Opslag om ferieåbning' }
  ]
};
