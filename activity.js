class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now;
  }


  startTimer() {
    var minutes = this.minutes;
    var seconds = this.seconds;
    var countdownClock = document.querySelector('.countdown-clock');
    var countdownTime = setInterval(countdown, 1000);

    startButton.disabled = true;
    function countdown() {
      countdownClock.innerHTML = minutes + ':' + seconds;
      addZeroes(minutes, seconds);
      countdownSeconds();
      countdownMinutes();
      if (countdownClock.innerHTML === '00:00') {
        clearInterval(countdownTime);
        alert('YOU DID IT');
      }
    }

    function countdownSeconds() {
      if (seconds > 0) {
        seconds--;
      } else {
        seconds = 59;
      }
    }

    function countdownMinutes() {
      if (seconds === 59) {
        minutes--;
      }
    }

  }

  markComplete() {}

  saveToStorage() {}

}
