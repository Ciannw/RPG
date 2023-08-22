let xp = 0;
let health = 100;
let gold = 80;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
    {
        name: "stick",
        damage: 5
    },
{
    name: "dagger",
    damage: 30
},
{ name: "sword", 
damage: 100
}
]
const locations = [
    {
        name: "Town Square",
        "button text": ["go to store", "go to cave", "fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. Where do you want to go?"
    },
    {
        name: "Store",
        "button text": ["buy 10 health (10 gold)", "buy weapon (30 gold)", "go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You are in the store. What do you want to do?"
    },
    {
        name: "Cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightFangedBeast, goTown],
        text: "You are in the cave. You see some monsters. What do you want to do?"
    }
];

// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "The transaction was a success. You bought 10 health";
    } else {
        text.innerText = "You don't have enough gold to buy health";
    }
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function fightDragon() {
    console.log("Fighting dragon");
}

function buyWeapon() {
    if (currentWeapon == weapons.length - 1) {
        text.innerText = "You already have the best weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
    else if (gold >= 30) {
        gold -= 30;
        currentWeapon += 1;
        goldText.innerText = gold;
        text.innerText = "The transaction was a success. You upgraded your weapon from a " + weapons[currentWeapon - 1].name + " to a " + weapons[currentWeapon].name + ".";
        inventory.pop(weapons[currentWeapon - 1].name);
        inventory.push(weapons[currentWeapon].name);
        text.innerText += " Your inventory is now " + inventory;
    } else {
        text.innerText = "You don't have enough gold to upgrade your weapon";
    }
}
function sellWeapon() {
    if (currentWeapon == 0) {
        text.innerText = "You can't sell your "+ weapons[0].name + " because then you would be unarmed";}
    else {
    gold += 15;
    goldText.innerText = gold;
    text.innerText = "You sold your " + weapons[currentWeapon].name + " for 15 gold";
    inventory.pop(weapons[currentWeapon].name);
    currentWeapon -= 1;
    inventory.push(weapons[currentWeapon].name);
    text.innerText += " Your inventory is now " + inventory;}}
function goTown() {
    update(locations[0]);
}

function fightSlime() {
    console.log("Fighting slime");
}

function fightFangedBeast() {
    console.log("Fighting fanged beast");
}

