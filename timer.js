class Timer {
  constructor() {
    this.disabled = false;
  }

  startTimer = (timerInput) => {
    this.timerInput = timerInput;
    if (!this.interval && parseFloat(this.timerInput)) {
      if (!this.disabled) {
        this.seconds = parseFloat(this.timerInput);
        this.disabled = true;
      }
      this.interval = setInterval(this.tick, 10);
    }
  };

  pauseTimer = () => {
    clearInterval(this.interval);
    // Doing this the timer can be paused and resumed anytime
    this.interval = 0;
  };

  resetTimer = (fromTick) => {
    // When reset is called for tick(), keep the duration value at 0.00
    if (fromTick !== 1) {
      this.timeLeft = parseFloat(this.timerInput) || 0;
    }
    this.pauseTimer();
    // timerInput must be disabled to prevent change a timer in course
    this.disabled = false;
    postMessage("reset");
  };

  tick = () => {
    if (this.timeLeft <= 0.01) {
      // Fix end timer bug, browser always ends with negative milliseconds e.g. -0.009999...
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
    postMessage(this.formatSeconds(this.seconds));
  }

  formatSeconds = (seconds) => {
    const sec = (seconds % 60).toFixed(2);
    return sec < 10 ? `0${sec}` : sec;
  };
}

const timer = new Timer();

onmessage = function (e) {
  switch (e.data[0]) {
    case "start":
      timer.startTimer(e.data[1]);
      break;
    case "pause":
      timer.pauseTimer();
      break;
    case "reset":
      timer.resetTimer();
      break;
    default:
      postMessage("wrong case!");
      break;
  }
};
