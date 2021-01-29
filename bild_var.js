// VARIABLES

let inventory = [
    {item: "plastic_framing", qua: 1 },
    {item: "wire_bundle", qua: 3 },
    {item: "sensor", qua: 4 },
    {item: "controller", qua: 5 },
    {item: "power_supply", qua: 3 },
];

let assemblies = [
    {item: "r1" , qua: 0 },
    {item: "r2" , qua: 0 },
    {item: "r3" , qua: 0 },
    {item: "r4" , qua: 0 },
    {item: "r5" , qua: 0 },
]

let testArray = [];

class Item {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }
}

class Lot extends Item {
    constructor(name, type, btn, cooldown, loot) {
        super(name, type);
        this.btn = btn;
        this.cooldown = cooldown;
        this.loot = loot;
        this.cool_msg = function() {return "You are rummaging through the " + this.name + "...<br>";};
      }   
    }


class Raw extends Item {
    constructor(name, type, inv_tbl) {
        super(name, type);
        this.inv_tbl = inv_tbl;
        testArray.push(this.name);
    }
}


class Bot extends Item {
    constructor(name, type, cooldown, btn, ingredients, inv_tbl) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.inv_tbl = inv_tbl;
        this.cool_msg = function() {return "You are assembling an " + this.name;};
        testArray.push(this.name);
    }
}


// Lots
    // loot lists
salvage_loot = ["plastic_framing", "controller", "power_supply"];
junkyard_loot = ["plastic_framing", "wire_bundle", "sensor"];

let salvage = new Lot("salvage", "lot", "salvage_btn", 3000, salvage_loot);
let junkyard = new Lot("junkyard", "lot", "junkyard_btn", 3000, junkyard_loot);


// Raws
let plastic_framing = new Raw("plastic framing", "raw", "plastic_framing");
let wire_bundle = new Raw("wire bundle", "raw", "wire_bundle");
let sensor = new Raw("sensor", "raw", "sensor");
let controller = new Raw("controller", "raw", "controller");
let power_supply = new Raw("power supply", "raw", "power_supply");


// Bots
    // ingredient lists
let r1_ingredients = { plastic_framing: 1, wire_bundle: 1, sensor: 1 };
let r2_ingredients = { power_supply: 1, wire_bundle: 1, sensor: 1 };
let r3_ingredients = { controller: 1, wire_bundle: 1, sensor: 1 };

let r1 = new Bot("r1", "bot", 3000, document.getElementById("r1_craft_btn"), r1_ingredients, "r1");
let r2 = new Bot("r2", "bot", 3000, document.getElementById("r2_craft_btn"), r2_ingredients, "r2");
let r3 = new Bot("r3", "bot", 3000, document.getElementById("r3_craft_btn"), r3_ingredients, "r3");




// This list leads the check_craft_buttons, what is a better way?
let craftable_units = [r1, r2, r3];

// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");

// Terminal Messages
let messages = []     // current messages
let msg_hist = []     // all messages
