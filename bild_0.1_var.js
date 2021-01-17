// VARIABLES

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");

// Lots
let junkyard = {
    btn: "junkyard_btn",
    cooldown: 3000,
    loot: ["screw", "nut", "bolt"],
    search_message: "You are looking around the Junkyard...",
}

let salvage = {
    btn: "salvage_btn",
    cooldown: 3000,
    loot: ["battery", "motor", "wire"],
    search_message: "You are looking around the Salvage lot...",
}

// Terminal Messages
var messages = []     // current messages
var msg_hist = []     // all messages