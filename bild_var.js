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

function Assembly(name, btn, assembly_table, cooldown, action, ingredients) {
    this.name = name;
    this.btn = btn;
    this.assembly_table = assembly_table;
    this.cooldown = cooldown;
    this.action = action;
    this.ingredients = ingredients;
    this.cool_msg = function() {return "You are assembling an " + this.name;};  
}

let r1_ingredients = { plastic_framing: 1, wire_bundle: 1, sensor: 1 };
let r2_ingredients = { power_supply: 1, wire_bundle: 1, sensor: 1 };
let r3_ingredients = { controller: 1, wire_bundle: 1, sensor: 1 };

let r1 = new Assembly("r1", document.getElementById("r1_craft_btn"), document.getElementById("r1"), 3000, "craft", r1_ingredients);
let r2 = new Assembly("r2", document.getElementById("r2_craft_btn"), document.getElementById("r2"), 3000, "craft", r2_ingredients);
let r3 = new Assembly("r3", document.getElementById("r3_craft_btn"), document.getElementById("r3"), 3000, "craft", r3_ingredients);

//  WHAT AM I USING THIS FOR?? 
// This list leads the check_craft_buttons, what is a better way?
let craftable_units = [r1, r2, r3];

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");

// Lots  

function Lot(name, btn, cooldown, action, loot) {
    this.name = name;
    this.btn = btn;
    this.cooldown = cooldown;
    this.action = action;
    this.loot = loot;
    this.cool_msg = function() {return "You are rummaging through the " + this.name;};
}

salvage_loot = ["plastic_framing", "controller", "power_supply"];
junkyard_loot = ["plastic_framing", "wire_bundle", "sensor"];

let salvage = new Lot("salvage", "salvage_btn", 3000, "loot", salvage_loot);
let junkyard = new Lot("junkyard", "junkyard_btn", 3000, "loot", junkyard_loot);


// Terminal Messages
let messages = []     // current messages
let msg_hist = []     // all messages