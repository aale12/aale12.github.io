//declare variables
var questionObj = [
    {
        question: "The answer is A.",
        choices: ["A", "B", "C", "D"],
        answer: "A",
        name: "A",
        id: "one"
    },
    {
        question: "The answer is C",
        choices: ["D", "B", "C", "A"],
        answer: "C",
        name: "B",
        id: "two"
    },
    {
        question: "The answer is B",
        choices: ["C", "A", "B", "D"],
        answer: "B",
        name: "B",
        id: "three"
    },
    {
        question: "The answer is D",
        choices: ["D", "B", "A", "C"],
        answer: "D",
        name: "D",
        id: "four"
    }
];
var labels = ["a","b","c","d"]
var answersCorrect = 0;
var answersWrong = 0;
var timedOut = 0;
var timer = 5;
var intervalId;
var countdown;
var currentQuestion = 0;
var userAnswer = "";

function setNextQuestion() {
    $("#question").append("<p class='lead'>" + questionObj[currentQuestion].question + "</p>")
    for (i = 0; i < 4; i++){
        $("#answers").append("<input type='radio' name=" + questionObj[currentQuestion].name + "/><label for =" + questionObj[currentQuestion].choices[i] + ">"+ questionObj[currentQuestion].choices[i] +"</label><br/>");
    }
    currentQuestion++;
}

function countDown() {
    timer--;
    $("#timer").text(timer + " seconds left.");
    if (timer < 0){
        stopTimer();
        $("#timer").text("You have run out of time!")
        $("#question, #answers").empty();
    }
}

function stopTimer() {
    clearInterval(intervalId);
}

function startTimer() {
    intervalId = setInterval(countDown, 1000); 
}

$("#submitButton").on("click", function() {
    timer = 5;
    if (currentQuestion < questionObj.length){
        $("#question, #answers").empty();
        setNextQuestion();
        stopTimer();
        startTimer();
    }else{
        stopTimer();
        $("#question, #answers").empty();
        $("#timer").text("You have completed the trivia!");
    }
});
$("#startButton").on("click", function(){
    //console.log(questionObj[0]);
    $("#startButton").addClass("hide");
    $("#submitButton").removeClass("hide");
    setNextQuestion();
    startTimer();

});