var heroSelection =
{
    "knight":
    {
        name: "Luke Skywalker", 
        health: 175, attackPower: 6, image: "../media/images/lukeImage.jpg"
    },
    "consular":
    {   
        name: "Rey", 
        health: 150, attackPower: 8, image: "../media/images/reyImage.jpg"
    },
    "smuggler":
    {
        name: "Han Solo", 
        health: 125, attackPower: 10, image: "../media/images/hanImage.jpg"
    },
    "trooper":
    {
        name: "Finn", 
        health: 200, attackPower: 4, image: "../media/images/finnImage.jpg"
    }
}

var enemies =
{
    "ajuntaP":
    {
        name: "Ajunta Pall", 
        health: 500, retaliatePower: 25, image: "../media/images/ajuntaImage.jpg"
    },
    "markaR":
    {
        name: "Marka Ragnos", 
        health: 400, retaliatePower: 20, image: "../media/images/markaImage.jpg"
    },
    "nagaS":
    {
        name: "Naga Sadow", 
        health: 300, retaliatePower: 15, image: "../media/images/nagaImage.jpg"
    },
    "freedonN":
    {
        name: "Freedon Nadd", 
        health: 200, retaliatePower: 10, image: "../media/images/freedonImage.jpg"
    }
}

var myChar = {};
var myAttack = myChar.attackPower;
var myLife = myChar.health;

var enemy = {};
var enemyAttack = enemy.attackPower;
var enemyLife = enemy.health;

function renderGame() {

}

$(document).ready(function (){
    
})