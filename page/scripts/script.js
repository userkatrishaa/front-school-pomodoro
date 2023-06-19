var timerInterval;
var timerLabel = document.getElementById('timerLabel');
var startButton = document.getElementById('startButton');
var resetButton = document.getElementById('resetButton');
var isTimerRunning = false;
var remainingTimes = [1500, 300, 900];
var currentIndex = 0;

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
      remainingTimes[currentIndex]--;
      timerLabel.textContent = formatTime(remainingTimes[currentIndex]);
      if (remainingTimes[currentIndex] <= 0) {
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
  remainingTimes[currentIndex] = pomodoroDurations[currentIndex];
  timerLabel.textContent = formatTime(remainingTimes[currentIndex]);
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

var pomodoroImages = [
  "images/pomodoro1.svg",
  "images/pomodoro2.svg",
  "images/pomodoro3.svg"
];
var pomodoroImage = document.querySelector('.pomodoro-size');

var pomodoroDurations = [1500, 300, 900];
var pomodoroLabels = ['25:00', '5:00', '15:00'];
// var pomodoroColors = ['#FFFFFF', '#FFFFFF', '#FFFFFF']; // Цвета для каждого помидора

function changePomodoroImageLeft(direction) {
  if (direction === 'left') {
    currentIndex = (currentIndex === 0) ? pomodoroImages.length - 1 : currentIndex - 1;
  }

  pomodoroImage.classList.add('slide-out-left');

  setTimeout(function () {
    pomodoroImage.src = pomodoroImages[currentIndex];
    pomodoroImage.classList.remove('slide-out-left');

    timerLabel.textContent = pomodoroLabels[currentIndex];
    // startButton.style.color = pomodoroColors[currentIndex];
    // timerLabel.style.color = pomodoroColors[currentIndex];

    resetTimer();
    var dots = document.querySelectorAll('.dot');
    dots.forEach(function (dot, index) {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }, 500);
}

function changePomodoroImageRight(direction) {
  if (direction === 'right') {
    currentIndex = (currentIndex === pomodoroImages.length - 1) ? 0 : currentIndex + 1;
  }

  pomodoroImage.classList.add('slide-out');

  setTimeout(function () {
    pomodoroImage.src = pomodoroImages[currentIndex];
    pomodoroImage.classList.remove('slide-out');

    timerLabel.textContent = pomodoroLabels[currentIndex];
    // startButton.style.color = pomodoroColors[currentIndex];
    // timerLabel.style.color = pomodoroColors[currentIndex];

    resetTimer();
    var dots = document.querySelectorAll('.dot');
    dots.forEach(function (dot, index) {
      if (index === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }, 500);
}

var leftArrow = document.querySelector('.arrow-size.left');
var rightArrow = document.querySelector('.arrow-size.right');

leftArrow.addEventListener('click', function () {
  changePomodoroImageLeft('left');
});

rightArrow.addEventListener('click', function () {
  changePomodoroImageRight('right');
});

var firstDot = document.querySelector('.dot');
firstDot.classList.add('active');

var settingsButton = document.getElementById('settingsButton');
var closeButton = document.getElementById('close-modal-btn');

settingsButton.addEventListener('click', function () {
  document.getElementById('modal-window').classList.add('open')
});

closeButton.addEventListener('click', function () {
  document.getElementById('modal-window').classList.remove('open');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal-window').classList.remove('open')
  }
});
