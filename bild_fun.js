
// FUNCTIONS



// When a btn is pressed triggers cooldown to specific lot
// That lot is then sent to get loot function
function start_cooldown(obj) {

    // refresh terminal to current activity
    clr_term();
    messages.push(obj.cool_msg());
    set_terminal_message();

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

    clr_term();

    if (obj.type === "lot") {
        loot(obj);
    } 

    if (obj.type === "bot") {
        craft(obj);
    }  else {};    

    //re-set button states
    enable_btns();
    check_craft_buttons();
}

function loot(obj) {

    let shortlist = [];

    loot_list = obj.loot;
    for (i of loot_list) {

        x = get_rand_int(0,10);


        increase_item(i, x);
        increase_msg = i + " +" + x 

        // adds new msg to list 
        shortlist.push(increase_msg);
    }

    // adds terminal message to list
    shortlist.unshift("Your rummaging has yielded: <br>");

    // updates messages
    for (i of shortlist) {
        messages.push(i);
    }

    set_terminal_message();
}

function craft(obj) {

    Object.keys(obj.ingredients).forEach(element => {

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

    // refresh terminal to current activity
    clr_term();
    messages.push("you have assembled an " + obj.name);
    set_terminal_message();
    
}

function set_terminal_message() {
    for (i of messages) {
        terminal.innerHTML += i + "<br>";
    }
}

function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function increase_item(item, quantity) {

    let item_count = document.getElementById(item).innerHTML;
    item_count = parseInt(item_count, 10);

    total = item_count + quantity;
    document.getElementById(item).innerHTML = total;
}

function disable_btns() {
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = true;
    }
}

function enable_btns() {
    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = false;
    }
}

function clr_term() {
    terminal.innerHTML = ""
    messages = []
}

function SalvageClick(e) {
    let sel = e.target.id;

    if (sel === "salvage_btn") {
        start_cooldown(salvage);
    };
    
    if (sel === "junkyard_btn") {
        start_cooldown(junkyard);
    };
}

function CraftClick(e) {
    let sel = e.target.id;

    if (sel === "r1_craft_btn") {
        start_cooldown(r1);
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
        let name = table_id.rows[i].cells[0].innerHTML;
        table_id.rows[i].cells[1].id = name;
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



