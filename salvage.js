
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

function generate_item(item_type) {
    console.log("generate_item()");

    let new_item = {};
    let name = item_type;
    console.log("     item name is " + name)

    // roll for health
    let h = dice(5,20);

    let id = get_item_no();

    new_item.item_name = name;
    new_item.health = h;
    new_item.id = id;

    return new_item;  
}

function looting(obj) {
    console.log("looting function")

    let item_find = 0;
    let msglist = [];

    set_terminal_message("Your rummaging yields: <br><br>");

    // determine quantity of finds
    let count = dice(2,3);

    // for # of finds
    for (c = 0; c < count; c++) {

        item_find = (item_roll(obj));
            
            increase_msg = " +1 "  + item_find.item_name + " /h." + item_find.health;
            msglist.push(increase_msg);
    }
    
        update_all_tables();
        set_terminal_message(msglist);
}

function item_roll(lot) {
    console.log("function item_roll");
    let item_find = 0;

    // roll for item
    let x = dice(1,100);
    console.log("        loot roll = " + x)
    let part = loot_list_check(x, lot.loot)

    if ( part != "misc" && part != "assembly" ) {
        item_find = generate_item(part);
        let u = get_storage("user_inv");
        u.push(item_find);
        set_storage("user_inv", u);
        return item_find;
    }
    
    if ( part === "misc" ) {
        x = dice(1,100);
        part = loot_list_check(x, lot.misc_loot);
        item_find = generate_item(part);
        let m = get_storage("misc");
        m.push(item_find);
        set_storage("misc", m);
    }

    if ( part === "assembly" ) {
        item_find = random_assembly(lot);
        let a = get_storage("assemblies_list");
        a.push(item_find);
        set_storage("assemblies_list", a);
    }

    return item_find;
}

function loot_list_check(x, list) {
    console.log("loot_list_check");
    let part = "";

    // cycle through loot list and returns item
    Object.entries(list).forEach(element => {
        let min = element[1][0];
        let max = element[1][1];

        if (x >= min && x <= max) {
            part = element[0];  
            return part;  //new
    }
    })
    console.log(part)
    return part
}

function assembly_item_roll(lot) {
    console.log("assembly_item_roll");
    let item_find = 0;

    // roll for item
    let x = dice(1,100);
    console.log("        loot roll = " + x)
    let part = loot_list_check(x, lot.loot)

    if ( part != "misc" && part != "assembly" ) {
        item_find = generate_item(part);
        return item_find;
    }
    
    if ( part === "misc" ) {
        x = dice(1,100);
        part = loot_list_check(x, lot.misc_loot);
        item_find = generate_item(part);
        return item_find;
    }

    if ( part === "assembly" ) {
        item_find = random_assembly(lot);
        return item_find;
    }

    return item_find;
}

function random_assembly(lot) {
    console.log("random_assembly")
    let count = dice(2,4);
    console.log("        number of items in assembly = " + count)

    let ing_list = [];
    for ( j=0; j<count; j++) {
        console.log("        item count for assembly:  " + i)

        let x = assembly_item_roll(lot);
        console.log("        Assembly item roll: ")
        console.log(x)

        ing_list.push(x);
        console.log("        ing_list: ")
        console.log(ing_list)
        };

    let asmbly_id = tracking_no();

    console.log("        full ing_list: ")
    console.log(ing_list)
    let new_assmbly = new_assembly("unknown_assembly", asmbly_id, ing_list);
    return new_assmbly
}

// Get current item_number from tracking
function get_item_no() {
    let n = get_storage("tracking");
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

// Update inventory table with localStorage
function update_inv(data) { 
    console.log("starting update_inv");
    let r = inventory_table_prep(counter(data));


    // get document ids
    for ( i of r ) {
        let x = i.item_name;
        document.getElementById(x).innerHTML = i.qua;
    }}

// Counter
function counter(list_to_count) {
    console.log("inv_count");
    let r = get_storage(list_to_count);
    let hist = {};

    for ( i of r ) {
        let x = i.item_name;
        if (x in hist) {
            hist[x] = hist[x] + 1;
        } else {
            hist[x] = 1;
        }}

    return hist;
}

// Structures inventory count data into array of objects suitable for Inventory table
function inventory_table_prep(inv_count) {
    console.log("inventory_table_prep")
    let hist = inv_count;
    let obj = {};
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

function update_all_tables() {
    update_inv("user_inv");
    update_inv("assemblies_list");
    update_inv("misc")
}

// PAGE LOAD
function load_salvage() {
    console.log("function load_salvage")

    // update inventory if local storage is not empty
    if (localStorage.length != 0) {
        update_all_tables()

    // set up game if local storage is empty
    } else {
        init_vars();
        enable_btns();
        update_inv("user_inv");
    }
}

// EVENT HANDLER

let salvage_parent_btn = document.getElementById('salvage_parent_btn').addEventListener('click', SalvageClick);

