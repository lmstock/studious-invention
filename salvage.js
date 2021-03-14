
// FUNCTIONS

function start_cooldown(obj) {
    console.log("start_cooldown" + obj.name);

   // refresh terminal to current activity
    clr_term();
    messages.push(obj.cool_msg);
    set_terminal_message();

    //disables all btns
    // will need changed to salvage only btns when this can be automated in game
    disable_btns()

    // Anonymous function to send arguments into and start second function
      start_timer()
    function start_timer() {
        setTimeout(function() {finish_cooldown(obj);},obj.cooldown); 
    }
}

function finish_cooldown(obj) {
    console.log("finish_cooldown function ");

    clr_term();

    if (obj.type === "lot") {
        looting(obj);
    } 

    // may not need these ---
    if (obj.type === "assembly") {
        craft(obj);
    }  else {};    

    if (obj.type === "bot") {
        craft(obj);
    }  else {};  
    // ----------------------

    //re-set button states
    enable_btns()
    // check_craft_buttons()
    
}

function looting(obj) {
    console.log("looting function")

    let u = JSON.parse(localStorage.getItem("user_inv"));
    let misc_list = JSON.parse(localStorage.getItem('misc_list'));
    let assembly_list = JSON.parse(localStorage.getItem('assembly_list'));
    let item_find = 0;

    
    // part of messages
    let shortlist = [];

    // determine quantity of finds
    let count = dice(2,3);

    // for # of finds
    for (c = 0; c < count; c++) {

        item_find = generate_item(obj);


        // Change font color for tiers, misc = blue, assembly = warm        
                // Misc Selections
                if (item_find === "misc") {
                    select = get_rand_int(0, misc_list.length - 1);
                    item_find = misc_list[select].name;

                    misc_message = "<br>You found a " + item_find + "!";
                    shortlist.push(misc_message);
                }

            increase_msg = " +1 "  + item_find.name + " /h." + item_find.health;

            // ADD TO det_inv
            add_item(item_find.name, item_find.health)

            // adds new msg to list 
            shortlist.push(increase_msg);    
    }

        // adds terminal message to list
        shortlist.unshift("Your rummaging yields: <br>");

        // updates messages
        for (i of shortlist) {
            messages.push(i);
        }
    
        update_inv();
        set_terminal_message();
}

function generate_item(lot) {
    console.log("generate_item()");
    let new_item = {};
    let name = "safo";

    // roll for item
    let x = dice(1,100);

    // cycle through loot list and returns item
    Object.entries(lot.loot).forEach(element => {
        let min = element[1][0];
        let max = element[1][1];

        if (x >= min && x <= max) {
            name = element[0];
        }   

    // roll for health
    let h = dice(5,20);

    new_item.name = name;
    new_item.health = h;

    })
    return new_item;
}

function set_terminal_message() {
    for (i of messages) {
        terminal.innerHTML += i + "<br>";
    }
}

function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function add_item(name, health) {
    
    let r = get_storage("user_inv");
    
    // get item number of new item
    itemNo = r.length;

    let this_obj = {};
    this_obj["id"] = itemNo;
    this_obj["item_name"] = name;
    this_obj["health"] = health;
    r.push(this_obj);

    set_storage("user_inv", r);

}

function disable_btns() {
    console.log("disable buttons")
/*     let assemble_btns_list = document.getElementsByClassName("assemble");
    for (i of assemble_btns_list) {
        i.disabled = true;
    } */

    let salvage_btns_list = document.getElementsByClassName("salvage");
    for (i of salvage_btns_list) {
        i.disabled = true;
    }

}

function enable_btns() {
    console.log("enable buttons")
/*     let assemble_btns_list = document.getElementsByClassName("assemble");
    for (i of assemble_btns_list) {
        i.disabled = false;
    } */

    let salvage_btns_list = document.getElementsByClassName("salvage");
    for (i of salvage_btns_list) {
        i.disabled = false;
    }
}

function clr_term() {
    terminal.innerHTML = ""
    messages = []
}

function SalvageClick(e) {
    console.log("SalvageClick");
    let sel = e.target.id;
    let lot = JSON.parse(localStorage.getItem('lots'));

    if (sel === "cityDump_btn") {
        start_cooldown(lot[0]);
    };
    
    if (sel === "junkyard_btn") {
        start_cooldown(lot[1]);
    };
}

function roll(sides) {
    rand = get_rand_int(1, sides);
    return rand;
}

function dice(quantity, sides) {
    //console.log("Rolling " + quantity + "d" + sides);
    let total = 0;
    for (i = 0; i < quantity; i++) {
        x = roll(sides);
        //console.log("roll #" + i + " - " + x);
        total = total + x;
        //console.log("total: " + total)   
    }
    return total;
}

// Clear localStorage & reload page
function reset() {
    
    localStorage.clear();
    location.reload();
    window.alert("Your game has been reset.")
}

// Set Local Storage
function init_local_inventory(x) {
    console.log("init_local_inventory");
    let set_local_inv = []
    for (i of x) {

        let obj = {}
        obj["item_name"] = i;
        obj["qua"] = 0;
        set_local_inv.push(obj);
    };

    localStorage.setItem("count", JSON.stringify(set_local_inv));
}

// Update inventory table with localStorage.local_inv
function update_inv() { 
    console.log("starting update_inv");
    let r = abstract_hist(inv_count());

    // get document ids
    for ( i of r ) {
        let x = i.item_name;
        document.getElementById(x).innerHTML = i.qua;
    }}

// PAGE LOAD
function load_salvage() {
    console.log("page load_salvage")

    if (localStorage.length != 0) {
        update_inv();

    } else {
        init_vars();
        create_initial_inv();
        enable_btns();
        update_inv();
    }
}

// pull item count for update_inv
function inv_count() {
    console.log("inv_count");
    let r = get_storage("user_inv");
    let obj = {};
    let hist = {
        wire_bundle : 0
    };

    for ( i of r ) {
        let x = i.item_name;
        if (x in hist) {
            hist[x] = hist[x] + 1;
        } else {
            hist[x] = 1;
        }}

    return hist;
}

// puts inventory count into array of objects for update_inv
function abstract_hist(inv_count) {
    let hist = inv_count;
    let obj = {};
    console.log("abstract_hist")
    let inv_table = [];
    
    for ( let [key, value] of Object.entries(hist)) {
        obj = make_obj(key, value)
        inv_table.push(obj);
        obj = {};
    };

    function make_obj(k, v) {
        obj["item_name"] = k;
        obj["qua"] = v;
        return obj;
    };

    return inv_table;
    
        
        
        
    
    

    
}

function set_storage(name, list) {
    localStorage.setItem(name, JSON.stringify(list))
}

function get_storage(list) {
    let l = JSON.parse(localStorage.getItem(list));
    return l;
}

function create_initial_inv() {
    console.log("function create_initial_inv");
    let r = [];
    let id = 1;

    function make(type) {
    let obj = {};
    obj["item_name"] = type;
    obj["health"] = 5;
    obj["id"] = id;
    id = id + 1;
    r.push(obj);
    }

    make("wire_bundle");
    make("rechargeable_batteries");
    make("hardware_bits");
    make("hardware_bits")

    set_storage("user_inv", r);
}

function create_item(type) {
    console.log("function create_item()");
    let r = get_storage("user_inv");
    console.log(r)
    let id = r[0];

    // increment id
    r[0] = r[0] + 1;

    let obj = {};
    obj["item_name"] = type;
    obj["health"] = 5;
    obj["id"] = id;
    r.push(obj);

    set_storage("user_inv", r);
}


// EVENT HANDLER

let salvage_parent_btn = document.getElementById('salvage_parent_btn').addEventListener('click', SalvageClick);





