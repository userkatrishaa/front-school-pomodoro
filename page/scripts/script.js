var timerInterval;
var timerLabel = document.getElementById('timerLabel');
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var isTimerRunning = false;
var remainingTime = 1500; // 25 minutes in seconds

resetButton.addEventListener('click', function () {
  resetTimer();
  resetButton.classList.add('rotate-animation');
  setTimeout(function () {
    resetButton.classList.remove('rotate-animation');
    resetButton.classList.add('rotate-animation');
    setTimeout(function () {
      resetButton.classList.remove('rotate-animation');
    }, 1000);
  }, 500);
});

function startTimer() {
  if (!isTimerRunning) {
    isTimerRunning = true;
    startButton.textContent = 'pause';
    startButton.removeEventListener('click', startTimer);
    startButton.addEventListener('click', pauseTimer);
    resetButton.disabled = false;
    timerInterval = setInterval(function () {
      remainingTime--;
      timerLabel.textContent = formatTime(remainingTime);
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        timerLabel.textContent = 'Time is up!';
      }
    }, 1000);
  } else {
    pauseTimer();
  }
}

function pauseTimer() {
  isTimerRunning = false;
  startButton.textContent = 'click me';
  startButton.removeEventListener('click', pauseTimer);
  startButton.addEventListener('click', startTimer);
  clearInterval(timerInterval);
}

function resetTimer() {
  clearInterval(timerInterval);
  timerLabel.textContent = '25:00';
  remainingTime = 1500;
  isTimerRunning = false;
  startButton.textContent = 'click me';
  startButton.removeEventListener('click', pauseTimer);
  startButton.addEventListener('click', startTimer);
  resetButton.disabled = true;
}

function formatTime(timeInSeconds) {
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  return ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
