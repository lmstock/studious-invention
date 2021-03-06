
function init_vars() {

// VARIABLES
let inventory = [];
let bots_list = [];
let misc_list = [];
let assembly_list = [];
let messages = [];
let lots = [];
let user_inv = [];

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
        this.cool_msg = "You are rummaging through the " + this.name + "...<br>";
        lots.push(this);
      }   
    }

class Raw extends Item {
    constructor(name, type) {
        super(name, type);
        inventory.push(this.name);
        }
    }

class Misc extends Item {
    constructor(name, type) {
        super(name, type);
        misc_list.push(this);
        inventory.push(this.name);
    }
}

class Assembly extends Item {
    constructor(name, type, cooldown, btn, ingredients) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.cool_msg = "You are assembling an " + this.name;
        this.parts = {};  //
        this.health = 100 // calculate from parts health: health = total_of_parts_health / #_of_parts - METHOD
        assembly_list.push(this);
        inventory.push(this.name);
    }
}

class Bot extends Item {
    constructor(name, type, cooldown, btn, ingredients) {
        super(name, type);
        this.cooldown = cooldown;
        this.btn = btn;
        this.ingredients = ingredients;
        this.cool_msg = "You are assembling an " + this.name;
        bots_list.push(this);
        inventory.push(this.name);
    }
}

// LOOT LISTS

let cityDump_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,16],
    rechargeable_batteries: [18,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [ 49,56],
    misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers: [79,85],
    gear_set: [86, 90],
    CTREMCAT1_board: [90,97],
    assembly: [98,100]
}

let junkyard_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,16],
    rechargeable_batteries: [18,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [49,56],
    misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers:	[79,85],
    gear_set: [86,90],
    CTREMCAT1_board: [90,97],
    assembly: [98,100],
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

// Misc
let fishbones = new Misc("fishbones", "misc");
let shoe = new Misc("shoe", "misc");
let broken_glasses = new Misc("broken_glasses", "misc");
let beer_bottle = new Misc("beer_bottle", "misc");

// Assemblies
    // ingredients lists
let power_subsystem_ingredients = {wire_bundle: 1, electronic_components: 1, rechargeable_batteries: 1}
let controller_assembly_ingredients = {wire_bundle: 1, CTREMCAT1_board: 1};
let small_chassis_ingredients = {plastic_framing: 1, hardware_bits: 1, mounting_brackets: 1};
let arm_assembly_ingredients = {wire_bundle: 1, plastic_framing: 1, hardware_bits: 1, electronic_components: 1, gear_set: 1}

let power_subsystem = new Assembly("power_subsystem", "assembly", 3000, "pwr_sub_btn", power_subsystem_ingredients);
let controller_assembly = new Assembly("controller_assembly", "assembly", 3000, "ctr_ass_btn", controller_assembly_ingredients);
let small_chassis = new Assembly("small_chassis", "assembly", 3000, "sm_chass_btn", small_chassis_ingredients);
let arm_assembly = new Assembly("arm_assembly", "assembly", 3000, "arm_ass_btn", arm_assembly_ingredients);


// Bots
    // ingredient lists
let salv_ingredients = { power_subsystem: 1, controller_assembly: 1, small_chassis: 1, claw: 1 };
let bild_ingredients = { power_subsystem: 1, controller_assembly: 2, small_chassis: 1, pliers: 1, screwdriver: 1};

// not available until locomotive parts or manual are found
let explorer_ingredients = { power_subsystem: 1, controller_assembly: 2, small_chassis: 1, pliers: 1, screwdriver: 1};

    // define bots
let salvage_bot = new Bot("salvage_bot", "bot", 3000, "salv_assembly_btn", salv_ingredients);
let bild_bot = new Bot("bild_bot", "bot", 3000, "bild_assembly_btn", bild_ingredients);
let explorer_bot = new Bot("explorer_bot", "bot", 3000, "explorer_assembly_btn", explorer_ingredients);


init_local_inventory(inventory)


localStorage.setItem("bots_list", JSON.stringify(bots_list));
localStorage.setItem("misc_list", JSON.stringify(misc_list));
localStorage.setItem("assembly_list", JSON.stringify(assembly_list));
localStorage.setItem("messages", JSON.stringify(messages));
localStorage.setItem("lots", JSON.stringify(lots));
localStorage.setItem("user_inv", JSON.stringify(user_inv));
}



// HTML Elements
let terminal = document.getElementById("terminal");
