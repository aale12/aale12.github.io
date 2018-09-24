var queryURL;
var key = "80L0qb0M906AerItOYOwrTz26SfwF3t6";
var topics = ["cats", "dogs", "horses", "frogs", "pigs"];
var gifID;
var NSFW = false;
$(document).ready(function () {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        $("#gif-buttons").append("<button value='" + i + "' type='button' class='gif-btn btn btn-secondary m-2'>" + topics[i] + "</button>");
    }
}

$("#goGif").on("click", function (event) {
    event.preventDefault();
    var input = $("#gif-search").val();
    if (topics.indexOf(input) < 0 && input.length > 0) {
        topics.push(input);
    }
    renderButtons();
    $("#gif-search").val("");
});

renderButtons();
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
    console.log(queryURL);
    $.ajax({ url: queryURL, method: "GET" }).then(function (res) {
        console.log(res);
        for (i = 0; i < res.data.length; i++) {
            // $("#gif-view").append("<figure ='rating'><figcaption class='text-center'> Rating: " + res.data[i].rating + "</figcaption><img class='m-2 gif' value='" + i + "' src='" + res.data[i].images.downsized_still.url + "'></figure>");
            $("#gif-view").append("<figure ='rating'><figcaption class='text-center'><button data-toggle='tooltip' data-placement='top' title='Copy link to clipboard' type='button' value=" + i + " id='clip-" + i + "' class='clip-btn btn btn-secondary'> Rating: " + res.data[i].rating.toUpperCase() + "</button></figcaption><img id='img-" + i + "' class='m-2 gif' value='" + i + "' src='" + res.data[i].images.downsized_still.url + "'></figure>");
            //onclick=\"copyToClipboard('#img-" + i + "')\"
        }
    });
});

$("#toggleNSFW").on("click", function () {
    if (NSFW === false) {
        NSFW = true;
        $("#toggleNSFW").addClass("btn-danger").removeClass("btn-dark").text("Toggle Rating: PG-13");
    } else if (NSFW === true) {
        NSFW = false;
        $("#toggleNSFW").addClass("btn-dark").removeClass("btn-danger").text("Toggle Rating: R");

    }
    console.log(NSFW);
});

function setTooltip(btn, message) {
    $(btn).tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip(btn) {
    setTimeout(function () {
        $(btn).tooltip('hide');
    }, 1000);
}

$(document).on("click", ".clip-btn", function () {
    //var test = $(this).val();
    //console.log(test);
    copyToClipboard($("#img-" + $(this).val()));
    setTooltip(this, "Copied!");
    hideTooltip(this);
});
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).attr("src")).select();
    document.execCommand("copy");
    $temp.remove();
}

$(document).on("click", ".gif", function () {
    var gifLink = $(this).attr("src");
    if ($(this).hasClass("play")) {
        $(this).attr("src", gifLink.replace(".gif", "_s.gif"))
            .removeClass("play");
    } else {
        $(this).addClass('play')
            .attr("src", gifLink.replace("_s.gif", ".gif"));
    }
}); 