let inventory = [
    { ID: 001, item: "plastic_framing", qua: 0 },
    { ID: 002, item: "wire_bundle", qua: 0 },
    { ID: 003, item: "sensor", qua: 0 },
    { ID: 004, item: "controller", qua: 0 },
    { ID: 005, item: "power_supply", qua: 0 },
];



// VARIABLES

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");

// Lots
let junkyard = {
    btn: "junkyard_btn",
    cooldown: 3000,
    loot: ["plastic_framing", "wire_bundle", "sensor"],
    search_message: "You are looking around the Junkyard...",
}

let salvage = {
    btn: "salvage_btn",
    cooldown: 3000,
    loot: ["plastic_framing", "controller", "power_supply"],
    search_message: "You are looking around the Salvage lot...",
}

// Terminal Messages
var messages = []     // current messages
var msg_hist = []     // all messages