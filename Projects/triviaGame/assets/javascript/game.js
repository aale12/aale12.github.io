//declare variables
var questionObj = [
    {
        question: "What is the name of Atlanta's major league baseball team?",
        choices: ["Nationals", "Braves", "Cardinals", "Falcons"],
        answer: "1",
        name: "A",
        image: "./assets/media/images/Ques1Braves.jpg"
    },
    {
        question: "Houses of the Holy is the fifth studio album by which English rock band?",
        choices: ["The Beatles", "Queen", "Led Zeppelin", "Pink Floyd"],
        answer: "2",
        name: "B",
        image: "./assets/media/images/Ques2Led.jpg"
    },
    {
        question: "Which actor played a FedEx employee that became marooned on an island in the 2000 drama film Cast Away?",
        choices: ["Geoffrey Blake", "Nick Searcy", "Chris Noth", "Tom Hanks"],
        answer: "3",
        name: "C",
        image: "./assets/media/images/Ques3Tom.jpg"
    },
    {
        question: "What shape is the body of an Erlenmeyer flask?",
        choices: ["Conical", "Spherical", "Cylindrical", "Toroidal"],
        answer: "0",
        name: "D",
        image: "./assets/media/images/Ques4Conical.jpg"
    },
    {
        question: "What would a sommelier recommend do you?",
        choices: ["Wine", "Shoes", "Interior Design", "Jewelry"],
        answer: "0",
        name: "E",
        image: "./assets/media/images/Ques5Somm.jpg"
    },
    {
        question: "What is Greenland called by its Inuit native residents?",
        choices: ["Avanersuarmiut", "Kaallalit Nunaat", "Kalaallisut oqalussinnaanngilanga", "Paasinngilakkit"],
        answer: "1",
        name: "F",
        image: "./assets/media/images/Ques6Green.png"
    },
    {
        question: "Acrophobia is more commonly known as the fear of what?",
        choices: ["Sharp Objects", "Rodents", "Farmland", "Heights"],
        answer: "3",
        name: "G",
        image: "./assets/media/images/Ques7Heights.jpg"
    },
    {
        question: "Who wrote the book \"The Wonderful Wizard of Oz\"?",
        choices: ["Herman Melville", "Charles Dickens", "Nathaniel Hawthorne", "L. Frank Baum"],
        answer: "3",
        name: "E",
        image: "./assets/media/images/Ques8Lyman.jpg"
    }
];
var labels = ["a", "b", "c", "d"]
var answersCorrect = 0;
var answersWrong = 0;
var timedOut = 0;
var timer = 20;
var intervalId;
var countdown;
var currentQuestion = 0;
var userAnswer;
var inputID = 0;
//Audio Files
var correctAudio = new Audio("./assets/media/audio/224.wav");
var wrongAudio = new Audio("./assets/media/audio/1040.wav");
var resetAudio = new Audio("./assets/media/audio/2355.wav");
var startAudio = new Audio("./assets/media/audio/click.mp3");
var endAudio = new Audio("./assets/media/audio/2073.wav");
//resets the game to the first question
function reset() {
    answersCorrect = 0;
    answersWrong = 0;
    timedOut = 0;
    currentQuestion = 0;
    timer = 20;
    resetAudio.play();
    setNextQuestion();
    startTimer();
}
//writes next question to the page
function setNextQuestion() {
    $("#question").html("<p class='lead'><strong>" + questionObj[currentQuestion].question + "</strong></p>")
    for (i = 0; i < 4; i++) {
        $("#answers").append("<label class='m-0 p-2 button' for =" + inputID + ">" + "<input id=" + inputID + " type='radio' value =" + i + " name=" + questionObj[currentQuestion].name + ">" + questionObj[currentQuestion].choices[i] + "</label><br/>");
        inputID++;
    }
    quesDisplay();
}
//timer for each question
function startTimer() {
    $("#timer").html(timer + " seconds left.");
    intervalId = setInterval(countDown, 1000);
    function countDown() {
        if (timer === 0) { //if time has run out
            userAnswer = $("input[type='radio']:checked").val(); //store what they have checked
            if (userAnswer === undefined) { //if they havent checked anything, time out the question
                $("#submitButton").addClass("hide");
                unAnswered();
                clearInterval(intervalId);
            } else { //is something is checked, check the answer
                checkAnswer();
            }
        } else if (timer > 0) { //if time hasnt run out decrease the clock
            timer--;
        }
        $("#timer").text(timer + " seconds left.");
    }
}
//delay in between questions
function delay() {
    if (currentQuestion < questionObj.length - 1) { //limits this function to the amount of questions in the trivia
        currentQuestion++;
        $("#question, #answers").empty();
        setNextQuestion();
        timer = 20;
        $("#submitButton").removeClass("hide");
        startTimer();
    } else { //if there are no more questions show the end screen
        gameOver();
    }
}
function quesDisplay() {
    $("#quesTracker").html("Question " + parseInt(currentQuestion + 1) + " of " + questionObj.length);
}
function correctAnswer() {
    answersCorrect++;
    correctAudio.play();
    $("#question").empty();
    $("#answers").html("Correct! The answer is " + questionObj[currentQuestion].choices[questionObj[currentQuestion].answer] + "." + "<br><img class = 'fluid-img p-0 picture m-3 col-md-4' src=" + questionObj[currentQuestion].image + ">");
    setTimeout(delay, 3000);
}

function wrongAnswer() {
    answersWrong++;
    wrongAudio.play();
    $("#question").empty();
    $("#answers").html("Wrong! The answer was " + questionObj[currentQuestion].choices[questionObj[currentQuestion].answer] + "." + "<br><img class = 'fluid-img p-0 picture m-3 col-md-4' src=" + questionObj[currentQuestion].image + ">");
    setTimeout(delay, 3000);
}

function gameOver() {
    endAudio.play();
    $("#question").html("You have finished the trivia!")
    $("#answers").html("Correct: " + answersCorrect + "<br>Incorrect: " + answersWrong + "<br>Score: " + ((answersCorrect / questionObj.length) * 100) + "\%");
    $("#restartButton").removeClass("hide");
    $("#submitButton").addClass("hide");
}

function unAnswered() {
    timedOut++;
    wrongAudio.play();
    $("#question").html("You have run out of time!");
    $("#answers").html("The answer was " + questionObj[currentQuestion].choices[questionObj[currentQuestion].answer] + "." + "<br><img class = 'fluid-img p-0 picture m-3 col-md-4' src=" + questionObj[currentQuestion].image + ">");
    setTimeout(delay, 3000);
}
function checkAnswer() {
    $("#submitButton").addClass("hide");
    if (userAnswer === questionObj[currentQuestion].answer) {
        clearInterval(intervalId);
        correctAnswer();
    } else {
        clearInterval(intervalId);
        wrongAnswer();
    }
}

$("#restartButton").on("click", function () {
    $("#question, #answers").empty();
    $("#restartButton").addClass("hide");
    $("#submitButton").removeClass("hide");
    reset();
});

$("#submitButton").on("click", function () {
    $("#submitButton").addClass("hide");
    userAnswer = $("input[type='radio']:checked").val();
    checkAnswer();
});

$("#startButton").on("click", function () {
    startAudio.play();
    $("#timer").html(timer + " seconds left.");
    $("#startButton").addClass("hide");
    $("#submitButton").removeClass("hide");
    setNextQuestion();
    startTimer();
});