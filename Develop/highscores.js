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

$("#back").on("click", function() {
    backToQuiz();
});

$("#clear").on("click", function() {
    localStorage.clear();
    loadHighScores();
});

loadHighScores();