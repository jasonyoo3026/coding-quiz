var questionEl = document.querySelector("#questions");
var timeEl = document.querySelector("#countdown");
var choicesEl = document.querySelector("#options");
var submitBtn = document.querySelector("#submit-score");
var startBtn = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var reStartBtn = document.querySelector("#restart");
var promptEl = document.getElementById("question-words");
var scoreBtn = document.querySelector("#view-high-scores");



const questions = [
    {
        prompt: "Commonly used data types DO NOT include: ",
        options: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },

    {
        prompt: "The condition in an if / else statement is enclosed within ______.",
        options: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "curly brackets"
    },

    {
        prompt: "Arrays in JavaScript can be used to store ______.",
        options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },

    {
        prompt: "String values must be enclosed within ____ when being assigned to variables.",
        options: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes" 
    },

    {
        prompt: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        options: ["JavaScript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }];


var index = 0;
var time = questions.length * 15;
var timer;

function getQuestion() {
    var question = questions[index];
    promptEl.textContent = question.prompt;
    choicesEl.innerHTML = "";
    question.options.forEach(function(option, i) {
        var optionBtn = document.createElement("button");
        optionBtn.setAttribute("value", option);
        let index = i + 1;
        optionBtn.textContent = index + ". " + option;
        optionBtn.onclick = submitAnswer;
        choicesEl.appendChild(optionBtn);
    });
}

function checkAnswer(answer) {
    if (answer !== questions[index].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timeEl.textContent = time;
        feedbackEl.textContent = "Wrong!";
        feedbackEl.style.color = "grey";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "grey";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
}

function submitAnswer() {
    checkAnswer(this.value)
    index++;
    if (index === questions.length) {
        endQuiz();
    } else {
        getQuestion();
    }
}

function startQuiz() {
    timer = setInterval(timeCounter, 1000);
    timeEl.textContent = time;
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionEl.removeAttribute("class");
    getQuestion();
}

function endQuiz() {
    clearInterval(timer);
    var endScreenEl = document.getElementById("quiz-end");
    endScreenEl.removeAttribute("class");
    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;
    questionEl.setAttribute("class", "hide");
}

function timeCounter() {
    time--;
    timeEl.textContent = time;
    if (time <= 0) {
      endQuiz();
    }
}

function saveScore() {
    var name = nameEl.value.trim();
    if (name !== "") {
        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time,
            name: name
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
        viewScore();
    }
}

function viewScore() {
    window.location = "score.html";
}

function enterPressed(event) {
    if (event.key === "Enter") {
        saveScore();
    }
}

nameEl.onkeyup = enterPressed;

submitBtn.onclick = saveScore;

startBtn.onclick = startQuiz;

scoreBtn.onclick = viewScore;