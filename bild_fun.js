
// FUNCTIONS



// When a btn is pressed triggers cooldown to specific lot
// That lot is then sent to get loot function
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

    if (obj.type === "assembly") {
        craft(obj);
    }  else {};    

    if (obj.type === "bot") {
        craft(obj);
    }  else {};  

    //re-set button states
    enable_btns()
    check_craft_buttons()
    
}

function looting(obj) {
    console.log("looting function")

    let misc_list = JSON.parse(localStorage.getItem('misc_list'));
    let assembly_list = JSON.parse(localStorage.getItem('assembly_list'));
    

    // part of messages
    let shortlist = [];

    // dice(2,3)
    let count = dice(6,3);

    for (c = 0; c < count; c++) {

        let x = dice(1,100);
        // let x = 99     // intentional pulls for debug
        
        Object.entries(obj.loot).forEach(element => {
            let min = element[1][0];
            let max = element[1][1];

            if (x >= min && x <= max) {
                let item_find = element[0];

        // Change font color for tiers, misc = blue, assembly = warm        
                // Misc Selections
                if (item_find === "misc") {
                    select = get_rand_int(0, misc_list.length - 1);
                    item_find = misc_list[select].name;

                    misc_message = "<br>You found a " + item_find + "!";
                    shortlist.push(misc_message);
                }

                // Assembly Selections
                if (item_find === "assembly") {
                    select = get_rand_int(0, assembly_list.length - 1);
                    item_find = assembly_list[select].name;

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

        // remove from storage
        localStorage.setItem(element, total);

    })

    // add assembly to table
    let assembly_amt = document.getElementById(obj.name).innerHTML;
    assembly_amt = parseInt(assembly_amt, 10);
    total = assembly_amt + 1;
    document.getElementById(obj.name).innerHTML = total;

    // add to storage
    localStorage.setItem(obj.name, total);

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

    let this_item = JSON.parse(localStorage.getItem('local_inv'));

    for (i of Object.values(this_item)) {
        if (item === i.item) {
            //i.qua = quantity;
            i.qua = i.qua + quantity;
        }
    localStorage.setItem("local_inv", JSON.stringify(this_item))
    }
 
    update_inv()

/*     let item_count = document.getElementById(item).innerHTML;
    item_count = parseInt(item_count, 10);

    total = item_count + quantity;
    document.getElementById(item).innerHTML = total;

    // ALSO set storage
    localStorage.setItem(item, total) */
}

function disable_btns() {
    console.log("disable buttons")
    let assemble_btns_list = document.getElementsByClassName("assemble");
    for (i of assemble_btns_list) {
        i.disabled = true;
    }

    let salvage_btns_list = document.getElementsByClassName("salvage");
    for (i of salvage_btns_list) {
        i.disabled = true;
    }

}

function enable_btns() {
    console.log("enable buttons")
    let assemble_btns_list = document.getElementsByClassName("assemble");
    for (i of assemble_btns_list) {
        i.disabled = false;
    }

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

// THERE MUST BE A BETTER WAY
function AssembleClick(e) {
    let sel = e.target.id;
    let assembly = JSON.parse(localStorage.getItem('assembly_list'));
    let bot = JSON.parse(localStorage.getItem('bots_list'));

    if (sel === "pwr_sub_btn") {
        start_cooldown(assembly[0]);
    };
    
    if (sel === "ctr_ass_btn") {
        start_cooldown(assembly[1]);
    };

    if (sel === "sm_chass_btn") {
        start_cooldown(assembly[2]);
    };

    if (sel === "arm_ass_btn") {
        start_cooldown(assembly[3]);
    }; 

    if (sel === "salv_assembly_btn") {
        start_cooldown(bot[0]);
    }; 

    if (sel === "bild_assembly_btn") {
        start_cooldown(bot[1]);
    }; 

    if (sel === "explorer_assembly_btn") {
        start_cooldown(bot[2]);
    }; 
}

// Generates Table Headers - 
function generateTableHead() {

    let table_inv = document.getElementById("table_1");
    let data_inv = ["Item", "Quantity"];

    let thead = table_inv.createTHead();
    let row = thead.insertRow();
    for (let key of data_inv) {
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
    console.log("update_table_ids");
    let rowNum = document.getElementById("table_1").rows.length;
    for (let i = 0; i < rowNum; i++) {
        let name = table_1.rows[i].cells[0].innerHTML;
        table_1.rows[i].cells[1].id = name;
    }
}

// button states - 1. any way to do it, 2. right way to do it
function check_craft_buttons() {
    console.log("start check_craft_buttons")

    let assemblies = JSON.parse(localStorage.getItem('assembly_list'));
    let bots = JSON.parse(localStorage.getItem('bots_list'));
    let craftable_units = assemblies.concat(bots);
    
    for (x of craftable_units) {
        

        // sets btn_state to 1, any missing ingredient will set to zero
        let btn_state = 1;

        Object.keys(x.ingredients).forEach(element => {

            // assigns quantity from inventory to variable and converts to number
            let qua_in_inv = document.getElementById(element).innerHTML;

            qua_in_inv = parseInt(qua_in_inv, 10);
            
            // assigns quantity of ingredient required to a variable
            let elem_req = x.ingredients[element];
            
            // check inventory vs requirements and update btn_state
            if (qua_in_inv >= elem_req) {
                // do nothing

            } else {
                btn_state = 0
            }

            // enable/disable craft button based on state
            if (btn_state === 0) {
                document.getElementById(x.btn).disabled = true;
                
            } else {
                document.getElementById(x.btn).disabled = false;
            }
        });
    } 
} 

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

// Build full inventory table from localStorage.local_inv first time only
function init_inventory_table() {
    let set_inventory = [];

    let storage = JSON.parse(localStorage.getItem('local_inv'));

    for (i of Object.values(storage)) {

        let this_obj = {}
        this_obj["item"] = i.item;
        this_obj["qua"] = i.qua;
        set_inventory.push(this_obj);
    }

        // INVENTORY TABLE
    let table_inv = document.getElementById("table_1");
    let data_inv = ["Item", "Quantity"];

    generateTable(table_inv, set_inventory);
    generateTableHead();
    update_table_ids();    
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
        obj["item"] = i;
        obj["qua"] = 0;
        set_local_inv.push(obj);
    }

    localStorage.setItem("local_inv", JSON.stringify(set_local_inv))
}

 // Update inventory table with localStorage.local_inv
function update_inv() {
    console.log("starting update_inv");

    let x = !!document.getElementById("Item");

    if (x === true) {
    } else {

    generateTableHead();
    };

    console.log("part2 of update_inv")

    let storage = JSON.parse(localStorage.getItem('local_inv'));

    for (i of Object.values(storage)) {
        let element = document.getElementById(i.item);

        try {
            element.innerHTML = i.qua;
        } catch {
            let row = table_1.insertRow();
            for (key in i) {
                let cell = row.insertCell();
                let text = document.createTextNode(i[key]);
                cell.appendChild(text);
            }
        }
    }
    update_table_ids();
}


// PAGE LOAD
function check_storage() {
    console.log("check_storage")

    if (localStorage.length != 0) {
        console.log("not empty")
        update_inv();

    } else {
        init_vars()
        init_inventory_table()
        enable_btns()
    }

    check_craft_buttons()
}

/* function remove_table() {
    let remove_this = document.getElementById('table_1');
    let tableParent = remove_this.parentElement;
    tableParent.removeChild(remove_this);
}

function replace_table() {
    const newHead = document.createElement("table");
    document.getElementById("placeholder").appendChild(newHead); */

