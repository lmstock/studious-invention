/*
TO DO:

tidy
8bitads
  remove ads button
player attributes
die rolls

*/





// FUNCTIONS

// When a btn is pressed triggers cooldown to specific lot
// That lot is then sent to get loot function
function start_cooldown(obj) {
    console.log("DEBUG: starting start_cooldown");

    //clear terminal
    clr_term();

    //disables all search btns
    disable_btns();

    //terminal message
    message = obj.search_message
    messages.push(message);
    msg_hist.push(message);
    update_terminal(message)

    // Ananymous function to send arguments into and start second function
    start_timer()
    function start_timer() {
        setTimeout(function() {after_cooldown(obj);},obj.cooldown);
    }
}

function after_cooldown(obj) {
    console.log("DEBUG: start function after_cooldown")
    
    clr_term()

    loot_list = obj.loot;
    for (i of loot_list) {
        console.log("i of loot_list " + i);

        x = get_rand_int(0,10);
        console.log("randint x = " + x);

        increase_item(i, x);
        message = i + " has increased by " + x 

        // adds new msg to list
        messages.push(message);
        msg_hist.push(message);
    }

    update_terminal();

    //re-enables button
    enable_btns();
}

function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function increase_item(item, quantity) {
    console.log("item: " + item);
    console.log("quantity: " + quantity);

    let item_count = document.getElementById(item).innerHTML;
    console.log("item_count: " + item_count);

    item_count = parseInt(item_count, 10);
    total = item_count + quantity;
    document.getElementById(item).innerHTML = total;
}

function disable_btns() {
    console.log("DEBUG: disabling buttons");
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = true;
    }
}

function enable_btns() {
    console.log("DEBUG: re-enabling buttons");
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = false;
    }
}

function update_terminal() {

    // reprints entire msg list to 'terminal'
    messages.forEach(print_activity);
}

function print_activity(i) {
    terminal.innerHTML += i + "<br>";
}

function clr_term() {
    terminal.innerHTML = ""
    messages = []
}

function buttonClick(e) {
    let sel = e.target.id;
    console.log("DEBUG: " + sel + " clicked");

    if (sel === "salvage_btn") {
        start_cooldown(salvage);
    };
    
    if (sel === "junkyard_btn") {
        start_cooldown(junkyard);
    };

}

// EVENT HANDLERS

let parent_btn = document.getElementById('parent_btn').addEventListener('click', buttonClick);


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

function update_table_ids() {
    let rowNum = document.getElementById("inventory_table").rows.length;
    for (let i = 0; i < rowNum; i++) {
        let name = inventory_table.rows[i].cells[1].innerHTML;
        inventory_table.rows[i].cells[2].id = name;
    }
}

let table = document.querySelector("table");
let data = Object.keys(inventory[0]);

generateTable(table, inventory);
generateTableHead(table, data);
update_table_ids();

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



