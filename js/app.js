/* Fest og Gaver demo: indhold fra data.js, åbent/lukket, anledninger, collage og animation. */
(function () {
  var D = window.FOG, $ = function (s) { return document.querySelector(s); };
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasG = typeof window.gsap !== 'undefined';
  var DAGE = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];
  var DAGE_UP = ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag'];
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function hh(h) { return String(h).padStart(2, '0') + '.00'; }
  function foto(id) { return './assets/fotos/' + id + '.webp'; }

  /* ---------- links og tekst ---------- */
  ['findHero', 'findB', 'findDock'].forEach(function (id) { $('#' + id).href = D.kort; });
  ['skrivHero', 'skrivB', 'skrivDock'].forEach(function (id) { $('#' + id).href = D.messenger; });
  ['ringTop', 'ringHero', 'ringB'].forEach(function (id) { $('#' + id).href = 'tel:' + D.telefon; });
  $('#telB').textContent = D.telefonVis;
  $('#lede').textContent = D.beskrivelse;
  $('#adr').textContent = D.adresse;
  var mailB = $('#mailB'); mailB.href = 'mailto:' + D.mail; mailB.textContent = D.mail;
  $('#hrsNote').textContent = D.tiderNote;

  /* ---------- sæsonbanner ---------- */
  (function () {
    var s = D.saeson, n = new Date().toISOString().slice(0, 10);
    if (s && s.aktiv && n >= s.fra && n <= s.til) { $('#saesonTxt').textContent = s.tekst; $('#saeson').hidden = false; }
  })();

  /* ---------- åbent nu ---------- */
  var SIM = 'real';
  function cph() {
    var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Copenhagen', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    var o = {}; f.forEach(function (p) { o[p.type] = p.value; });
    var wd = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[o.weekday];
    return { dow: wd, min: Number(o.hour) * 60 + Number(o.minute) };
  }
  function now() { if (SIM === 'open') return { dow: 3, min: 12 * 60 }; if (SIM === 'closed') return { dow: 0, min: 12 * 60 }; return cph(); }
  function status() {
    var t = now(), h = D.tider[t.dow];
    if (h && t.min >= h[0] * 60 && t.min < h[1] * 60) {
      var left = h[1] * 60 - t.min;
      return { open: true, txt: left <= 30 ? 'Lukker snart · kl. ' + hh(h[1]) : 'Åbent nu · til ' + hh(h[1]) };
    }
    for (var i = 0; i < 8; i++) {
      var d = (t.dow + i) % 7, hd = D.tider[d];
      if (!hd) continue;
      if (i === 0 && t.min >= hd[0] * 60) continue;
      return { open: false, txt: 'Lukket · åbner ' + (i === 0 ? 'i dag' : i === 1 ? 'i morgen' : DAGE[d]) + ' ' + hh(hd[0]) };
    }
    return { open: false, txt: 'Lukket' };
  }
  function renderStatus() {
    var s = status(), st = $('#stamp'); $('#stampTxt').textContent = s.txt; st.classList.toggle('closed', !s.open);
    var t = now(), rows = '';
    [2, 3, 4, 5, 6, 0, 1].forEach(function (d) {
      var h = D.tider[d];
      rows += '<tr' + (d === t.dow ? ' class="i"' : '') + '><th scope="row">' + DAGE_UP[d] + '</th><td>' + (h ? hh(h[0]) + '–' + hh(h[1]) : 'Lukket') + '</td></tr>';
    });
    $('#hrsT').innerHTML = rows;
    $('#simbtn').textContent = 'Demo-tid: ' + (SIM === 'real' ? 'rigtigt ur' : SIM === 'open' ? 'onsdag kl. 12 (åbent)' : 'søndag kl. 12 (lukket)');
  }
  $('#simbtn').addEventListener('click', function () { SIM = SIM === 'real' ? 'open' : SIM === 'open' ? 'closed' : 'real'; renderStatus(); });
  renderStatus(); setInterval(renderStatus, 60000);

  /* ---------- Til din næste fest ---------- */
  var chips = $('#chips'), panel = $('#panel'), cur = null, firstSel = true;
  chips.innerHTML = D.anledninger.map(function (a, i) {
    return '<button class="chip" role="tab" id="chip-' + a.id + '" aria-selected="false" aria-controls="panel" data-i="' + i + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + esc(a.navn) + '</button>';
  }).join('');
  function fillPanel(a) {
    $('#pNavn').textContent = a.navn; $('#pTekst').textContent = a.tekst; $('#pKilde').textContent = 'Kilde: ' + a.kilde;
    $('#pCta').textContent = 'Skriv til os om ' + a.navn.toLowerCase(); $('#pCta').href = D.messenger;
    $('#pFotos').innerHTML = a.fotos.map(function (id) { var f = D.fotos[id]; return '<figure><img src="' + foto(id) + '" width="' + f.w + '" height="' + f.h + '" alt="' + esc(f.alt) + '" loading="lazy" decoding="async"></figure>'; }).join('');
    $('#fv').textContent = a.ord;
    panel.setAttribute('aria-labelledby', 'chip-' + a.id);
  }
  function select(i, burst) {
    var a = D.anledninger[i]; if (cur === i) return; cur = i;
    chips.querySelectorAll('.chip').forEach(function (c, k) { c.setAttribute('aria-selected', k === i); c.tabIndex = k === i ? 0 : -1; });
    if (hasG && !reduce && !firstSel) {
      gsap.to(panel, { opacity: 0, y: 14, duration: .25, ease: 'power3.out', onComplete: function () { fillPanel(a); gsap.fromTo(panel, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .7, ease: 'expo.out' }); gsap.from('#pFotos figure', { y: 30, rotate: 6, opacity: 0, duration: .8, ease: 'power3.out', stagger: .08, delay: .1 }); } });
    } else fillPanel(a);
    if (burst && hasG && !reduce) confetti();
    firstSel = false;
  }
  chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) select(Number(b.dataset.i), true); });
  chips.addEventListener('keydown', function (e) {
    var k = e.key; if (k !== 'ArrowRight' && k !== 'ArrowLeft') return; e.preventDefault();
    var n = D.anledninger.length, i = (cur + (k === 'ArrowRight' ? 1 : n - 1)) % n; select(i, true); $('#chip-' + D.anledninger[i].id).focus();
  });
  select(0, false);

  function confetti() {
    var cols = ['#B5122E', '#E8A317', '#2F6B3C', '#F6EFE6'], box = document.createElement('div'); box.className = 'confetti'; box.setAttribute('aria-hidden', 'true');
    for (var i = 0; i < 46; i++) { var p = document.createElement('i'); p.style.left = (Math.random() * 100) + '%'; p.style.background = cols[i % cols.length]; p.style.width = (8 + Math.random() * 10) + 'px'; p.style.height = (12 + Math.random() * 14) + 'px'; box.appendChild(p); }
    document.body.appendChild(box);
    gsap.to(box.children, { y: window.innerHeight + 60, x: function () { return (Math.random() - .5) * 160; }, rotation: function () { return (Math.random() - .5) * 720; }, duration: function () { return 1.4 + Math.random() * 1.2; }, ease: 'power1.in', delay: function () { return Math.random() * .4; }, onComplete: function () { box.remove(); } });
  }

  /* ---------- collage ---------- */
  var gal = ['foto-23', 'foto-07', 'foto-01', 'foto-37', 'foto-17', 'foto-19', 'foto-24', 'foto-22', 'foto-08', 'foto-27'];
  $('#collage').innerHTML = gal.map(function (id) { var f = D.fotos[id]; return '<button class="ci" type="button" aria-label="' + esc(f.alt) + '"><img src="' + foto(id) + '" width="' + f.w + '" height="' + f.h + '" alt="' + esc(f.alt) + '" loading="lazy" decoding="async"></button>'; }).join('');
  document.querySelectorAll('.ci').forEach(function (el) {
    function down() { var r = (Math.random() < .5 ? -1 : 1) * (1.5 + Math.random() * 2); if (hasG && !reduce) gsap.to(el, { rotate: r, scale: 1.03, duration: .35, ease: 'power3.out' }); else el.style.transform = 'rotate(' + r + 'deg)'; }
    function up() { if (hasG && !reduce) gsap.to(el, { rotate: 0, scale: 1, duration: .7, ease: 'expo.out' }); else el.style.transform = ''; }
    el.addEventListener('pointerdown', down); ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { el.addEventListener(ev, up); });
    el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { down(); setTimeout(up, 350); } });
  });

  /* ---------- hjælp ---------- */
  $('#rows').innerHTML = D.hjaelp.map(function (h) { return '<li><h3>' + esc(h.titel) + '</h3><div><p>' + esc(h.tekst) + '</p><p class="n">Kilde: ' + esc(h.note) + '</p></div></li>'; }).join('');

  /* ---------- animation ---------- */
  if (!hasG || reduce) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  if (typeof Lenis !== 'undefined') { var l = new Lenis({ duration: 1.1 }); if (window.ScrollTrigger) l.on('scroll', ScrollTrigger.update); gsap.ticker.add(function (t) { l.raf(t * 1000); }); gsap.ticker.lagSmoothing(0); }
  if (typeof SplitType !== 'undefined') {
    var s1 = new SplitType('#ttl', { types: 'chars' }); gsap.from(s1.chars, { yPercent: 110, opacity: 0, duration: 1, ease: 'expo.out', stagger: .035, delay: .15 });
    new SplitType('#festh', { types: 'words' }); new SplitType('#galh', { types: 'words' }); new SplitType('#hjh', { types: 'words' }); new SplitType('#bh', { types: 'words' });
    ['#festh', '#galh', '#hjh', '#bh'].forEach(function (s) { if (window.ScrollTrigger) gsap.from(s + ' .word', { yPercent: 100, opacity: 0, duration: 1, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: s, start: 'top 88%' } }); });
  }
  gsap.from('#heroPol', { y: 50, opacity: 0, rotate: 7, duration: 1.2, ease: 'power3.out' });
  gsap.from('.hv', { x: -30, opacity: 0, duration: 1, ease: 'expo.out', delay: .3 });
  gsap.from('#stamp', { scale: 1.5, opacity: 0, rotate: -20, duration: .7, ease: 'power3.out', delay: .9 });
  if (window.ScrollTrigger) {
    gsap.to('#heroImg', { yPercent: 8, scale: 1.06, ease: 'none', scrollTrigger: { trigger: '#heroPol', start: 'top bottom', end: 'bottom top', scrub: true } });
    gsap.to('#mq', { x: -520, ease: 'none', scrollTrigger: { trigger: '.mq', start: 'top bottom', end: 'bottom top', scrub: true } });
    // pinnet "Til din næste fest" (kun hvis sektionen kan være på skærmen)
    ScrollTrigger.matchMedia({ '(min-height: 720px)': function () {
      var f = $('#fest'); if (f.offsetHeight > window.innerHeight) return;
      gsap.timeline({ scrollTrigger: { trigger: '#fest', start: 'top top', end: '+=70%', pin: true, scrub: .6 } }).fromTo('#fv', { yPercent: -8 }, { yPercent: 8, ease: 'none' });
    } });
    gsap.utils.toArray('.ci').forEach(function (el, i) { gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%' }, delay: (i % 2) * .08 }); });
    gsap.utils.toArray('.rows li').forEach(function (el) { gsap.from(el, { x: -30, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }); });
    gsap.from('.adr, .hrs', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: .12, scrollTrigger: { trigger: '.bgrid', start: 'top 85%' } });
  }
  if (matchMedia('(hover:hover)').matches) document.querySelectorAll('.btn, .dock a, .ring').forEach(function (b) {
    b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * .1, y: (e.clientY - r.top - r.height / 2) * .18, duration: .4, ease: 'power3.out' }); });
    b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: .6, ease: 'expo.out' }); });
  });
})();
