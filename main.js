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

function createActivity() {
  var category = '';
  var newActivity = new Activity(category, activityDescriptionInput.value, minuteInput.value, secondInput.value);
  var studyButton = document.querySelector('#study-button');
  var meditateButton = document.querySelector('#meditate-button');
  var exerciseButton = document.querySelector('#exercise-button');
// how to do this without lines 94-99; pulling category from DOM
  if (studyButton.classList.length === 2) {
    category = 'study';
  } else if (meditateButton.classList.length === 2) {
    category = 'meditate';
  } else if (exerciseButton.classList.length === 2) {
    category = 'exercise';
  }
  activitiesArray.push(newActivity);
}

function startActivity() {
  validateForm();
  if (validateCategory() === true && activityDescriptionInput.value.length > 0 && minuteInput.value.length > 0 && secondInput.value.length > 0) {
    hideForm();
    createActivity();
    activitiesArray[0].startTimer();

  }
}
// direct the received values of minutes and seconds to appear in two digit format
// direct the two digits to cycle in seconds from 59 to 00
// when seconds hit 00 they go to 59
//if seconds hit 00 subtract 01 from minutes
//when minutes and seconds are both 00 the timer stops
//when mintues and seconds are both 00 the start button text changes
function countdown() {
  setInterval(function() {
    countdownClock.innerHTML = `${activitiesArray[0].minutes}:${activitiesArray[0].seconds}`;
    if (activitiesArray[0].seconds < 10) {
    countdownClock.innerHTML= `${activitiesArray[0].minutes}:0${activitiesArray[0].seconds}`;
    }else {
    countdownClock.innerHTML= `${activitiesArray[0].minutes}:${activitiesArray[0].seconds}`;
    }
    // countdownClock.innerHTML = `${activitiesArray[0].minutes}:${activitiesArray[0].seconds}`
    // console.log(activitiesArray[0].seconds);
    activitiesArray[0].seconds > 0 ? activitiesArray[0].seconds-- : activitiesArray[0].seconds;
    // if (activitiesArray[0].seconds === 0) {
    //   return alert('hi');
    // }
  }, 1000)
}
