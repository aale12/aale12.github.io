// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgnsuoqNbFupMCJ_tsAvTu-mUZjIrlxFs",
    authDomain: "rpsmp-bea5f.firebaseapp.com",
    databaseURL: "https://rpsmp-bea5f.firebaseio.com",
    projectId: "rpsmp-bea5f",
    storageBucket: "",
    messagingSenderId: "484874273337"
};
firebase.initializeApp(config);
//firebase variables
var d = firebase.database();
var fChat = d.ref("/chat/");
var fP = d.ref("players/");
var fP1 = d.ref("players/p1");
var fP2 = d.ref("players/p2");
var connectionsRef = d.ref("/connections");
var connectedRef = d.ref(".info/connected");
var gameText = $("#gameText");
var refChoices = ["rock", "paper", "scissors"];
//local variables
var yourName = "Guest";
var guestID = 1;
var p2 = { name: "", choice: "", wins: 0, losses: 0, ties: 0 };
var p1 = { name: "", choice: "", wins: 0, losses: 0, ties: 0 };
var isPlayer = false;
connectedRef.on("value", function (snap) {
    if (snap.val()) {
        // Add user to the connections list.
        var con = connectionsRef.push(true);
        // Remove user from the connection list when they disconnect.
        con.onDisconnect().remove();
    }
});
// When first loaded or when the connections list changes...
connectionsRef.on("value", function (snap) {

    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    //$("#watchers").text(snap.numChildren());
});

function updatePlayerDisplay(player, playerName,){// playerWins, playerLosses, playerTies) {
    $("#name-" + player).html(playerName);
    //$("stats-" + player).append("<li>Wins: " + playerWins + "</li><li>Losses: " + playerLosses + "</li><li>Ties: " + playerTies + "</li>");
}
fP.on("value", function (s) {
    var fP1Choice = s.child("p1/choice").val();
    var fP2Choice = s.child("p2/choice").val();
    if (s.child("p1").exists() === true) {
        updatePlayerDisplay("player1", s.child("p1/name").val());//, s.child("p1/wins").val(), s.child("p1/losses").val(), s.child("p1/ties").val());
        if (refChoices.includes(fP1Choice)) {
            $("#p1-board").html("<img class = 'p-2 img-fluid' src='./assets/media/images/choicePend.png'>");
            //console.log(fP1Choice);
        }
    } else {
        updatePlayerDisplay("player1", "Waiting for Player 1...");
        console.log("p1 does not exist");
    }
    if (s.child("p2").exists() === true) {
        updatePlayerDisplay("player2", s.child("p2/name").val());//, s.child("p2/wins").val(), s.child("p2/losses").val(), s.child("p2/ties").val());
        //console.log("p2 exists");
        if (refChoices.includes(fP2Choice)) {
            $("#p2-board").html("<img class = 'p-2 img-fluid' src='./assets/media/images/choicePend.png'>");
            console.log(fP2Choice);
        }
    } else {
        updatePlayerDisplay("player2", "Waiting for Player 2...");
        console.log("p2 does not exist");
    }
    if (s.child("p1").exists() && s.child("p2").exists() && refChoices.includes(fP1Choice) && refChoices.includes(fP2Choice)) {
        // switch (fP1Choice) {
        //     case "rock":
        //         switch (fP2Choice) {
        //             case "rock":
        //                 p1.ties++;
        //                 p2.ties++;
        //                 console.log("draw");
        //                 gameText.html("It's a draw!");
        //                 break;
        //             case "paper":
        //                 p1.losses++;
        //                 p2.wins++;
        //                 console.log("p1lose");
        //                 gameText.html(s.child("p2/name").val() + " wins!");
        //                 break;
        //             case "scissors":
        //                 p1.wins++;
        //                 p2.losses++;
        //                 console.log("p1win");
        //                 gameText.html(s.child("p1/name").val() + " wins!");
        //                 break;
        //         }
        //         break;
        //     case 'paper':
        //         switch (fP2Choice) {
        //             case 'rock':
        //                 p1.wins++;
        //                 p2.losses++;
        //                 console.log("p1win");
        //                 gameText.html(s.child("p1/name").val() + " wins!");
        //                 break;
        //             case 'paper':
        //                 p1.ties++;
        //                 p2.ties++;
        //                 console.log("draw");
        //                 gameText.html("It's a draw!");
        //                 break;
        //             case 'scissors':
        //                 p1.losses++;
        //                 p2.wins++;
        //                 console.log("p1lose");
        //                 gameText.html(s.child("p2/name").val() + " wins!");

        //                 break;
        //         }
        //         break;
        //     case 'scissors':
        //         switch (fP2Choice) {
        //             case 'rock':
        //                 p1.losses++;
        //                 p2.wins++;
        //                 console.log("p1lose");
        //                 gameText.html(s.child("p2/name").val() + " wins!");

        //                 break;
        //             case 'paper':
        //                 p1.wins++;
        //                 p2.losses++;
        //                 console.log("p1win");
        //                 gameText.html(s.child("p1/name").val() + " wins!");

        //                 break;
        //             case 'scissors':
        //                 p1.ties++;
        //                 p2.ties++;
        //                 console.log("draw");
        //                 gameText.html("It's a draw!");

        //                 break;
        //         }
        //         break;
        //}
        if (fP1Choice === fP2Choice) {
            p1.ties++;
            p2.ties++;
            console.log("draw");
            gameText.html("It's a draw!");
        } else if (fP1Choice === "rock") {
            if (fP2Choice === "scissors") {
                p1.wins++;
                p2.losses++;
                console.log("p1wins");
                gameText.html(s.child("p1/name").val() + "wins!");
            } else {
                p1.losses++
                p2.wins++;
                console.log("p2wins");
                gameText.html(s.child("p2/name").val() + "wins!");
            }
        } else if (fP1Choice === "paper") {
            if (fP2Choice === "rock") {
                p1.wins++;
                p2.losses++;
                console.log("p1wins");
                gameText.html(s.child("p1/name").val() + "wins!");
            } else {
                p1.losses++
                p2.wins++;
                console.log("p2wins");
                gameText.html(s.child("p2/name").val() + "wins!");
            }
        } else if (fP1Choice === "scissors") {
            if (fP2Choice === "paper") {
                p1.wins++;
                p2.losses++;
                console.log("p1wins");
                gameText.html(s.child("p1/name").val() + "wins!");
            } else {
                p1.losses++
                p2.wins++;
                console.log("p2wins");
                gameText.html(s.child("p2/name").val() + "wins!");
            }
        }
        $("#p1-board").html("<i class='fas fa-hand-" + fP1Choice + "'>");
        $("#p2-board").html("<i class='fas fa-hand-" + fP2Choice + "'>");
        fP1.update(p1);
        fP2.update(p2);
        nextRound();
        console.log("checkWInnder");
        d.ref("players/p1/choice").remove();
        d.ref("players/p2/choice").remove();
    }
});
function nextRound() {
    setTimeout(function () {
        $("#p1-board, #p2-board").empty();
        gameText.html("Next Round!<br>Choose rock, paper, or scissors.")
    }, 3000);
}
$("#username-submit").on("click", function (event) {
    event.preventDefault();
    yourName = $("#username-input").val().trim();
    if (yourName.length > 0) {
        fP.once("value", function (s) {
            if (s.child("p1").exists() === false) { //if p1 is not set
                p1.name = yourName; //set local p1 name to entered name
                fP1.update(p1); //store local p1 object into firebase
                isPlayer = true;
                gameText.html("You are " + p1.name + ".<br>Choose rock, paper, or scissors.");
                console.log(yourName + " is player 1");
                fP1.onDisconnect().remove(); //when user disconnects, remove object from firebase
            } else if (s.child("p2").exists() === false) {
                p2.name = yourName;
                fP2.update(p2);
                isPlayer = true;
                gameText.html("You are " + p2.name + ".<br>Choose rock, paper, or scissors.");
                console.log(yourName + " is player 2");
                fP2.onDisconnect().remove();
            } else {
                console.log("The game is full");
                var guestKey = d.ref("/players").push().key;
                d.ref("players/" + guestKey).set(yourName);
                d.ref("players/" + guestKey).onDisconnect().remove();
            }
            var joinMessage = yourName + " has joined!";
            console.log(joinMessage);
            var chatKey = d.ref("/chat").push().key; //declare a unique chat ckey
            d.ref("chat/" + chatKey).set(joinMessage);
        });
        $("#nameInputDiv").addClass("hide");
        $("#username-input").val("");
    } else {
        console.log("Please enter a name");
    }
});
$(document).on("click", ".btn-p1", function (e) {
    if (isPlayer === true) {
        var choice = $(this).attr("data-value");
        console.log("P1 choice: " + choice);
        gameText.html("You've chosen " + choice + ".");
        p1.choice = choice;
        fP1.update(p1);
    } else {
        gameText.text("The game is full!")
    }
});
$(document).on("click", ".btn-p2", function (e) {
    if (isPlayer === true) {
        var choice = $(this).attr("data-value");
        console.log("P2 choice: " + choice);
        gameText.html("You've chosen " + choice + ".");
        p2.choice = choice;
        fP2.update(p2);
    } else {

    }

});
$("#chat-submit").on("click", function (event) {
    event.preventDefault();
    var chatMessage = yourName + ": " + $("#chat-input").val().trim();
    if (chatMessage.length > 0) {
        console.log(chatMessage);
        var chatKey = d.ref("/chat").push().key;
        d.ref("chat/" + chatKey).set(chatMessage);
    }
    $("#chat-input").val("");
});

fChat.on("child_added", function (snap) {
    $("#chatLog").append("<div>" + snap.val() + "</div>").scrollTop($("#chatLog")[0].scrollHeight);
});
