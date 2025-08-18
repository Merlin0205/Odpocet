// Service worker registration + install banner
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}

let deferredPrompt;
const banner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const closeBanner = document.getElementById('closeBanner');

// Show banner on Android when eligible
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  banner.classList.remove('hidden');
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  banner.classList.add('hidden');
});

closeBanner?.addEventListener('click', () => banner.classList.add('hidden'));

// iOS hint: show banner if iOS Safari (no beforeinstallprompt)
const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
if (isIOS && !isStandalone) {
  banner.classList.remove('hidden');
  // Change text to iOS instructions
  const msg = document.querySelector('#installBanner .msg');
  if (msg) msg.textContent = '📌 Na iOS otevři Sdílet → Přidat na plochu.';
}
