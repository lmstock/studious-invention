
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
    let count = dice(4,3);

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

/*                 // Assembly Selections
                if (item_find === "assembly") {
                    select = get_rand_int(0, assembly_list.length - 1);
                    item_find = assembly_list[select].name;

                    assembly_message = "<br>You found a subassembly!";
                    shortlist.push(assembly_message);
                } */

            // ADD TO INVENTORY list ***
            // ===== update to get info from det_inv
            increase_item(item_find.name, 1);
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

// increases local_inv
function increase_item(item, quantity) {

    let l = JSON.parse(localStorage.getItem('local_inv'));

    for (i of Object.values(l)) {
        if (item === i.item) {
            //i.qua = quantity;
            i.qua = i.qua + quantity;
            // i.health ?
        }
    }

    localStorage.setItem("local_inv", JSON.stringify(l));
 
    update_inv()
}

// adds to user_inv
function add_item(name, health) {
    let r = JSON.parse(localStorage.getItem("user_inv"));
    
    // get item number of new item
    itemNo = r.length;

    let this_obj = {};
    this_obj["item_no"] = itemNo;
    this_obj["item_name"] = name;
    this_obj["health"] = health;
    r.push(this_obj);

    localStorage.setItem("user_inv",JSON.stringify(r));
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

// Generates Inventory Table - 
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
    // console.log("update_table_ids");
    let rowNum = document.getElementById("table_1").rows.length;
    for (let i = 0; i < rowNum; i++) {
        let name = table_1.rows[i].cells[0].innerHTML;
        table_1.rows[i].cells[1].id = name;
    }
}

/* function check_craft_buttons() {
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
}  */


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

// Build full inventory table from localStorage.local_inv first time only
function init_inventory_table() {
    let set_inventory = [];

    let r = JSON.parse(localStorage.getItem('local_inv'));

    for (x of r) {

        // prevent "assemblies" and "misc" from appearing in inventory table
        if ( x.item === "assembly" || x.item === "misc") {
        } else {

        let this_obj = {}
        this_obj["item"] = x.item;
        this_obj["qua"] = x.qua;
        set_inventory.push(this_obj);
    }};

        // INVENTORY TABLE
    let table_inv = document.getElementById("table_1");


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
    };

    localStorage.setItem("local_inv", JSON.stringify(set_local_inv));
}


 // Update inventory table with localStorage.local_inv
function update_inv() { //1
    console.log("starting update_inv");

    // generate table head only if absent
    let x = !!document.getElementById("Item");
    if (x === true) {
    } else {
    generateTableHead();
    };


    let r = JSON.parse(localStorage.getItem('local_inv'));

    
    for (x of r) {
        let element = document.getElementById(x.item);

        // dont add assembly or misc to table
        if ( x.item === "assembly" || x.item === "misc") {

        } else {

            try {
                element.innerHTML = x.qua;
            } catch {
                let row = table_1.insertRow();
                for (key in x) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(x[key]);
                    cell.appendChild(text);
                }
            }
    }}
    update_table_ids();
} // 1


// PAGE LOADS
function load_salvage() {
    console.log("load_salvage")

    if (localStorage.length != 0) {
        console.log("not empty")
        update_inv();

    } else {
        init_vars()
        init_inventory_table()
        enable_btns()
    }
}

