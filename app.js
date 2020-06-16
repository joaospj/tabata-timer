class Timer {
  constructor(duration, start, pause, reset, timerInput) {
    this.duration = duration;
    this.start = start;
    this.pause = pause;
    this.reset = reset;
    this.timerInput = timerInput;

    this.start.addEventListener("click", this.startTimer);
    this.pause.addEventListener("click", this.pauseTimer);
    this.reset.addEventListener("click", this.resetTimer);
  }

  startTimer = () => {
    // Check if input is greater than 0 to start,
    // and prevent Start button action when resumed
    if (!this.interval && parseFloat(this.timerInput.value)) {
      // Allow resume time when paused
      if (!this.timerInput.disabled) {
        this.seconds = parseFloat(this.timerInput.value);
        // Set the correct type of the number to timerInput
        this.timerInput.value = this.seconds;
        this.timerInput.disabled = true;
      }
      this.interval = setInterval(this.tick, 10);
    }
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    // Doing this the timer can be paused and resumed anytime
    this.interval = undefined;
  };

  resetTimer = (fromTick) => {
    // When reset is called for tick(), keep the duration value at 0.00
    if (fromTick !== 1) {
      this.timeLeft = parseFloat(this.timerInput.value) || 0;
    }
    this.pauseTimer();
    // timerInput must be disabled to prevent change a timer in course
    this.timerInput.disabled = false;
  };

  tick = () => {
    if (this.timeLeft <= 0) {
      // Fix a math bug
      this.timeLeft = 0;

      // Reset timer when timeLeft reaches to 0.00
      this.resetTimer(1);
    } else {
      this.timeLeft = this.timeLeft - 0.01;
    }
  };

  get timeLeft() {
    return parseFloat(this.seconds);
  }

  set timeLeft(time) {
    this.seconds = time;
    this.duration.innerText = this.formatSeconds(this.seconds);
  }

  formatSeconds = (seconds) => {
    const sec = (seconds % 60).toFixed(2);
    return sec < 10 ? `0${sec}` : sec;
  };
}

const duration = document.getElementById("duration");
const timerInput = document.getElementById("timerInput");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

const timer = new Timer(duration, start, pause, reset, timerInput);
