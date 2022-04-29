const startBtn = document.getElementById("start-btn");
// target the timer span
const timerSpan = document.getElementById("timer-span");

let timer = 100;

// this is a callback function
const handleStartButtonClick = () => {
  console.log("start button clicked");

  const updateTimerValue = () => {
    // increment timer by 1
    timer -= 1;

    // set text to new timer value
    timerSpan.textContent = timer;

    // check if timer is equal to 10
    if (timer === 0) {
      clearInterval(timerId);
    }
  };

  // start timer
  const timerId = setInterval(updateTimerValue, 1000);
  console.log(timerId);
};

// addEventListener function is called as a higher order function
startBtn.addEventListener("click", handleStartButtonClick);

document.getElementById("btn").addEventListener("click", () => {
  timer -= 5;
});
