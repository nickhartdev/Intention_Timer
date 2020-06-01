//global variables
var activityButtons = document.querySelector('.category-button-container');
var submitButton = document.querySelector('.submit-button');
var activityDescriptionInput = document.querySelector('.activity-description-input');
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
var activitiesArray = [];
var studyButton = document.querySelector('#study-button');
var meditateButton = document.querySelector('#meditate-button');
var exerciseButton = document.querySelector('#exercise-button');

//event listeners
activityButtons.addEventListener('click', activateButtons);
submitButton.addEventListener('click', startActivity);

//event handlers
function activateButtons(event) {
  // parameter allows event to be DYNAMIC - event changes based on what user does -- event listener is waiting for the right event, which is an object
  console.log(event.target); // event bubbling phase
  if (event.target.id === 'study-button') {
    event.target.classList.add('active-study-button');
    meditateButton.classList.remove('active-meditate-button');
    exerciseButton.classList.remove('active-exercise-button');
    // would need button query selectors - can either be gloal or local if only this file
  } else if (event.target.id === 'meditate-button') {
    event.target.classList.add('active-meditate-button');
    exerciseButton.classList.remove('active-exercise-button');
    studyButton.classList.remove('active-study-button');
  } else if (event.target.id === 'exercise-button') {
    event.target.classList.add('active-exercise-button');
    meditateButton.classList.remove('active-meditate-button');
    studyButton.classList.remove('active-study-button');
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

function createEvent() {
  var category = '';
  if (studyButton.classList.length === 2) {
    category = 'study';
  } else if (meditateButton.classList.length === 2) {
    category = 'meditate';
  } else if (exerciseButton.classList.length === 2) {
    category = 'exercise'; }
    console.log(category);
  var newInstance = new Activity(category, activityDescriptionInput.value, minuteInput.value, secondInput.value);
  console.log(newInstance);
  activitiesArray.push(newInstance);
  console.log(activitiesArray);
}

function startActivity() {
  validateTime();
  createEvent();
}
