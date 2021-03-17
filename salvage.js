
// FUNCTIONS

function start_cooldown(obj) {
    console.log("start_cooldown " + obj.name);

    clr_term();
    set_terminal_message(obj.cool_msg);
    disable_btns();

    // Send arguments into and start second function
    function start_timer() {
        setTimeout(function() {finish_cooldown(obj);},obj.cooldown); 
    }

    start_timer();
}

function finish_cooldown(obj) {
    console.log("finish_cooldown function ");

    clr_term();
    looting(obj);
    enable_btns();
}

function looting(obj) {
    console.log("looting function")

    let u = get_storage("user_inv");
    let item_find = 0;
    let msglist = [];

    set_terminal_message("Your rummaging yields: <br><br>");

    // determine quantity of finds
    let count = dice(2,3);

    // for # of finds
    for (c = 0; c < count; c++) {

        item_find = generate_item(obj);
        console.log(item_find)

        // Change font color for tiers, misc = blue, assembly = warm        
                // Misc Selections
/*                 if (item_find === "misc") {
                    select = get_rand_int(0, misc_list.length - 1);
                    item_find = misc_list[select].name;

                    misc_message = "<br>You found a " + item_find + "!";
                    shortlist.push(misc_message);
                } */
            
            increase_msg = " +1 "  + item_find.item_name + " /h." + item_find.health;
            msglist.push(increase_msg);

            // add new item to user_inv
            u.push(item_find);
    }
    
        set_storage("user_inv", u);
        update_inv();
        set_terminal_message(msglist);
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

            // roll for health
            let h = dice(5,20);

            let id = get_item_no();

            new_item.item_name = name;
            new_item.health = h;
            new_item.id = id;
        } 
    })
    return new_item;  
}

function get_item_no() {
    let n = get_storage("tracking");
    console.log(typeof(n.id_num));
    n.id_num = n.id_num + 1;
    set_storage("tracking", n);
    return n.id_num
}

// accepts array as parameter
function set_terminal_message(msg) {
    let terminal = document.getElementById("terminal");
    let msg_type = typeof(msg);
    if ( msg_type === "string" ) {
        terminal.innerHTML = msg;
    }

    if (msg_type === "object" ) {
        for ( i of msg ) {
            terminal.innerHTML += i + "<br>";
        }
    }}

function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* function add_item(name, health, id) {
    
    let r = get_storage("user_inv");

    let this_obj = {};
    this_obj["id"] = id;
    this_obj["item_name"] = name;
    this_obj["health"] = health;
    r.push(this_obj);

    set_storage("user_inv", r);
} */

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
    console.log("function load_salvage")

    // update inventory if local storage is not empty
    if (localStorage.length != 0) {
        update_inv();

    // set up game if local storage is empty
    } else {
        init_vars();
        // create_initial_inv();
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

// Queued for removal
/* function create_initial_inv() {
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
} */

// Queued for removal
/* function create_item(type) {
    console.log("function create_item()");

    let r = get_storage("user_inv");
    let n = get_storage("tracking");


    let id = n.id_num;
    console.log(id)

    // increment id
    id = id + 1;

    let obj = {};
    obj["item_name"] = type;
    obj["health"] = 5;
    obj["id"] = id;
    r.push(obj);

    set_storage("user_inv", r);
    set_storage("tracking", id);
} */


// EVENT HANDLER

let salvage_parent_btn = document.getElementById('salvage_parent_btn').addEventListener('click', SalvageClick);



function test(thisArray) {
    console.log(typeof(thisArray));
}

let ray = ["this is an array", "a list of things"];
let strings = "this is a string";
test(strings)
test(ray)