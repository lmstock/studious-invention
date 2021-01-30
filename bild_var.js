// VARIABLES

    // accept info from class constructors for building inventory table
let to_inventory = [];
let inventory = [];


    // Lots, Raws, and Bots are all Items
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
        to_inventory.push(this.name);
        }
        
    }

// This list leads the check_craft_buttons
let craftable_units = [];

class Bot extends Item {
    constructor(name, type, cooldown, btn, ingredients, inv_tbl) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.inv_tbl = inv_tbl;
        this.cool_msg = function() {return "You are assembling an " + this.name;};
        to_inventory.push(this.name);
        craftable_units.push(this);
    }
}


// Lots
    // loot lists
salvage_loot = ["plastic_framing", "controller", "power_supply"];
junkyard_loot = ["plastic_framing", "wire_bundle", "sensor"];

    // define lots
let salvage = new Lot("salvage", "lot", "salvage_btn", 3000, salvage_loot);
let junkyard = new Lot("junkyard", "lot", "junkyard_btn", 3000, junkyard_loot);


// Raws
let plastic_framing = new Raw("plastic_framing", "raw", "plastic_framing");
let wire_bundle = new Raw("wire_bundle", "raw", "wire_bundle");
let sensor = new Raw("sensor", "raw", "sensor");
let controller = new Raw("controller", "raw", "controller");
let power_supply = new Raw("power_supply", "raw", "power_supply");


// Bots
    // ingredient lists
let r1_ingredients = { plastic_framing: 1, wire_bundle: 1, sensor: 1 };
let r2_ingredients = { power_supply: 1, wire_bundle: 1, sensor: 1 };
let r3_ingredients = { controller: 1, wire_bundle: 1, sensor: 1 };

    // define bots
let r1 = new Bot("r1", "bot", 3000, document.getElementById("r1_craft_btn"), r1_ingredients, "r1");
let r2 = new Bot("r2", "bot", 3000, document.getElementById("r2_craft_btn"), r2_ingredients, "r2");
let r3 = new Bot("r3", "bot", 3000, document.getElementById("r3_craft_btn"), r3_ingredients, "r3");


// HTML Elements
let terminal = document.getElementById("terminal");
let parent = document.querySelectorAll("button");


// Terminal Messages
let messages = []     // current messages


// build basic inventory table
for (i of to_inventory) {
    let this_obj = {}
    this_obj["item"] = i;
    this_obj["qua"] = 0;
    inventory.push(this_obj);
}

