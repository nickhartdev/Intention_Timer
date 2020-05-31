//global variables
var activityButtons = document.querySelector('.category-button-container');
var submitButton = document.querySelector('.submit-button');

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
