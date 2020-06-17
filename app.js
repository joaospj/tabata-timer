const duration = document.querySelector("#duration");
const timerInput = document.querySelector("#timerInput");
const roundInput = document.querySelector("#roundInput");
const buttonStartPause = document.querySelector("#start-pause");
const buttonReset = document.querySelector("#reset");

if (window.Worker) {
  const myWorker = new Worker("timer.js");

  buttonStartPause.onclick = function () {
    if (buttonStartPause.className === "start") {
      myWorker.postMessage(["start", timerInput.value, roundInput.value]);
      if (parseFloat(timerInput.value) > 0 && parseInt(roundInput.value) > 0) {
        timerInput.disabled = true;
        roundInput.disabled = true;
        buttonStartPause.className = "pause";
        buttonStartPause.innerText = "Pause";
      }
      timerInput.value = parseFloat(timerInput.value);
    } else {
      myWorker.postMessage(["pause"]);
      buttonStartPause.className = "start";
      buttonStartPause.innerText = "Start";
    }
  };

  buttonReset.onclick = function () {
    myWorker.postMessage(["reset"]);
    timerInput.disabled = false;
    roundInput.disabled = false;
    buttonStartPause.className = "start";
    buttonStartPause.innerText = "Start";
  };

  myWorker.onmessage = function (e) {
    if (e.data === "reset") {
      timerInput.disabled = false;
      roundInput.disabled = false;
      buttonStartPause.className = "start";
      buttonStartPause.innerText = "Start";
    } else {
      duration.innerText = e.data;
    }
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
