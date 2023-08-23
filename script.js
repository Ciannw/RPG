let xp = 0;
let health = 100;
let gold = 50;
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
    },
    {
        name: "Fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster. What do you want to do?"
    },
    {
        name: "Kill monster",
        "button text": ["Go to town square", " ", " "],
        "button functions": [goTown, goTown, goTown],
        text: "The monster lets out a scream and falls to the ground. You earned XP and Gold for your victory."
    },
    {
        name: "Lose",
        "button text": ["Replay?", " ", " "],
        "button functions": [restart, restart, restart],
        text: "You died RIP."},
    {
        name: "Win",
        "button text": ["Replay?", " ", " "],
        "button functions": [restart, restart, restart],
        text: "You defeated the dragon and saved the town. You won and are now a hero!"}


    ];
const monsters = [
    {
        name: "slime",
        level:2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
        },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];


// Initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
    monsterStats.style.display = "none";
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
    fighting = 2;
    goFight();
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
    fighting = 0;
    goFight();
}

function fightFangedBeast() {
    fighting =1;
    goFight();
}
function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}
function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack the " + monsters[fighting].name + " with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level ;
    monsterHealth -= weapons[currentWeapon].damage + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();}
    else if (monsterHealth <= 0) {
        fighting == 2 ? winGame() : defeatMonster();
    }
}

function dodge(){
    text.innerText = "You dodge the " + monsters[fighting].name + "'s attack.";}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    xpText.innerText = xp;
    goldText.innerText = gold;
    update(locations[4]);
}
function lose(){
    update(locations[5]);
}
function winGame(){
    update(locations[6]);}

function restart(){
    xp = 0;
    health = 100;
    gold = 80;
    currentWeapon = 0;
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}