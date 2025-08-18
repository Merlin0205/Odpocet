// PWA: show banner on mobile even without beforeinstallprompt (e.g., file:// or iOS)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(()=>{});
  });
}

let deferredPrompt;
const banner = document.getElementById('installBanner');
const installBtn = document.getElementById('installBtn');
const closeBanner = document.getElementById('closeBanner');

function showBanner() {
  if (!banner) return;
  banner.classList.remove('hidden');
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showBanner();
});

installBtn?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  banner.classList.add('hidden');
});

closeBanner?.addEventListener('click', () => banner.classList.add('hidden'));

// Always show a helpful banner on mobile once after load
window.addEventListener('load', () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);
  if (isMobile && !isStandalone) {
    showBanner();
    // If install prompt not supported, tweak message
    const msg = document.querySelector('#installBanner .msg');
    if (msg && !deferredPrompt) {
      if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
        msg.textContent = '📌 Na iOS: Sdílet → Přidat na plochu';
        document.getElementById('installBtn')?.classList.add('hidden');
      } else {
        msg.textContent = '📌 Přidej si mě na plochu pro rychlý přístup.';
      }
    }
  }
});
