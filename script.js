const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds'); // Although hidden, we might need it

// Set the target date: September 25, 2025, 13:00:00
const targetDate = new Date('2025-09-25T13:00:00');

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        // Countdown finished
        daysEl.innerText = '0';
        hoursEl.innerText = '00';
        minutesEl.innerText = '00';
        secondsEl.innerText = '00'; // Update even if hidden
        clearInterval(interval); // Stop the interval
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.innerText = days;
    hoursEl.innerText = formatTime(hours);
    minutesEl.innerText = formatTime(minutes);
    secondsEl.innerText = formatTime(seconds); // Update even if hidden
}

// Initial call to display the countdown immediately
updateCountdown();

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);
