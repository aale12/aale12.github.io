//object of objects of heros
var heroSelection =
{
    "1":
    {
        name: "Luke Skywalker",
        health: 250, attackPower: 6, counterPower: null, image: "./assets/media/images/lukeImage.jpg"
    },
    "0":
    {
        name: "Rey",
        health: 215, attackPower: 8, counterPower: null, image: "./assets/media/images/reyImage.jpg"
    },
    "3":
    {
        name: "Han Solo",
        health: 150, attackPower: 15, counterPower: null, image: "./assets/media/images/hanImage.jpg"
    },
    "2":
    {
        name: "Finn",
        health: 340, attackPower: 4, counterPower: null, image: "./assets/media/images/finnImage.jpg"
    }
}

//object of objects of enemies
var enemies =
{
    "0":
    {
        name: "Ajunta Pall",
        health: 500, attackPower: null, counterPower: 10, image: "./assets/media/images/ajuntaImage.jpg"
    },
    "1":
    {
        name: "Marka Ragnos",
        health: 400, attackPower: null, counterPower: 15, image: "./assets/media/images/markaImage.jpg"
    },
    "2":
    {
        name: "Naga Sadow",
        health: 300, attackPower: null, counterPower: 20, image: "./assets/media/images/nagaImage.jpg"
    },
    "3":
    {
        name: "Freedon Nadd",
        health: 200, attackPower: null, counterPower: 25, image: "./assets/media/images/freedonImage.jpg"
    }
}
//Chosen Character object and Health/Attack variables
var myChar = {};
var myAttack;
var myLife;

//Chosen Enemy Object and Health/Attack Variables
var enemy = {};
var enemyAttack;
var enemyLife;

var identifier; //identifier for which character/enemy was clicked to store them

var characterChosen = false;
var enemyChosen = false;
var gameEnded = false;

var victories = 0;

//Audio Files
var bgm = new Audio('./assets/media/audio/The Occupation of Balmorra.mp3');
var blaster = new Audio('./assets/media/audio/blasterFire.mp3');
var clash = new Audio('./assets/media/audio/lightsaberClash.mp3');

//modifies the myChar object to match the chosen hero
function storeChar() {
    for (i = 0; i < 4; i++) {
        switch (identifier) {
            case i.toString(): myChar.name = heroSelection[i].name;
            case i.toString(): myChar.health = heroSelection[i].health;
            case i.toString(): myChar.attackPower = heroSelection[i].attackPower;
            case i.toString(): myChar.image = heroSelection[i].image;
                console.log(myChar);
        }
        myAttack = myChar.attackPower;
        myLife = myChar.health;
    }
}

//modifies enemy object to match chosen enemy
function storeEnemy() {
    for (i = 0; i < 4; i++) {
        switch (identifier) {
            case i.toString(): enemy.name = enemies[i].name;
            case i.toString(): enemy.health = enemies[i].health;
            case i.toString(): enemy.counterPower = enemies[i].counterPower;
            case i.toString(): enemy.image = enemies[i].image;
                enemyID = i;
                console.log(enemy);
        }
        enemyAttack = enemy.counterPower;
        enemyLife = enemy.health;
    }
}

//replicates chosen character to then attacker zone
function renderChar() {
    $("#charSelected").append($("<img class = 'img-fluid'>").attr("src", myChar.image))
        .append($("<p>").text(myChar.name))
        .append($("<p class = 'hp'>").text(myChar.health + "HP"));
}

//replicates chosen enemy to defender zone
function renderEnemy() {
    $("#enemySelected").append($("<img class = 'img-fluid'>").attr("src", enemy.image))
        .append($("<p>").text(enemy.name))
        .append($("<p class = 'hp'>").text(enemy.health + "HP"));
}

//makes remaining enemies visible for battle selection
function reselectEnemy() {
    clearDefeatedEnemy();
    $(".enemy, enemiesText, #ajuntaDoc, #nagaDoc, #freedonDoc, #markaDoc").removeClass("hidden");
}

//removes the recently defeated enemy from list of available enemies to defeat
function clearDefeatedEnemy() {
    switch (identifier.toString()) {
        case "0": $("#ajuntaEnemy, #ajuntaDoc").addClass("invisible");
            break;
        case "1": $("#markaEnemy, #markaDoc").addClass("invisible");
            break;
        case "2": $("#nagaEnemy, #nagaDoc").addClass("invisible");
            break;
        case "3": $("#freedonEnemy, #freedonDoc").addClass("invisible");
            break;
    }
}

//resets the variables for a new game
function renderGame() {
    gameEnded = false;
    characterChosen = false;
    enemyChosen = false;
    victories = 0;
    myChar = {};
    enemy = {};
    $("#enemySelected, #charSelected").empty();
    $("#myChar, #defenderDoc").addClass("hidden");
    $(".availableChar, #reyDoc, #lukeDoc, #finnDoc, #hanDoc, .enemy, #ajuntaDoc, #nagaDoc, #freedonDoc, #markaDoc").removeClass("hidden invisible");
    $(".restartButton").addClass("hidden");
    $("#gameMessage").text("Choose your character!");
}

alert("Forgotten Dark Lords of the Sith from a retconned universe have invaded! Select your hero to drive them back!");

//audio button
$(".audioButton").on("click", function () {
    if (bgm.paused == false) {
        bgm.pause();
        $(".audioButton").text("Audio On")
    } else {
        bgm.play();
        $(".audioButton").text("Audio Off")
    }
});


//reset button
$(".restartButton").on("click", function () {
    renderGame();
});

//stores and renders chosen character, and hides unchosen characters.
$(".availableChar").on("click", function () {
    if (characterChosen === false) {
        identifier = $(this).attr("value");
        storeChar();
        renderChar();
        $("#myChar").removeClass("hidden");
        $(".availableChar, #reyDoc, #lukeDoc, #finnDoc, #hanDoc").addClass("hidden");
        $("#gameMessage").text("You've chosen " + myChar.name + "! Choose your opponent!")
        characterChosen = true;
    }
});

//stores and renders enemy, hides other enemies, and preps the battle area
$(".enemy").on("click", function () {
    if (characterChosen === true && enemyChosen === false) {
        identifier = $(this).attr("value");
        storeEnemy();
        renderEnemy();
        $("#defenderDoc").removeClass("hidden");
        $(".enemy, .enemiesText, #ajuntaDoc, #nagaDoc, #freedonDoc, #markaDoc").addClass("hidden");
        $("#gameMessage").text("Your opponent is " + enemy.name + ". Click attack to fight!")
        $(".attackButton").removeClass("hidden");
        enemyChosen = true;
    }
});

//removes defeated enemy from defender, puts remaining enemies back except those that were defeated
$(".continueButton").on("click", function () {
    $("#enemySelected").empty();
    reselectEnemy();
    $(".continueButton").addClass("hidden");
    $("#gameMessage").text("Choose your next opponent");
})

//attack function
$(".attackButton").on("click", function () {
    if (gameEnded === false) {  //if you havent won or lost
        $("#gameMessage").empty();  // clear the message
        enemyLife -= myAttack;  //deal damage to enemy
        $("#enemySelected").children(".hp").text(enemyLife + " HP remaining"); //update enemy HP value on the page

        if (enemyLife > 0) {  //if enemy is still alive
            $("#gameMessage").text("You attack " + enemy.name + " for " + myAttack + " damage!"); //tell user how much damage they dealt
            myAttack += myChar.attackPower; //increaes player attack power by the base amount
            myLife -= enemy.counterPower; //enemy deals damage to player
            clash.play(); //play battle sound effect
            if (myLife > 0) { //if you are still alive
                $("#charSelected").children(".hp").text(myLife + " HP remaining"); //update player health on the page
                $("#gameMessage").append("<br />" + enemy.name + " Attacks you for " + enemyAttack + " damage!"); //on a new line, tell user how much damage was dealt to them
            } else { // if you are dead
                gameEnded = true; //game is over, attack button is removed and restart button added, adds relevant messages
                $("#charSelected").children(".hp").text("RIP");
                $("#gameMessage").text("You were defeated!");
                $(".attackButton").addClass("hidden");
                $(".restartButton").removeClass("hidden");
            }
        } else { //if enemy is dead
            victories++; //add 1 to victory count
            enemyChosen = false;
            $(".attackButton").addClass("hidden"); //remove attack button
            if (victories < 4) { //if there are enemies remaining
                $(".continueButton").removeClass("hidden"); // show the reselect enemy button
            }
            $("#gameMessage").text("You have defeated " + enemy.name + "!"); //tell user who they defeated
            $("#enemySelected").children(".hp").text("RIP"); //HP text to RIP
            if (victories === 4) { //if all enemies are defeated
                gameEnded = true;
                $("#gameMessage").text("Congratulations! You are victorious!") //you win!
                $(".restartButton").removeClass("hidden"); //restart!
            }
        }
    }
});
