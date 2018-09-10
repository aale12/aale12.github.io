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

var myChar = {};
var myAttack;
var myLife;

var enemy = {};
var enemyAttack;
var enemyLife;

var identifier;
var characterChosen = false;
var enemyChosen = false;
var gameEnded = false;

var victories = 0;

var enemyID;
//console.log(heroSelection[0].name);
var bgm = new Audio('./assets/media/audio/The Occupation of Balmorra.mp3');
var blaster = new Audio('./assets/media/audio/blasterFire.mp3');
var clash = new Audio('./assets/media/audio/lightsaberClash.mp3');

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

function renderChar() {
    $("#charSelected").append($("<img class = 'img-fluid'>").attr("src", myChar.image))
        .append($("<p>").text(myChar.name))
        .append($("<p class = 'hp'>").text(myChar.health + "HP"));
}

function renderEnemy() {
    $("#enemySelected").append($("<img class = 'img-fluid'>").attr("src", enemy.image))
        .append($("<p>").text(enemy.name))
        .append($("<p class = 'hp'>").text(enemy.health + "HP"));
}

function reselectEnemy() {
    clearDefeatedEnemy();
    $(".enemy, enemiesText, #ajuntaDoc, #nagaDoc, #freedonDoc, #markaDoc").removeClass("hidden");
}
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

function renderGame() {
    gameEnded = false;
    characterChosen = false;
    enemyChosen = false;
    victories = 0;
    myChar = {};
    enemy = {};
    $("#enemySelected").empty();
    $("#charSelected").empty();
    $("#myChar").addClass("hidden");
    $("#defenderDoc").addClass("hidden");
    $(".availableChar, #reyDoc, #lukeDoc, #finnDoc, #hanDoc").removeClass("hidden");
    $(".enemy, #ajuntaDoc, #nagaDoc, #freedonDoc, #markaDoc").removeClass("hidden invisible");
    $(".restartButton").addClass("hidden");
    $("#gameMessage").text("Choose your character!");
}

alert("Forgotten Dark Lords of the Sith from a retconned universe have invaded! Select your hero to drive them back!");

$(".audioButton").on("click", function () {
    if (bgm.paused == false) {
        bgm.pause();
        $(".audioButton").text("Audio On")
    } else {
        bgm.play();
        $(".audioButton").text("Audio Off")
    }
})
$(".restartButton").on("click", function () {
    renderGame();
});
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

$(".continueButton").on("click", function () {
    $("#enemySelected").empty();
    reselectEnemy();
    $(".continueButton").addClass("hidden");
    $("#gameMessage").text("Choose your next opponent");
})
$(".attackButton").on("click", function () {
    if (gameEnded === false) {
        $("#gameMessage").empty();
        enemyLife -= myAttack;
        $("#enemySelected").children(".hp").text(enemyLife + " HP remaining");

        if (enemyLife > 0) {
            $("#gameMessage").text("You attack " + enemy.name + " for " + myAttack + " damage!");
            myAttack += myChar.attackPower;
            myLife -= enemy.counterPower;
            clash.play();
            if (myLife > 0) {
                $("#charSelected").children(".hp").text(myLife + " HP remaining");
                $("#gameMessage").append("<br />" + enemy.name + " Attacks you for " + enemyAttack + " damage!");
            } else {
                gameEnded = true;
                $("#charSelected").children(".hp").text("RIP");
                $("#gameMessage").text("You were defeated!");
                $(".attackButton").addClass("hidden");
                $(".restartButton").removeClass("hidden");
            }
        } else {
            victories++;
            enemyChosen = false;
            $(".attackButton").addClass("hidden");
            if (victories < 4) {
                $(".continueButton").removeClass("hidden");
            }
            $("#gameMessage").text("You have defeated " + enemy.name + "!");
            $("#enemySelected").children(".hp").text("RIP");
            if (victories === 4) {
                gameEnded = true;
                $("#gameMessage").text("Congratulations! You are victorious!")
                $(".restartButton").removeClass("hidden");
            }
        }
    }
});
