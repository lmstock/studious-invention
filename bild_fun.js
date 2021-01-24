/*
TO DO:
tidy

8bitads
  remove ads button
player attributes
integrate die rolls
*/




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

    // refresh terminal to current activity
    clr_term();
    msg = obj.cool_msg;
    set_terminal_message(msg);

    //disables all btns
    // will need changed to salvage only btns when this can be automated in game
    disable_btns();

    // Ananymous function to send arguments into and start second function
    start_timer()
    function start_timer() {
        setTimeout(function() {finish_cooldown(obj);},obj.cooldown);
    }
}

function finish_cooldown(obj) {
    debugging("finish_cooldown");
    
    clr_term()

    if (obj.action === "loot") {
        loot(obj);
    } 

    if (obj.action === "craft") {
        craft(obj);
    }  else {};    


    //re-set button states
    enable_btns();
    check_craft_buttons();
}

function loot(obj) {
    debugging("loot " + obj.name);
    let shortlist = [];

    loot_list = obj.loot;
    for (i of loot_list) {

        x = get_rand_int(0,10);
        console.log("randint x = " + x);

        increase_item(i, x);
        increase_msg = i + " + " + x 

        // adds new msg to list 
        shortlist.push(increase_msg);
        msg_hist.push(increase_msg);
    }

    // update terminal with salvaged items
    // *note that sending an array to function set_terminal_message prints extra
    // so we just handle the list in this loot function
    // as well as the terminal message
    shortlist.unshift("Your rummaging has yielded: ");
    for (i of shortlist) {
        terminal.innerHTML += i + "<br>";
}}

function craft(obj) {
    debugging("craft");
    console.log("crafting obj: " + obj.name);
    console.log(obj.ingredients);

    // set terminal message for wait period
    let msg = "You are assembling an " + obj.name + "...";
    set_terminal_message(msg);

    Object.keys(obj.ingredients).forEach(element => {
        console.log(element);

        // get quantity from inv and assign to variable
        let inv_qua = document.getElementById(element).innerHTML;
        inv_qua = parseInt(inv_qua, 10);

        // assign required quantity, set to number
        let req = obj.ingredients[element];
        req = parseInt(req, 10);
        
        // calculate total and update inventory table
        let total = inv_qua - req;
        document.getElementById(element).innerHTML = total;

    })

    // add assembly to assemblies table
    let assembly_amt = document.getElementById(obj.name).innerHTML;
    assembly_amt = parseInt(assembly_amt, 10);
    total = assembly_amt + 1;
    document.getElementById(obj.name).innerHTML = total;
    console.log("total " + total);

    // update closing terminal message
    msg = "you have assembled an " + obj.name;
    set_terminal_message(msg);

    
}

function set_terminal_message(msg) {
    debugging("set_terminal_message");
    clr_term();
    messages.push(msg);
    msg_hist.push(msg);
    for (i of messages) {
        terminal.innerHTML += i + "<br>";
    }
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

function clr_term() {
    debugging("clr_term");
    terminal.innerHTML = ""
    messages = []
}

function SalvageClick(e) {
    debugging("SalvageClick");
    let sel = e.target.id;

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

    if (sel === "r1_craft_btn") {
        start_cooldown(r1);
        console.log("test");
    };
    
    if (sel === "r2_craft_btn") {
        start_cooldown(r2);
    };

    if (sel === "r3_craft_btn") {
        start_cooldown(r3);
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



