// === Constants ===
const MAX_TIME_LIMIT = 300; // Unit: s. (5 minutes)
const TIME_PENALTY = 20; // Unit: s. The amount reduced from timer when a question is answered incorrectly
const FEEDBACK_DISPLAY_TIME = 2000; // Unit: ms. The duration the feedback message shows on the screen

// === Variables ===
var questionIndex = 0;
var counter = MAX_TIME_LIMIT;
var interval;

var highscores = JSON.parse(localStorage.getItem("highscores"));
if (!highscores) {
    highscores = [];
}

// === Functions ===

// Starts the Quiz when Start button is clicked
$("#start").on("click", function() {
    onStartClick();
});

// Runs when a user selects an option
$(".option").on("click", function() {

    // Stores the users selected answer in a variable called "userChoice"
    var userChoice = (this).textContent;
    // Stores the correct answer in a variable called "correctAnswer"
    var correctAnswer = questions[questionIndex - 1].answer; 

    // Occurs when user selects the correct option
    if (userChoice === correctAnswer) {
        // Shows a feedback message on the screen saying "Correct!"
        $("#feedback").text("Correct!");
        $("#feedback").attr('style', 'display:block;');
        // Removes the feedback message from the screen after FEEDBACAK_DISPLAY_TIME (declared above)
        setTimeout(function() {
            $("#feedback").attr('style', 'display:none;');
        }, FEEDBACK_DISPLAY_TIME);
    }

    // Occurs when user selects the wrong option
    else {
        // Shows a feedback message on the screen saying "Wrong!"
        $("#feedback").text("Wrong!");
        $("#feedback").attr('style', 'display:block;');
        // Removes the feedback message from the screen after FEEDBACAK_DISPLAY_TIME
        setTimeout(function() {
            $("#feedback").attr('style', 'display:none;');
        }, FEEDBACK_DISPLAY_TIME);
        // Penalises the player for getting the answer wrong by removing TIME_PENALTY from the current timer
        updateTimer(-TIME_PENALTY);
    }

    // Runs the displayNextQuestion function if there are still questions left
    if (questionIndex < questions.length) {
        displayNextQuestion();
    }

    // If there are no questions left the quiz is ended
    else {
        endQuiz();
    }
});

// Changes the page to "highscores.html" when highscores link is clicked
$("#highscores-link").on("click", function() {
    displayHighscores();
});

$("#submit-btn").on("click", function() {
    // Takes the user's inputted text and stores it in a variable called "userName"
    var userName = $("#enter-name").val();
    // An object to store the userName and counter. Counter is the time remaining when the quiz ends, which is also used as the score.
    var scoreEntry = {
        "name": userName,
        "score": counter,
    }
    highscores.push(scoreEntry);
    localStorage.setItem("highscores", JSON.stringify(highscores));
    displayHighscores();
});

// Changes the page to the highscores page
function displayHighscores() {
    window.location = "highscores.html";
}

// Starts the quiz
function startQuiz() {
    // Displays the question & multiple choice options
    $("#question").attr('style', 'display:block;');
    $("#option1").attr('style', 'display:block;');
    $("#option2").attr('style', 'display:block;');
    $("#option3").attr('style', 'display:block;');
    $("#option4").attr('style', 'display:block;');
    // Runs the displayNextQuestion function to show the first question
    displayNextQuestion();
}

// Hides the initial html elements when the quiz starts
function hideDetails() {  
    $("#quiz-title").attr('style', 'display:none;');
    $("#info").attr('style', 'display:none;');
    $("#start").attr('style', 'display:none;');
} 

function displayNextQuestion() {
    var currentQuestion = questions[questionIndex];
    // Increments the question index
    questionIndex ++;
    // References the current quiz question & options and prints them to the screen
    $("#question").html(currentQuestion.question);
    $("#option1").text(currentQuestion.options[0]);
    $("#option2").text(currentQuestion.options[1]);
    $("#option3").text(currentQuestion.options[2]);
    $("#option4").text(currentQuestion.options[3]);
}

// When start button is clicked
function onStartClick() {
    resetTimer();
    interval = setInterval(function () {
        updateTimer(-1);
        //Stop the time loop when counter reaches 0
        if (counter < 1) {
            clearInterval(interval);
        }
    }, 1000); //1000 ms = 1 seconds which is the interval between the function execution
    
    hideDetails();
    startQuiz();
}

function endQuiz() {
    // Pauses the timer
    if (interval) {
        clearInterval(interval);
    }
    // Sets the score
    $("#final-score").text(counter);
    // Hides the quiz question
    $("#question").attr('style', 'display:none;');
    $("#option1").attr('style', 'display:none;');
    $("#option2").attr('style', 'display:none;');
    $("#option3").attr('style', 'display:none;');
    $("#option4").attr('style', 'display:none;');
    $("#feedback").attr('style', 'display:none;');
    // Displays the end screen
    $("#quiz-end").attr('style', 'display:block;');
    $("#end-info").attr('style', 'display:block;');
    $("#enter-name").attr('style', 'display:block;');
    $("#submit-btn").attr('style', 'display:block;');
    $("#score-display").attr('style', 'display:block;');
    $("#final-score").attr('style', 'display:block;');
}

function updateTimer(deltaTime) {
    counter = counter + deltaTime;
    $("#timer").text(counter);
}

function resetTimer() {
    counter = MAX_TIME_LIMIT;
    $("#timer").text(counter);
}