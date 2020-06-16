class Timer {
  constructor(duration, start, pause, reset, timerInput) {
    this.duration = duration;
    this.start = start;
    this.pause = pause;
    this.reset = reset;
    this.timerInput = timerInput;

    this.duration.value = parseFloat(this.timerInput.value) || 30;

    this.start.addEventListener("click", this.startTimer);
    this.pause.addEventListener("click", this.pauseTimer);
    this.reset.addEventListener("click", this.resetTimer);
  }

  startTimer = () => {
    if (!this.interval) {
      this.interval = setInterval(this.tick, 10);
    }
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    this.interval = undefined;
  };

  resetTimer = () => {
    this.timeLeft = parseFloat(this.timerInput.value) || 30;
  };

  tick = () => {
    if (this.timeLeft <= 0) {
      this.pauseTimer;
    } else {
      this.timeLeft = this.timeLeft - 0.01;
    }
  };

  get timeLeft() {
    return parseFloat(this.duration.value);
  }

  set timeLeft(time) {
    this.duration.value = time.toFixed(2);
    this.duration.innerText = this.duration.value;
  }
}

const duration = document.getElementById("duration");
const timerInput = document.getElementById("timerInput");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");

const timer = new Timer(duration, start, pause, reset, timerInput);
