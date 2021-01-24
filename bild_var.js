// VARIABLES

let debug = 1;

let inventory = [
    { ID: 101, item: "plastic_framing", qua: 3 },
    { ID: 102, item: "wire_bundle", qua: 3 },
    { ID: 103, item: "sensor", qua: 4 },
    { ID: 104, item: "controller", qua: 5 },
    { ID: 105, item: "power_supply", qua: 3 },
];

let assemblies = [
    {ID: 201, item: "r1" , qua: 0 },
    {ID: 202, item: "r2" , qua: 0 },
    {ID: 203, item: "r3" , qua: 0 },
    {ID: 204, item: "r4" , qua: 0 },
    {ID: 205, item: "r5" , qua: 0 },
]

// Plans
// construct assemblies programmatically

let r1 = {
    name: "r1",
    btn: document.getElementById("r1_craft_btn"),
    assembly_table: document.getElementById("r1"),
    cooldown: 3000,
    cool_msg: "you are assembling an r1",
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
    cool_msg: "you are assembling an r2",
    cooldown: 3000,
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
    cool_msg: "you are assembling an r3",
    cooldown: 3000,
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
    cool_msg: "you are rummaging through the junkyard...",
    action: "loot",
    loot: ["plastic_framing", "wire_bundle", "sensor"],
}

let salvage = {
    name: "salvage",
    btn: "salvage_btn",
    cooldown: 3000,
    cool_msg: "you are rummaging through the salvage lot...",
    action: "loot",
    loot: ["plastic_framing", "controller", "power_supply"],
}

// Terminal Messages
let messages = []     // current messages
let msg_hist = []     // all messages