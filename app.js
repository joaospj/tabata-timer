const duration = document.querySelector("#duration");
const timerInput = document.querySelector("#timerInput");
const roundInput = document.querySelector("#roundInput");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

if (window.Worker) {
  const myWorker = new Worker("timer.js");

  start.onclick = function () {
    myWorker.postMessage(["start", timerInput.value, roundInput.value]);
    if (parseFloat(timerInput.value) && parseInt(roundInput.value)) {
      timerInput.disabled = true;
      roundInput.disabled = true;
    }
    timerInput.value = parseFloat(timerInput.value);
  };

  pause.onclick = function () {
    myWorker.postMessage(["pause"]);
  };

  reset.onclick = function () {
    myWorker.postMessage(["reset"]);
    timerInput.disabled = false;
  };

  myWorker.onmessage = function (e) {
    if (e.data === "reset") {
      timerInput.disabled = false;
    } else {
      duration.innerText = e.data;
    }
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
