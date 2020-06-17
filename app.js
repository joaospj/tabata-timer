const duration = document.querySelector("#duration");
const timerInput = document.querySelector("#timerInput");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const reset = document.querySelector("#reset");

if (window.Worker) {
  const myWorker = new Worker("timer.js");

  start.onclick = function () {
    myWorker.postMessage(["start", timerInput.value]);
    if (parseFloat(timerInput.value)) {
      timerInput.disabled = true;
    }
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
