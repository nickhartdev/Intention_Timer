var buttonArray = document.querySelectorAll('.category-button');
var activityButtons = document.querySelector('.category-button-container');
var startButton = document.querySelector('.start-button');
var submitButton = document.querySelector('.submit-button');
var activityDescriptionInput = document.querySelector('.activity-description-input');
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
var minuteError = document.querySelector('.minute-error-message');
var secondError = document.querySelector('.second-error-message');
var countdownClock = document.querySelector('.countdown-clock');
var activitiesArray = [];
var category = "";
activityButtons.addEventListener('click', activateButtons);
submitButton.addEventListener('click', startActivity);
startButton.addEventListener('click', activateTimer);
minuteInput.addEventListener('keydown', function(event) {
  var invalidCharacters = [ 'e', 'E', '+', '-' , '.' ];

  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
});
secondInput.addEventListener('keydown', function(event) {
  var invalidCharacters = [ 'e', 'E', '+', '-' , '.' ];

  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
});

function activateButtons(event) {
  for (var i = 0; i < buttonArray.length; i++) {
    buttonArray[i].classList.remove('active-study-button', 'active-meditate-button', 'active-exercise-button');
    if (event.target.id === 'study-button') {
      event.target.classList.add('active-study-button');
    } else if (event.target.id === 'meditate-button') {
      event.target.classList.add('active-meditate-button');
    } else if (event.target.id === 'exercise-button') {
      event.target.classList.add('active-exercise-button');
    }
  }
  assignCategory(event);
  assignButtonColor();
}

function assignButtonColor() {
  if (event.target.id === 'study-button') {
    startButton.classList.add('active-study-button');
  } else if (event.target.id === 'meditate-button') {
    startButton.classList.add('active-meditate-button');
  } else if (event.target.id === 'exercise-button') {
    startButton.classList.add('active-exercise-button');
  }
}

function validateCategory() {
  var categoryErrorMessage = document.querySelector('.category-error-message');

  for (var i = 0; i < buttonArray.length; i++) {
    if (buttonArray[i].classList.length > 1) {
      categoryErrorMessage.classList.add('hidden');
      return true;
    }
  }
  categoryErrorMessage.classList.remove('hidden');
}

function validateDescription() {
  var descriptionErrorMessage = document.querySelector('.description-error-message');

  if (activityDescriptionInput.value.length > 0) {
    descriptionErrorMessage.classList.add('hidden');
  } else {
    descriptionErrorMessage.classList.remove('hidden');
  }
}

function validateTime(time, errorMessage) {
  if (time.value <= 59 && time.value >= 0 && time.value.length > 0) {
    errorMessage.classList.add("hidden");
  } else {
    errorMessage.classList.remove("hidden");
  }
}

function validateForm() {
  validateTime(minuteInput, minuteError);
  validateTime(secondInput, secondError);
  validateCategory();
  validateDescription();
}

function hideForm() {
  var formSection = document.querySelector('.form-section');
  var activityHeader = document.querySelector('.activity-header');
  var timerSection = document.querySelector('.timer-section');

  formSection.classList.add('none');
  timerSection.classList.remove('none');
  activityHeader.innerHTML = 'Current Activity';
  countdownClock.innerHTML = `${activitiesArray[0].minutes}:${activitiesArray[0].seconds}`;
  addZeroes(activitiesArray[0].minutes, activitiesArray[0].seconds);
}
function assignCategory(event) {
  if (event.target.id === 'study-button') {
    category = 'study';
  } else if (event.target.id === 'meditate-button') {
    category = 'meditate';
  } else if (event.target.id === 'exercise-button') {
    category = 'exercise';
  }
  console.log(category);
}

function createActivity(event) {
  var newActivity = new Activity(category, activityDescriptionInput.value, minuteInput.value, secondInput.value);

  // var studyButton = document.querySelector('#study-button');
  // var meditateButton = document.querySelector('#meditate-button');
  // var exerciseButton = document.querySelector('#exercise-button');
  activitiesArray.push(newActivity);
}


function addZeroes(minutes, seconds) {
  if (minutes < 10 && seconds < 10) {
    countdownClock.innerHTML = `0${minutes}:0${seconds}`;
  } else if (seconds < 10) {
    countdownClock.innerHTML = `${minutes}:0${seconds}`;
  } else if (minutes < 10) {
    countdownClock.innerHTML = `0${minutes}:${seconds}`;
  }
}

function startActivity() {
  validateForm();
  if (validateCategory() === true && activityDescriptionInput.value.length > 0 && minuteInput.value.length > 0 && secondInput.value.length > 0) {
    createActivity();
    displayTimerTitle();
    hideForm();
  }
}

function activateTimer() {
  activitiesArray[0].startTimer();
}

function displayTimerTitle() {
  var description = document.querySelector('.timer-title')
  description.innerText = `${activitiesArray[0].description}`;
}
