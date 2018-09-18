
$("#goGif").on("click", function (event) {
    var gif = $("#gif-search").val();
    console.log(gif);
    var key = "80L0qb0M906AerItOYOwrTz26SfwF3t6";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + key + "&q=" + gif + "&limit=8&offset=0&rating=PG-13&lang=en";

    $.ajax({ url: queryURL, method: "GET" }).then(function (res) {
        console.log(res);
        for (i = 0; i < res.data.length; i++) {
            $("#gif-view").append("<img class='col-md-3 p-2 img-fluid' src='" + res.data[i].images.downsized.url + "'>");
        }
    });
});