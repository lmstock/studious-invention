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
    constructor(name, type) {
        super(name, type);
        to_inventory.push(this.name);
        }
    }

    // This list leads the check_craft_buttons
let craftable_units = [];

class Assembly extends Item {
    constructor(name, type, cooldown, btn, ingredients) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.cool_msg = function() {return "You are assembling an " + this.name;};
        to_inventory.push(this.name);
        craftable_units.push(this);
    }
}

class Bot extends Item {
    constructor(name, type, cooldown, btn, ingredients) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.cool_msg = function() {return "You are assembling an " + this.name;};
        to_inventory.push(this.name);
        craftable_units.push(this);
    }
}

// define lots
    // add new lots to SalvageClick function
let cityDump = new Lot("city dump", "lot", "cityDump_btn", 3000, cityDump_loot);
let junkyard = new Lot("junkyard", "lot", "junkyard_btn", 3000, junkyard_loot);


// Raws
let wire_bundle = new Raw("wire_bundle", "raw");
let electronic_components = new Raw("electronic_components", "raw");
let rechargeable_batteries = new Raw("rechargeable_batteries", "raw");
let hardware_bits = new Raw("hardware_bits", "raw");
let plastic_framing = new Raw("plastic_framing", "raw");
let mounting_brackets = new Raw("mounting_brackets", "raw");
let misc = new Raw("misc", "raw");
let claw = new Raw("claw", "raw");
let screwdriver = new Raw("screwdriver", "raw");
let pliers = new Raw("pliers", "raw");
let gear_set = new Raw("gear_set", "raw");
let CTREMCAT1_board = new Raw("CTREMCAT1_board", "raw");
let assembly = new Raw("assembly", "raw");

// Assemblies
    // ingredients lists
let power_subsytem_ingredients = {wire_bundle: 1, electronic_components: 1, rechargeable_batteries: 1}
let controller_assembly_ingredients = {wire_bundle: 1, CTREMCAT1_board: 1};
let small_chassis_ingredients = {plastic_framing: 1, hardware_bits: 1, mounting_brackets: 1};
let arm_assembly_ingredients = {wire_bundle: 1, plastic_framing: 1, hardware_bits: 1, electronic_components: 1, gear_set: 1}

let power_subsytem = new Assembly("power_subsystem", "assembly", 3000, document.getElementById("pwr_sub"), power_subsytem_ingredients);
let controller_assembly = new Assembly("controller_assembly", "assembly", 3000, document.getElementById("ctr_ass"), controller_assembly_ingredients);
let small_chassis = new Assembly("small_chassis", "assembly", 3000, document.getElementById("sm_chass"), small_chassis_ingredients);
let arm_assembly = new Assembly("arm_assembly", "assembly", 3000, document.getElementById("arm_ass"), arm_assembly_ingredients);


// Bots
    // ingredient lists
let r1_ingredients = { plastic_framing: 1, wire_bundle: 1, claw: 1 };
let r2_ingredients = { pliers: 1, wire_bundle: 1, claw: 1 };
let r3_ingredients = { mounting_brackets: 1, wire_bundle: 1, claw: 1 };

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
function build_inventory_table() {
    for (i of to_inventory) {
        let this_obj = {}
        this_obj["item"] = i;
        this_obj["qua"] = 4;
        inventory.push(this_obj);
    }}

build_inventory_table()
