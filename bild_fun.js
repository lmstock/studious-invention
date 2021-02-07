
// FUNCTIONS



// When a btn is pressed triggers cooldown to specific lot
// That lot is then sent to get loot function
function start_cooldown(obj) {
    console.log(obj);

    // refresh terminal to current activity
    clr_term();
    messages.push(obj.cool_msg());
    set_terminal_message();

    //disables all btns
    // will need changed to salvage only btns when this can be automated in game
    disable_btns();

    // Anonymous function to send arguments into and start second function
    start_timer()
    function start_timer() {
        setTimeout(function() {finish_cooldown(obj);},obj.cooldown);
    }
}

function finish_cooldown(obj) {
    console.log("start of fin cool function ");

    clr_term();

    if (obj.type === "lot") {
        looting(obj);
    } 

    if (obj.type === "assembly") {
        craft(obj);
    }  else {};    

    if (obj.type === "bot") {
        craft(obj);
    }  else {};  

    //re-set button states
    enable_btns();
    check_craft_buttons();
}

function looting(obj) {

    // part of messages
    let shortlist = [];

    // dice(2,3)
    let count = dice(6,3);
    console.log(" count, # of finds = " + count);

    for (c = 0; c < count; c++) {

        let x = dice(1,100);
        // let x = 99     // intentional pulls for debug
        console.log(x);
        
        Object.entries(obj.loot).forEach(element => {
            let min = element[1][0];
            let max = element[1][1];

            if (x >= min && x <= max) {
                let item_find = element[0];
                console.log("selection: " + item_find);


        // Change font color for tiers, misc = blue, assembly = warm        
                // Misc Selections
                if (item_find === "misc") {
                    select = get_rand_int(0, misc_list.length - 1);
                    item_find = misc_list[select].name;
                    console.log("item_find: " + item_find);
                    misc_message = "<br>You found a " + item_find + "!";
                    shortlist.push(misc_message);
                }

                // Assembly Selections
                if (item_find === "assembly") {
                    select = get_rand_int(0, assembly_list.length - 1);
                    item_find = assembly_list[select].name;
                    console.log("item_find: " + item_find);
                    assembly_message = "<br>You found a subassembly!";
                    shortlist.push(assembly_message);
                }

            // ADD TO INVENTORY
            increase_item(item_find, 1);
            increase_msg = " +1 "  + item_find;

            // adds new msg to list 
            shortlist.push(increase_msg);
            }
        });
    } 

        // adds terminal message to list
        shortlist.unshift("Your rummaging yields: <br>");

        // updates messages
        for (i of shortlist) {
            messages.push(i);
        }
    
        set_terminal_message();
}

function craft(obj) {
    console.log("start craft function " + obj)

    Object.keys(obj.ingredients).forEach(element => {

        // get quantity from inv and assign to variable
        let inv_qua = document.getElementById(element).innerHTML;
        inv_qua = parseInt(inv_qua, 10);
        console.log(inv_qua);

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

    if (sel === "cityDump_btn") {
        start_cooldown(cityDump);
    };
    
    if (sel === "junkyard_btn") {
        start_cooldown(junkyard);
    };
}

// THERE MUST BE A BETTER WAY
function CraftClick(e) {
    let sel = e.target.id;

    if (sel === "pwr_sub") {
        start_cooldown(power_subsystem);
    };
    
    if (sel === "ctr_ass") {
        start_cooldown(controller_assembly);
    };

    if (sel === "sm_chass") {
        start_cooldown(small_chassis);
    };

    if (sel === "arm_ass") {
        start_cooldown(arm_assembly);
    }; 

    if (sel === "salv_assembly_btn") {
        start_cooldown(salvage_bot);
    }; 

    if (sel === "bild_assembly_btn") {
        start_cooldown(bild_bot);
    }; 

    if (sel === "explorer_assembly_btn") {
        start_cooldown(explorer_bot);
    }; 
}

// START => Generates Tables from objects
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


 //=========================================================
 // DICE CODE // x = dice(quantity,sides) //


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

//===============================================================



