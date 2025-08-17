const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

const targetDate = new Date('2025-09-25T13:00:00');

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        daysEl.innerText = '0';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        if(secondsEl) secondsEl.innerText = '00';
        clearInterval(interval);
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    if(secondsEl) secondsEl.innerText = formatTime(seconds);
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);
