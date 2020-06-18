class Timer {
  constructor() {
    this.disabled = false;
    this.timerInput = 0;
    this.roundInput = 0;
  }

  startTimer = (timerInput, roundInput, elapsed) => {
    this.timerInput = parseFloat(timerInput) >= 0 ? parseFloat(timerInput) : 0;

    // This won't change the value of rounds when start/pause is clicked
    if (!this.roundInput) {
      this.roundInput = parseInt(roundInput) > 0 ? parseInt(roundInput) : 0;
    }

    if (!this.elapsed) {
      this.elapsed = elapsed;
    }

    // Don't let the timer starts if is already one timer resuming
    // and only starts a timer if the seconds and rounds are greater than 0
    if (!this.interval && this.timerInput > 0 && this.roundInput > 0) {
      if (!this.disabled) {
        this.seconds = this.timerInput;
        this.totalSeconds = this.timerInput * (this.roundInput - 1);
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
      this.timeLeft = this.timerInput || 0;
    } else {
      postMessage("reset");
      this.elapsed = 0;
    }
    this.pauseTimer();
    // With this, the timer will be able to start again
    this.disabled = false;
  };

  tick = () => {
    if (this.timeLeft <= 0.01) {
      // Fix end timer bug, browser always ends with negative milliseconds e.g. -0.009999...
      this.timeLeft = 0;

      console.log(this.roundInput);

      this.roundInput--;

      if (this.roundInput) {
        // Reset timer and start another round
        this.resetTimer();
        this.startTimer(this.timerInput, this.roundInput);
      } else {
        // Reset timer when timeLeft reaches to 0.00
        this.resetTimer(1);
      }
    } else {
      this.timeLeft = this.timeLeft - 0.01;
      this.elapsed = this.elapsed + 0.01;
    }
  };

  get timeLeft() {
    return parseFloat(this.seconds);
  }

  set timeLeft(time) {
    this.seconds = time;

    postMessage([
      this.formatTime(this.seconds),
      this.formatTime(this.totalSeconds + this.seconds || 0),
      this.formatTime(this.elapsed),
    ]);
  }

  // Format minutes and seconds to be between 0 and 59 and add a 0 when number is below 10
  formatTime = (seconds) => {
    const sec = (seconds % 60).toFixed(2);
    let min = Math.floor(seconds / 60);
    min = min < 10 ? `0${min}` : min;
    return sec < 10 ? `${min}:0${sec}` : `${min}:${sec}`;
  };
}

const timer = new Timer();

onmessage = function (e) {
  switch (e.data[0]) {
    case "start":
      timer.startTimer(e.data[1], e.data[2], 0);
      break;
    case "pause":
      timer.pauseTimer();
      break;
    case "reset":
      timer.elapsed = 0;
      timer.resetTimer();
      break;
    case "inputs":
      timer.timerInput = parseFloat(e.data[1]) > 0 ? parseFloat(e.data[1]) : 0;
      timer.roundInput = parseInt(e.data[2]) > 0 ? parseInt(e.data[2]) : 0;

      postMessage([
        timer.formatTime(timer.timerInput),
        timer.formatTime(timer.timerInput * timer.roundInput),
        timer.formatTime(0),
      ]);

      break;
    default:
      postMessage("wrong case!");
      break;
  }
};
