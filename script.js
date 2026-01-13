// Fixed target date (local tz): 10 Sep 2026 13:00
const targetDate = new Date(2026, 8, 10, 13, 0, 0);

// Helpers
const pad2 = (n) => String(n).padStart(2, '0');

function createSingleFlip(initialValue = "00") {
  const card = document.createElement('div');
  card.className = 'flip-card single';
  const face = document.createElement('div'); face.className = 'face'; face.textContent = initialValue;
  const flipUpper = document.createElement('div'); flipUpper.className = 'flip-upper'; flipUpper.textContent = initialValue;
  const flipLower = document.createElement('div'); flipLower.className = 'flip-lower'; flipLower.textContent = initialValue;
  card.append(face, flipUpper, flipLower);
  card.dataset.value = initialValue;
  return card;
}

function setImmediate(card, newValue) {
  card.querySelector('.face').textContent = newValue;
  card.dataset.value = newValue;
  // also sync layers
  card.querySelector('.flip-upper').textContent = newValue;
  card.querySelector('.flip-lower').textContent = newValue;
}

function updateFlip(card, newValue) {
  const current = card.dataset.value || "00";
  if (current === newValue) return;
  const face = card.querySelector('.face');
  const flipUpper = card.querySelector('.flip-upper');
  const flipLower = card.querySelector('.flip-lower');

  face.textContent = current;
  flipUpper.textContent = current;
  flipLower.textContent = newValue;

  card.classList.remove('play');
  void card.offsetWidth;
  card.classList.add('play');

  card.addEventListener('animationend', function handler() {
    face.textContent = newValue;
    card.dataset.value = newValue;
    card.classList.remove('play');
    card.removeEventListener('animationend', handler);
  });
}

let lastSec = -1;

// Beer fill per minute - FILLS UP
function updateBeerFill(el, nowDate) {
  const sec = nowDate.getSeconds();
  // Fill up: 0s = 0%, 59s = 100%
  const pct = (sec / 59) * 100;
  el.style.height = pct.toFixed(2) + "%";
}

// Mount
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const beerFillEl = document.getElementById('beerFill');

daysEl.appendChild(createSingleFlip("00"));
hoursEl.appendChild(createSingleFlip("00"));
minutesEl.appendChild(createSingleFlip("00"));
secondsEl.appendChild(createSingleFlip("00"));

let lastValues = { d: null, h: null, m: null, s: null };
let rafId = null;

function applyValues(d, h, m, s) {
  const d2 = String(d).padStart(2, '0');
  const h2 = pad2(h);
  const m2 = pad2(m);
  const s2 = pad2(s);

  if (lastValues.d === null) setImmediate(daysEl.firstElementChild, d2); else if (lastValues.d !== d2) updateFlip(daysEl.firstElementChild, d2);
  if (lastValues.h === null) setImmediate(hoursEl.firstElementChild, h2); else if (lastValues.h !== h2) updateFlip(hoursEl.firstElementChild, h2);
  if (lastValues.m === null) setImmediate(minutesEl.firstElementChild, m2); else if (lastValues.m !== m2) updateFlip(minutesEl.firstElementChild, m2);
  if (lastValues.s === null) setImmediate(secondsEl.firstElementChild, s2); else if (lastValues.s !== s2) updateFlip(secondsEl.firstElementChild, s2);

  lastValues = { d: d2, h: h2, m: m2, s: s2 };
}

function tick() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    applyValues(0, 0, 0, 0);
    updateBeerFill(beerFillEl, now);
    return;
  }
  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  applyValues(d, h, m, s);
  updateBeerFill(beerFillEl, now);

  rafId = requestAnimationFrame(tick);
}

tick();
