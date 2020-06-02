//global variables
var activityButtons = document.querySelector('.category-button-container');
var submitButton = document.querySelector('.submit-button');
var activityDescriptionInput = document.querySelector('.activity-description-input');
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
var minuteError = document.querySelector('.minute-error-message');
var secondError = document.querySelector('.second-error-message');
var activitiesArray = [];
var studyButton = document.querySelector('#study-button');
var meditateButton = document.querySelector('#meditate-button');
var exerciseButton = document.querySelector('#exercise-button');
var invalidCharacters = [ 'e', 'E', '+', '-' , '.' ];

//event listeners
minuteInput.addEventListener('keydown', function(event) {
  if (invalidCharacters.includes(event.key)) {
    event.preventDefault();
  }
});
activityButtons.addEventListener('click', activateButtons);
submitButton.addEventListener('click', startActivity);

//event handlers
function activateButtons(event) {
  var startButton = document.querySelector('.start-button');
  // parameter allows event to be DYNAMIC - event changes based on what user does -- event listener is waiting for the right event, which is an object
  console.log(event.target); // event bubbling phase
  if (event.target.id === 'study-button') {
    event.target.classList.add('active-study-button');
    meditateButton.classList.remove('active-meditate-button');
    exerciseButton.classList.remove('active-exercise-button');
    startButton.classList.add('active-study-button');
  } else if (event.target.id === 'meditate-button') {
    event.target.classList.add('active-meditate-button');
    exerciseButton.classList.remove('active-exercise-button');
    studyButton.classList.remove('active-study-button');
    startButton.classList.add('active-meditate-button');
  } else if (event.target.id === 'exercise-button') {
    event.target.classList.add('active-exercise-button');
    meditateButton.classList.remove('active-meditate-button');
    studyButton.classList.remove('active-study-button');
    startButton.classList.add('active-exercise-button');
  }
}

function validateForm() {
  validateTime(minuteInput, minuteError);
  validateTime(secondInput, secondError);
  validateCategory();
  validateDescription();
}

function validateCategory() {
  var categoryErrorMessage = document.querySelector('.category-error-message');
  var buttonArray = [studyButton, meditateButton, exerciseButton];
  for (var i = 0; i < buttonArray.length; i++) {
    if (buttonArray[i].classList.length > 1) {
      categoryErrorMessage.classList.add('hidden');
      return true;
    }
  }
  categoryErrorMessage.classList.remove('hidden');
}

function validateDescription() {
  var descriptionField = document.querySelector('.activity-description-input');
  var descriptionErrorMessage = document.querySelector('.description-error-message');
  if (descriptionField.value.length > 0) {
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

function hideForm() {
  var formSection = document.querySelector('.form-section');
  var activityHeader = document.querySelector('.activity-header');
  var timerSection = document.querySelector('.timer-section');
  formSection.classList.add('none');
  timerSection.classList.remove('none');
  activityHeader.innerHTML = 'Current Activity';
}

function startActivity() {
  validateForm();
  if (validateCategory() === true && activityDescriptionInput.value.length > 0 && minuteInput.value.length > 0 && secondInput.value.length > 0) {
    hideForm();
    createEvent();
  }
}
