//global variables
var activityButtons = document.querySelector('.category-button-container');
var submitButton = document.querySelector('.submit-button');
var activityDescriptionInput = document.querySelector('.activity-description-input');
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
//event listeners
activityButtons.addEventListener('click', activateButtons);
submitButton.addEventListener('click', validateTime);

//event handlers
function activateButtons(event) {
  deactivateButtons(event);
  if (event.target.id === 'study-button') {
    event.target.classList.add('active-study-button');
  } else if (event.target.id === 'meditate-button') {
    event.target.classList.add('active-meditate-button');
  } else if (event.target.id === 'exercise-button') {
    event.target.classList.add('active-exercise-button');
  }
}

function deactivateButtons(event) {
  var studyButton = document.querySelector('#study-button');
  var meditateButton = document.querySelector('#meditate-button');
  var exerciseButton = document.querySelector('#exercise-button');
  var activityArray = [studyButton, meditateButton, exerciseButton];

  for (var i = 0; i < activityArray.length; i++) {
    activityArray[i].classList.remove('active-study-button', 'active-meditate-button', 'active-exercise-button');
  }
}
function validateTime() {
  validateMinutes();
  validateSeconds();
}

function validateMinutes() {
  var minuteError = document.querySelector('.minute-error-message');
  if (minuteInput.value <= 59 && minuteInput.value >= 0) {
    minuteError.classList.add("hidden");
  }else {
    minuteError.classList.remove("hidden");
  }
}

function validateSeconds() {
  var secondError = document.querySelector('.second-error-message');
  if (secondInput.value <= 59 && secondInput.value >= 0) {
    secondError.classList.add("hidden");
  }else {
    secondError.classList.remove("hidden");
  }
}
// function createEvent() {
//   var newInstance = new Activity(activityDescriptionInput.value, minuteInput.value, secondInput.value);
// }
