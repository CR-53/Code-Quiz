// Todo: description

// Constants
const MAX_TIME_LIMIT = 300; // Unit seconds (5 minutes)

// Variables
var highscore = 0;
var questionIndex = 0;

// Functions

$(".option").on("click", function() {
    
    console.log("answer picked " + (this).textContent);
    console.log("correct answer " + (questions[questionIndex - 1].answer));
    
    var userChoice = (this).textConent; //might need to parse as string
    var correctAnswer = questions[questionIndex - 1].answer; //might need to parse as string

    if (userChoice === correctAnswer) {

    // if ((this).textConent == questions[questionIndex - 1].answer) {
        alert("Correct");
    // }
    }

    else {
        alert("Wrong");
    }

    // if  == (currentQuestion.answer)) {
    //     alert("correct");
    // }

    // else {
    //     alert("wrong");
    // }

    displayNextQuestion();
    // if (questionIndex <= questions.length) {
    //     displayNextQuestion();
    // }

    // else {
    //     alert("end quiz here");
    // }
});

// Add click function to button
    // Function needs to accept parameter
        // Parameter is text of the button
            // Inside the function check if value of parameter = answer of current question
                // If = answer, display correct, != display wrong
                    // Check if question index < question.length
                        // If yes, display next question, if not, end quiz

// endQuiz()
    // Highscores
        
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
    var counter = MAX_TIME_LIMIT;
    document.querySelector("#timer").innerHTML = counter;
    var interval = setInterval(function () {
        //Stop the time loop when counter reaches 0
        counter--;
        console.log(counter);
        document.querySelector("#timer").innerHTML = counter;
        if (counter < 1) {
            clearInterval(interval);
        }
    }, 1000); //1000 ms = 1 seconds which is the interval between the function execution
    
    hideDetails();
    startQuiz();
}


// Start execution
var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", onStartClick);

// console.log(questions);
    // console.log(questions[0].question)
    // console.log(questions[0].options)
    // console.log(questions[0].answer)