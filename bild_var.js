
function init_vars() {



// VARIABLES

let lots = [];
let user_inv = [];
let misc = [];
let assemblies_list = [];
let bots_list = [];
let tracking = {
    id_num : 0,
    id_assembly : 0,
    id_bot : 0
};

class Item {
    constructor(name, type, misc_loot) {
        this.name = name;
        this.type = type;
        this.misc_loot = misc_loot;
    }
}

class Lot extends Item {
    constructor(name, type, misc_loot, btn, cooldown, loot) {
        super(name, type, misc_loot);
        this.btn = btn;
        this.cooldown = cooldown;
        this.loot = loot;
        this.cool_msg = "You are rummaging through the " + this.name + "...<br>";
        lots.push(this);
      }   
    }

// LOOT LISTS

let cityDump_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,17],
    rechargeable_batteries: [18,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [ 49,56],
    misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers: [79,85],
    gear_set: [86, 90],
    CTREMCAT1_board: [91,97],
    assembly: [98,150]
}

let junkyard_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,16],
    rechargeable_batteries: [17,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [49,56],
    misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers:	[79,85],
    gear_set: [86,90],
    CTREMCAT1_board: [91,97],
    assembly: [98,150],
}

let misc_loot = {
    fish_bones: [1,10],
    old_shoe: [11,20],
    broken_glasses: [21,30],
    beer_bottle: [31,40],
    worn_book: [41,50],
    rags: [51,60],
    wet_newspaper: [61,70],
    couple_of_teeth: [71,80],
    monster_fur: [81,90],
    brick: [91,100] 
};


let manuals = {

    power_subsystem : 
        {
            "wire_bundle" : 1,
            "electronic_components" : 1,
            "rechargeable_batteries" : 1
        },
    
    controller_assembly : 
        {
            "wire_bundle" : 1,
            "CTREMCAT1_board" : 1
        },
        

    small_chassis : 
        {
            "plastic_framing" : 1,
            "hardware_bits" : 1,
            "mounting_brackets" : 1
        },

    arm_assembly : 
        {
            "wire_bundle" : 1,
            "plastic_framing" : 1,
            "hardware_bits" : 1,
            "electronic_components" : 1,
            "gear_set" : 1
        }
};

// define lots
    // dont forget to add new lots to SalvageClick function
let cityDump = new Lot("city dump", "lot", misc_loot, "cityDump_btn", 3000, cityDump_loot);
let junkyard = new Lot("junkyard", "lot", misc_loot, "junkyard_btn", 3000, junkyard_loot);

set_storage("user_inv", user_inv);
set_storage("lots", lots);
set_storage("misc", misc);
set_storage("manuals", manuals);
set_storage("tracking", tracking);
set_storage("assemblies_list",assemblies_list);
}