var buttonArray = document.querySelectorAll('.category-button');
var activityButtons = document.querySelector('.category-button-container');
var startButton = document.querySelector('.start-button');
var submitButton = document.querySelector('.submit-button');
var activityDescriptionInput = document.querySelector('.activity-description-input');
var minuteInput = document.querySelector('.minute-input');
var secondInput = document.querySelector('.second-input');
var minuteError = document.querySelector('.minute-error-message');
var secondError = document.querySelector('.second-error-message');

var activitiesArray = [];

activityButtons.addEventListener('click', activateButtons);
submitButton.addEventListener('click', startActivity);
minuteInput.addEventListener('keydown', function(event) {
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
      startButton.classList.add('active-study-button');
    } else if (event.target.id === 'meditate-button') {
      event.target.classList.add('active-meditate-button');
      startButton.classList.add('active-meditate-button');
    } else if (event.target.id === 'exercise-button') {
      event.target.classList.add('active-exercise-button');
      startButton.classList.add('active-exercise-button');
    }
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
}

function createEvent() {
  var category = '';
  var newInstance = new Activity(category, activityDescriptionInput.value, minuteInput.value, secondInput.value);

  if (studyButton.classList.length === 2) {
    category = 'study';
  } else if (meditateButton.classList.length === 2) {
    category = 'meditate';
  } else if (exerciseButton.classList.length === 2) {
    category = 'exercise';
  }
  activitiesArray.push(newInstance);
}

function startActivity() {
  validateForm();
  if (validateCategory() === true && activityDescriptionInput.value.length > 0 && minuteInput.value.length > 0 && secondInput.value.length > 0) {
    hideForm();
    createEvent();
  }
}
