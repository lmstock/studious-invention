// VARIABLES

let debug = 1;

let inventory = [
    { ID: 101, item: "plastic_framing", qua: 0 },
    { ID: 102, item: "wire_bundle", qua: 0 },
    { ID: 103, item: "sensor", qua: 0 },
    { ID: 104, item: "controller", qua: 0 },
    { ID: 105, item: "power_supply", qua: 0 },
];

let assemblies = [
    {ID: 201, item: "robot_1" , qua: 0 },
    {ID: 202, item: "robot_2" , qua: 0 },
    {ID: 203, item: "robot_3" , qua: 0 },
    {ID: 204, item: "robot_4" , qua: 0 },
    {ID: 205, item: "robot_5" , qua: 0 },
]

// Plans


let r1 = {
    name: "r1",
    btn: document.getElementById("r1_craft_btn"),
    cooldown: 3000,
    ind_message: "you are assembling an r1",
    action: "craft",
    ingredients: {
        plastic_framing: 1,
        wire_bundle: 1,
        sensor: 1
    }
};

let r2 = {
    name: "r2",
    btn: document.getElementById("r2_craft_btn"),
    cooldown: 3000,
    ind_message: "you are assembling an r2",
    action: "craft",
    ingredients: {
        power_supply: 1,
        wire_bundle: 1,
        sensor: 1
    }
};

let r3 = {
    name: "r3",
    btn: document.getElementById("r3_craft_btn"),
    cooldown: 3000,
    ind_message: "you are assembling an r3",
    action: "craft",
    ingredients: {
        controller: 1,
        wire_bundle: 1,
        sensor: 1
    }
};

let craftable_units = [r1, r2, r3];

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");


// Lots
let junkyard = {
    name: "junkyard",
    btn: "junkyard_btn",
    cooldown: 3000,
    action: "loot",
    loot: ["plastic_framing", "wire_bundle", "sensor"],
    ind_message: "You are looking around the Junkyard...",
}

let salvage = {
    name: "salvage",
    btn: "salvage_btn",
    cooldown: 3000,
    action: "loot",
    loot: ["plastic_framing", "controller", "power_supply"],
    ind_message: "You are looking around the Salvage lot...",
}

// Terminal Messages
let messages = []     // current messages
let msg_hist = []     // all messages