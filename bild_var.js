
function init_vars() {

// VARIABLES

let lots = [];
let user_inv = [];
let assemblies_list = [];
let bots_list = [];
let tracking = {
    id_num : 0,
    id_assembly : 0,
    id_bot : 0
};


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

// LOOT LISTS

let cityDump_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,16],
    rechargeable_batteries: [18,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [ 49,60],
    // misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers: [79,85],
    gear_set: [86, 90],
    CTREMCAT1_board: [90,100]
    //assembly: [98,100]
}

let junkyard_loot = {
    wire_bundle: [1,8],
    electronic_components: [9,16],
    rechargeable_batteries: [18,24],
    hardware_bits: [25,40],
    plastic_framing: [41,48],
    mounting_brackets: [49,60],
    // misc: [57,60],
    claw: [61,69],
    screwdriver: [70,78],
    pliers:	[79,85],
    gear_set: [86,90],
    CTREMCAT1_board: [90,100]
    //assembly: [98,100],
}

var manuals = {

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
    // add new lots to SalvageClick function
let cityDump = new Lot("city dump", "lot", "cityDump_btn", 3000, cityDump_loot);
let junkyard = new Lot("junkyard", "lot", "junkyard_btn", 3000, junkyard_loot);

set_storage("user_inv", user_inv);
set_storage("lots", lots);
set_storage("manuals", manuals);
set_storage("tracking", tracking);
set_storage("assemblies_list");
}