//variable declaration
var queryURL;
var key = "80L0qb0M906AerItOYOwrTz26SfwF3t6";
var topics = ["cats", "dogs", "horses", "frogs", "pigs"];
var gifID; //corresponds to the gif topic
var NSFW = false;
//needed fix to show bootstrap tooltips
$(document).ready(function () {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
    renderButtons();
});

//runs through topics array and renders the topic buttons on the screen
function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        $("#gif-buttons").append("<button value='" + i + "' type='button' class='gif-btn btn btn-secondary m-2'>" + topics[i] + "</button>");
    }
}
//adds topic to topic array and refreshes the buttons
$("#goGif").on("click", function (event) {
    event.preventDefault();
    var input = $("#gif-search").val().trim();
    if (topics.indexOf(input.toLowerCase()) < 0 && input.length > 0) { // makes sure the topic is not already in the array and has a length of at least 1 character
        topics.push(input);
    }
    renderButtons();
    $("#gif-search").val("");
});

$(document).on("click", ".btn", function () {
    var clickAudio = new Audio("./assets/media/audio/click.mp3");
    clickAudio.play();
});

$(document).on("click", ".gif-btn", function () {
    $("#gif-view").empty();
    gifID = $(this).val();
    //console.log(gif);
    if (NSFW === true) {
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + topics[gifID] + "&limit=10&offset=0&rating=R&lang=en";
    } else {
        queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + topics[gifID] + "&limit=10&offset=0&rating=PG-13&lang=en";
    }
    $.ajax({ url: queryURL, method: "GET" }).then(function (res) {
        for (i = 0; i < res.data.length; i++) {
            //appends the gifs with rating caption as a button
            $("#gif-view").append("<figure ='rating'><figcaption class='text-center'><button data-toggle='tooltip' data-placement='top' title='Copy link to clipboard' type='button' value=" + i + " id='clip-" + i + "' class='clip-btn btn btn-secondary'> Rating: " + res.data[i].rating.toUpperCase() + "</button></figcaption><img id='img-" + i + "' class='m-2 gif' value='" + i + "' src='" + res.data[i].images.downsized_still.url + "'></figure>");
        }
    });
});
//toggles R rating switch
$("#toggleNSFW").on("click", function () {
    if (NSFW === false) {
        NSFW = true;
        $("#toggleNSFW").addClass("btn-danger").removeClass("btn-dark").text("Toggle Rating: PG-13");
    } else if (NSFW === true) {
        NSFW = false;
        $("#toggleNSFW").addClass("btn-dark").removeClass("btn-danger").text("Toggle Rating: R");
    }
});
//copy to clipboard and set the appropriate tooltip
$(document).on("click", ".clip-btn", function () {
    copyToClipboard($("#img-" + $(this).val()));
    $(this).tooltip('hide').attr('data-original-title', "Copied!").tooltip('show');
    setTimeout(function () {
        $(this).tooltip('hide');
    }, 1000);
});
//copy to clipboard function
function copyToClipboard(element) {
    var $temp = $("<input>");//makes temporary invisible div to hold the text about to be copied in the clipboard
    var gifLink = $(element).attr("src");
    $("body").append($temp);//appends that text
    if (element.hasClass("play") === true) {//if gif is currently playing
        $temp.val(gifLink).select();//text to be copied is the url
    } else {//if gif isnt playing
        $temp.val(gifLink.substr(0, gifLink.length - 6) + ".gif").select();
    }
    document.execCommand("copy");//copies that text into the clipboard
    $temp.remove();//remove the temp div
}
//play/pause function for gif
$(document).on("click", ".gif", function () {
    var gifLink = $(this).attr("src");
    if ($(this).hasClass("play")) {
        $(this).attr("src", gifLink.replace(".gif", "_s.gif")).removeClass("play");
    } else {
        $(this).addClass("play").attr("src", gifLink.replace("_s.gif", ".gif"));
    }
}); 