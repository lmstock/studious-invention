// VARIABLES

let inventory = [
    { ID: 001, item: "plastic_framing", qua: 0 },
    { ID: 002, item: "wire_bundle", qua: 0 },
    { ID: 003, item: "sensor", qua: 0 },
    { ID: 004, item: "controller", qua: 0 },
    { ID: 005, item: "power_supply", qua: 0 },
];

// Plans

let r_1 = {
    name: "r1",
    cooldown: 3000,
    ind_message: "you are assembling an r_1",
    ingredients: {
        plastic_framing: 1,
        wire_bundle: 1,
        sensor: 1
    }
};

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");

// Lots
let junkyard = {
    btn: "junkyard_btn",
    cooldown: 3000,
    loot: ["plastic_framing", "wire_bundle", "sensor"],
    ind_message: "You are looking around the Junkyard...",
}

let salvage = {
    btn: "salvage_btn",
    cooldown: 3000,
    loot: ["plastic_framing", "controller", "power_supply"],
    ind_message: "You are looking around the Salvage lot...",
}

// Terminal Messages
let messages = []     // current messages
let msg_hist = []     // all messages