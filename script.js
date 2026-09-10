/* ============================================================
   Brunnenlädle — Seitenlogik
   Bei einem Kiosk ist die Uhrzeit die wichtigste Information,
   deshalb steht der Öffnungsstatus doppelt: im Kopf und im Hero.
   ============================================================ */
(function () {
  'use strict';

  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName !== 'A') return;
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Täglich gleich: 6:00 bis 18:30.
  var OPEN = 6, CLOSE = 18.5;

  function fmt(v) {
    var h = Math.floor(v), m = Math.round((v - h) * 60);
    return h + ':' + (m < 10 ? '0' + m : m);
  }

  var now = new Date();
  var dec = now.getHours() + now.getMinutes() / 60;
  var open = dec >= OPEN && dec < CLOSE;

  var label;
  if (open) {
    var restMin = Math.round((CLOSE - dec) * 60);
    label = restMin <= 45
      ? 'Noch ' + restMin + ' Minuten offen — bis ' + fmt(CLOSE) + ' Uhr'
      : 'Jetzt geöffnet — bis ' + fmt(CLOSE) + ' Uhr';
  } else {
    label = dec < OPEN
      ? 'Noch zu — heute ab ' + fmt(OPEN) + ' Uhr'
      : 'Feierabend — morgen wieder ab ' + fmt(OPEN) + ' Uhr';
  }

  var badge = document.getElementById('statusBadge');
  var text = document.getElementById('statusText');
  if (badge && text) {
    badge.hidden = false;
    badge.classList.add(open ? 'is-open' : 'is-closed');
    text.textContent = label;
  }

  var headerStatus = document.getElementById('headerStatus');
  if (headerStatus) {
    headerStatus.hidden = false;
    headerStatus.textContent = open ? 'offen bis ' + fmt(CLOSE) : 'gerade zu';
    if (open) headerStatus.classList.add('is-open');
  }

  var list = document.getElementById('hoursList');
  if (list) {
    var row = list.querySelector('[data-day="' + now.getDay() + '"]');
    if (row) row.classList.add('is-today');
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
