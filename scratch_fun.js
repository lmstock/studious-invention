/*
TO DO:
tidy
write craft robot function, add new table.
research states for debug & etc

8bitads
  remove ads button
player attributes
integrate die rolls
*/

if (debug === 1) {
    document.getElementById("debug_1").innerHTML = "DEBUG ON";
} else {}


// FUNCTIONS
function debugging(function_name) {
    if (debug === 1) {
        console.log("DEBUG ON: " + function_name);
    } else {}
}

// When a btn is pressed triggers cooldown to specific lot
// That lot is then sent to get loot function
function start_cooldown(obj) {
    debugging("start_cooldown");

    //clear terminal
    clr_term();

    //disables all btns
    // will need changed to salvage only btns when this can be done with bots
    disable_btns();

    //terminal message
    set_terminal_message(obj)
    update_terminal(message)

    // Ananymous function to send arguments into and start second function
    start_timer()
    function start_timer() {
        setTimeout(function() {finish_cooldown(obj);},obj.cooldown);
    }
}

function finish_cooldown(obj) {
    debugging("finish_cooldown");
    
    clr_term()

    console.log("crafting should break here")

    loot(obj)

    update_terminal();

    //re-enables button
    enable_btns();
}

function loot(obj) {
    debugging("loot " + obj.name);

    loot_list = obj.loot;
    for (i of loot_list) {
        console.log("i of loot_list = " + i);

        x = get_rand_int(0,10);
        console.log("randint x = " + x);

        increase_item(i, x);
        message = i + " + " + x 

        // adds new msg to list
        messages.push(message);
        msg_hist.push(message);
    }
}

function set_terminal_message(obj) {
    debugging("set_terminal_message");
    message = obj.ind_message;
    messages.push(message);
    msg_hist.push(message);
}

function get_rand_int(min, max) {
    debugging("get_rand_int");
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function increase_item(item, quantity) {
    debugging("increase_item");
    console.log("item: " + item);
    console.log("add quantity: " + quantity);

    let item_count = document.getElementById(item).innerHTML;
    debugging("previous item_count: " + item_count);

    item_count = parseInt(item_count, 10);
    total = item_count + quantity;
    document.getElementById(item).innerHTML = total;
}

function disable_btns() {
    debugging("disable_btns");
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = true;
    }
}

function enable_btns() {
    debugging("enable_btns");
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = false;
    }
}

function update_terminal() {
    debugging("update_terminal");

    // reprints msg list to 'terminal'
    messages.forEach(print_activity);
}

function print_activity(i) {
    debugging("print_activity");
    terminal.innerHTML += i + "<br>";
}

function clr_term() {
    debugging("clr_term");
    terminal.innerHTML = ""
    messages = []
}

function SalvageClick(e) {
    debugging("SalvageClick");
    let sel = e.target.id;
    console.log("debug: " + sel + " clicked");

    if (sel === "salvage_btn") {
        start_cooldown(salvage);
    };
    
    if (sel === "junkyard_btn") {
        start_cooldown(junkyard);
    };
}

function CraftClick(e) {
    debugging("CraftClick");
    let sel = e.target.id;
    console.log("debug: " + sel + "clicked");

    if (sel === "R1_craft_btn") {
        start_cooldown(r_1);
    };
    
    if (sel === "R2_craft_btn") {
        start_cooldown(r_2);
    };

    if (sel === "R3_craft_btn") {
        start_cooldown(r_3);
    };
}


// START => Generates Tables from arrays
function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for ( let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function update_table_ids(table_id_name, table_id) {
    let rowNum = document.getElementById(table_id_name).rows.length;
    for (let i = 0; i < rowNum; i++) {
        let name = table_id.rows[i].cells[1].innerHTML;
        table_id.rows[i].cells[2].id = name;
    }
}

// INVENTORY TABLE

let table_inv = document.getElementById("table_1");
let data_inv = Object.keys(inventory[0]);

generateTable(table_inv, inventory);
generateTableHead(table_inv, data_inv);
update_table_ids("table_1", table_1);

// ASSEMBLIES TABLE

let assemble_inv = document.getElementById("table_2");
let data_assemblies = Object.keys(assemblies[0]);

generateTable(assemble_inv, assemblies);
generateTableHead(assemble_inv, data_assemblies);
update_table_ids("table_2", table_2);

// end: Generates Tables from arrays


/* //=========================================================
 // DICE CODE - KEEP 3 FUNCTIONS TOGETHER; run x = dice(quantity,sides)
function get_rand_int(min, max) {
    x = Math.floor(Math.random() * (max - min + 1)) + min; 
    return x;
}

function roll(sides) {
    rand = get_rand_int(1, sides);
    return rand;
}

function dice(quantity, sides) {
    console.log("Rolling " + quantity + "d" + sides);
    let total = 0;
    for (i = 0; i < quantity; i++) {
        x = roll(sides);
        console.log("roll #" + i + " - " + x);
        total = total + x;
        console.log("total: " + total)   
    }
    return total;
}

x = dice(3,100);
console.log(x)
//=============================================================== */



