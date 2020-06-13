// Todo: description

// Constants
const MAX_TIME_LIMIT = 300; // Unit: s. (5 minutes)
const TIME_PENALTY = 20; // Unit: s. The amount reduced from timer when a question is answered incorrectly
const FEEDBACK_DISPLAY_TIME = 2000; // Unit: ms. The duration the feedback message shows on the screen

// Variables
var highscores = [];
var questionIndex = 0;
var counter = MAX_TIME_LIMIT;
var interval;

// Functions

$(".option").on("click", function() {

    var userChoice = (this).textContent;
    var correctAnswer = questions[questionIndex - 1].answer; 

    if (userChoice === correctAnswer) {
        $("#feedback").text("Correct!");
        $("#feedback").attr('style', 'display:block;');
        setTimeout(function() {
            $("#feedback").attr('style', 'display:none;');
        }, FEEDBACK_DISPLAY_TIME);
    }

    else {
        $("#feedback").text("Wrong!");
        $("#feedback").attr('style', 'display:block;');
        setTimeout(function() {
            $("#feedback").attr('style', 'display:none;');
        }, FEEDBACK_DISPLAY_TIME);
        updateTimer(-TIME_PENALTY);
    }

    if (questionIndex < questions.length) {
        displayNextQuestion();
    }

    else {
        endQuiz();
    }
});

// Highscores
$("#submit-btn").on("click", function() {
    var userName = $("#enter-name").text();
    var scoreEntry = {
        "name": userName,
        "score": counter,
    }
    highscores.push(scoreEntry);
    displayHighscores();
});

// Display Highscores

function displayHighscores() {
    for (var i = 0; i < highscores.length; i++) {
    
        var li = document.createElement("li");
        li.textContent = highscores[i];
        li.setAttribute("data-index", i);
        $("#score-list").appendChild(li);
    }
}

//Start quiz function
function startQuiz() {
    $("#question").attr('style', 'display:block;');
    $("#option1").attr('style', 'display:block;');
    $("#option2").attr('style', 'display:block;');
    $("#option3").attr('style', 'display:block;');
    $("#option4").attr('style', 'display:block;');

    displayNextQuestion();
}

// Hides the initial html elements when the quiz starts
function hideDetails() {  
    $("#quiz-title").attr('style', 'display:none;');
    $("#info").attr('style', 'display:none;');
    $("#start").attr('style', 'display:none;');
} 

function displayNextQuestion() {
    // Display quiz question and increments index to go to next question
    var currentQuestion = questions[questionIndex];
    questionIndex ++;
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

// Start execution
var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", onStartClick);
