var queryURL;
var key = "80L0qb0M906AerItOYOwrTz26SfwF3t6";
var topics = ["cats", "dogs", "horses", "frogs", "pigs"];
var gifID;
function renderButtons() {
    $("#gif-buttons").empty();
    for (var i = 0; i < topics.length; i++) {
      $("#gif-buttons").append("<button value='" + i + "' type='button' class='gif-btn btn btn-secondary m-2'>" + topics[i] + "</button>");
    }
  }

  $("#goGif").on("click", function () {
    event.preventDefault();
    var input = $("#gif-search").val();
    if (topics.indexOf(input) < 0 && input.length > 0) {
      topics.push(input);
    }
    renderButtons();
    $("#gif-search").val("");
  });
  renderButtons();

$(document).on("click", ".gif-btn", function () {
    $("#gif-view").empty();
    gifID = $(this).val();
    //console.log(gif);
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + topics[gifID] + "&limit=10&offset=0&rating=PG-13&lang=en";
    console.log(queryURL);
    $.ajax({ url: queryURL, method: "GET" }).then(function (res) {
        console.log(res);
        for (i = 0; i < res.data.length; i++) {
            // $("#gif-view").append("<figure ='rating'><figcaption class='text-center'> Rating: " + res.data[i].rating + "</figcaption><img class='m-2 gif' value='" + i + "' src='" + res.data[i].images.downsized_still.url + "'></figure>");
            $("#gif-view").append("<figure ='rating'><figcaption class='text-center'><button type='button' value=" + i + " id='clip-" + i + "' class='clip-btn btn btn-secondary'> Rating: " + res.data[i].rating + "</button></figcaption><img id='img-" + i + "' class='m-2 gif' value='" + i + "' src='" + res.data[i].images.downsized_still.url + "'></figure>");
        }
    });
});

function copyToClipboard(element) {
    
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