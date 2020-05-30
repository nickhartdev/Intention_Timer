//global variables
var activityButtons = document.querySelector('.category-button-container');
var studyButton = document.querySelector('#study-button');
var meditateButton = document.querySelector('#meditate-button');
var exerciseButton = document.querySelector('#exercise-button');

//event listeners
studyButton.addEventListener('click', activeStudyButton);
meditateButton.addEventListener('click', activeMeditateButton);
exerciseButton.addEventListener('click', activeExerciseButton);

//event handlers
function activeStudyButton() {
  studyButton.classList.add('active-study-button');
  meditateButton.classList.remove('active-meditate-button');
  exerciseButton.classList.remove('active-exercise-button');
}

function activeMeditateButton() {
  meditateButton.classList.add('active-meditate-button');
  exerciseButton.classList.remove('active-exercise-button');
  studyButton.classList.remove('active-study-button');
}

function activeExerciseButton() {
  exerciseButton.classList.add('active-exercise-button');
  meditateButton.classList.remove('active-meditate-button');
  studyButton.classList.remove('active-study-button');
}
// form functionality pseudocode:
// create classes with styles we want to apply in CSS.
// create event listeners
// apply corresponding CSS class to HTML element
