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
var database = firebase.database();
var yourName = "Guest";

$("#username-submit").on("click", function (event) {
    event.preventDefault();
    yourName = $("#username-input").val().trim();
    if (yourName.length > 0) {
        var joinMessage = yourName + " has joined!";
        console.log(joinMessage);
        var chatKey = database.ref("/chat").push().key;
        database.ref("chat/" + chatKey).set(joinMessage);
    }
    $("#username-input").val("");
});

$("#chat-submit").on("click", function (event) {
    event.preventDefault();
    var chatMessage = yourName + ": " + $("#chat-input").val().trim();
    if (chatMessage.length > 0) {
        console.log(chatMessage);
        var chatKey = database.ref("/chat").push().key;
        database.ref("chat/" + chatKey).set(chatMessage);
    }
    $("#chat-input").val("");
});

database.ref("/chat").on("child_added", function (snap) {
    var message = snap.val();
    $("#chatLog").append(message + "<br>");
})