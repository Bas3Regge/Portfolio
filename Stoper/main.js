let startTime;
let elapsedTime = 0;
let timerInterval;

const screen = document.getElementById('screen');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

function formatTime(ms) {
    const date = new Date(ms);
    return date.toISOString().slice(11, 21);
}

function updateDisplay() {
    screen.textContent = formatTime(elapsedTime);
}

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    
    startButton.style.display = 'none';
    stopButton.style.display = 'inline-block';
    resetButton.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startButton.style.display = 'inline-block';
    stopButton.style.display = 'none';
    resetButton.disabled = true;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

stopButton.style.display = 'none';
resetButton.disabled = true;
updateDisplay();