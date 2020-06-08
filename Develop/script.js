// Todo: description

// Constants
const MAX_TIME_LIMIT = 300; // Unit seconds (5 minutes)

// Variables
var highscore = 0;

// Functions
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

    startQuiz();
}

// Start execution
var startBtn = document.querySelector("#start");
startBtn.addEventListener("click", onStartClick);

// console.log(questions);

console.log(questions[0].question)
console.log(questions[0].options)
console.log(questions[0].answer)