const duration = document.querySelector("#duration");
const total = document.querySelector("#total");
const elapsed = document.querySelector("#elapsed");
const timerInput = document.querySelector("#timerInput");
const roundInput = document.querySelector("#roundInput");
const buttonStartPause = document.querySelector("#start-pause");
const buttonReset = document.querySelector("#reset");

if (window.Worker) {
  const myWorker = new Worker("timer.js");

  buttonStartPause.onclick = function () {
    if (buttonStartPause.className === "start") {
      //Send command to Worker to start/resume the timer
      myWorker.postMessage(["start", timerInput.value, roundInput.value]);

      if (parseFloat(timerInput.value) > 0 && parseInt(roundInput.value) > 0) {
        //When timer is started, all inputs are disabled for preventing new values
        timerInput.disabled = true;
        roundInput.disabled = true;

        //Change button name and class to pause
        buttonStartPause.className = "pause";
        buttonStartPause.innerText = "Pause";
      }
      timerInput.value = parseFloat(timerInput.value);
    } else {
      //Send command to Worker to pause the timer
      myWorker.postMessage(["pause"]);

      //Change button name and class to start
      buttonStartPause.className = "start";
      buttonStartPause.innerText = "Start";
    }
  };

  buttonReset.onclick = function () {
    //Send command to Worker to reset the timer
    myWorker.postMessage(["reset"]);

    //Get the values of inputs
    myWorker.postMessage(["inputs", timerInput.value, roundInput.value]);

    //When timer is reseted, all inputs are enabled for accepting new values
    timerInput.disabled = false;
    roundInput.disabled = false;

    //Change button name and class to start
    buttonStartPause.className = "start";
    buttonStartPause.innerText = "Start";
  };

  //Get the values of inputs on the screen on their change
  const inputsChange = () => {
    myWorker.postMessage(["inputs", timerInput.value, roundInput.value]);
  };

  timerInput.onchange = inputsChange;
  roundInput.onchange = inputsChange;

  myWorker.onmessage = function (e) {
    if (e.data === "reset") {
      //When timer is reseted, all inputs are enabled for accepting new values
      timerInput.disabled = false;
      roundInput.disabled = false;

      //Change button name and class to start
      buttonStartPause.className = "start";
      buttonStartPause.innerText = "Start";
    } else {
      //Change the duration of the timer every 0.01s
      duration.innerText = e.data[0];
      total.innerText = e.data[1];
      //elapsed.innerText = e.data[2];
    }
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
