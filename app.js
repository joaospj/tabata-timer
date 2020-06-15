class Timer {
  constructor(duration, start, pause) {
    this.duration = duration;
    this.start = start;
    this.pause = pause;

    this.start.addEventListener("click", this.startTimer);
    this.pause.addEventListener("click", this.pauseTimer);
  }

  startTimer = () => {
    if (!this.interval) {
      this.interval = setInterval(this.tick, 100);
    }
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    this.interval = undefined;
  };

  tick = () => {
    if (this.timeLeft <= 0) {
      this.pauseTimer;
    } else {
      this.timeLeft = this.timeLeft - 0.1;
    }
  };

  get timeLeft() {
    return parseFloat(this.duration.value);
  }

  set timeLeft(time) {
    this.duration.value = time.toFixed(1);
  }
}

const duration = document.getElementById("duration");
const start = document.getElementById("start");
const pause = document.getElementById("pause");

const timer = new Timer(duration, start, pause);
