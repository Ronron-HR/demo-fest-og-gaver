# Fest og Gaver · hjemmeside (demo)

Demo lavet af OviaSpecs til Fest og Gaver, Bystævnet 1, 8520 Lystrup. Ikke en officiel side, ingen aftale. `noindex` er sat. Del ikke linket offentligt. Ronny har ifølge egen oplysning talt med ejeren og må bruge butikkens egne billeder og tekster fra Facebook til demoen (ikke dokumenteret her).

## Hvad siden viser
Én side, mobil først (390 px): hero med butikkens egen beskrivelse og "Åbent nu / lukket", knapperne Find vej (Google Maps), Ring (tel:) og Skriv til os (Messenger). På mobil står Find vej og Skriv til os fast i bunden. Derefter "Til din næste fest" (pinnet; vælg en anledning, konfetti falder én gang, billeder og tekst skifter), en collage af butikkens billeder (de vipper let ved tryk), "Sådan hjælper vi", "Besøg butikken" med åbningstider og kontakt, og footer med demo-banner. Ingen webshop og ingen betaling.

## Kør lokalt
Åbn `index.html`, eller kør `python -m http.server 8791` i mappen og åbn http://localhost:8791/. Skrifter og GSAP/ScrollTrigger/Lenis/SplitType hentes fra nettet; uden net virker siden, men uden animation. Kun relative stier.

## Skift indhold og billeder
- Alt tekstindhold, åbningstider, kontakt, sæsonbanner og anledninger står i `js/data.js`. Sæsonbanneret skiftes i `saeson` (tekst og datoer). Demo-tid nederst på siden viser åbent og lukket.
- Billeder: `assets/fotos/foto-XX.webp` (16 stk., maks. 200 KB). Skift en fil, eller læg en ny i mappen og ret `fotos` og evt. `anledninger` i `data.js`. Alt-tekster står i `data.js`.

## Kilder og research
Se `research.md` (kilde til hver oplysning). Kort: butikkens Facebook-side (hentet 18. november 2026 i Ronnys egen Chrome), lystrupliv.dk, bloomit.dk, find-aaben.dk, proff.dk. Instagram og Google er ikke læst.

## Stadig "[tjek med stedet]"
Aktuelle åbningstider (Facebooks er ca. 6 måneder gamle, og andre sider viser andre tider), om de leverer og tager forbestilling, hvor og hvornår buket-automaten er åben, mailadressens stavning (post@chrisfestogfarver.dk), tilbud og priser, om de vil fremhæve de anledninger, jeg har valgt, og Instagram. Facebooks beskrivelse, adresse og telefon er brugt som de står.

## Billeder: valg og fravalg
42 billeder blev hentet fra butikkens Facebook-albummer i fuld størrelse. 16 er med. Fravalgt: kranse, hjerter og buketter med bånd, der ligner sorgblomster (butikken nævner ikke den ydelse), lav opløsning og billeder uden klart motiv. Ingen genkendelige personer. Originalerne ligger lokalt og er ikke i repoet. Metadata er ikke kontrolleret.

## Kendte mangler
Ikke set på en rigtig telefon, kun headless Chrome og et almindeligt Chrome-vindue (390 px i en ramme). Webfonte og animationsbiblioteker kommer fra CDN. Logo er ikke brugt (kun tekst), fordi vi ikke har butikkens logo i god kvalitet.
