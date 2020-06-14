// Function to load the highscores and adds them to a list
function loadHighScores() {
    var highscoreList = document.querySelector("#score-list");

    var highscores = JSON.parse(localStorage.getItem("highscores"));
    if (highscores) {
        
        highscoreList.innerHTML = "";
        for (var i = 0; i < highscores.length; i++) {   
            var li = document.createElement("li");
            li.textContent = highscores[i].name + " " + highscores[i].score;
            li.setAttribute("data-index", i);
            highscoreList.appendChild(li);
        }
    }    

    else {
        highscoreList.innerHTML = "";
    }
}

function backToQuiz() {
    window.location = 'index.html';
}

// Changes page to the quiz homepage
$("#back").on("click", function() {
    backToQuiz();
});

// Clears the highscores
$("#clear").on("click", function() {
    localStorage.clear();
    loadHighScores();
});

// Runs the loadHighScores function
loadHighScores();