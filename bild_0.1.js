/*
all that and back to the original...

addeventlistener for all buttons
*/


// Variables

var lots = [
    "junkyard",
    "salvage"
]

var junkyard = {
    btn: "junkyard_btn",
    cooldown: 3000,
    loot: ["screw", "nut", "bolt"],
    search_message: "You are looking around the Junkyard...",
}

var salvage = {
    btn: "salvage_btn",
    cooldown: 3000,
    loot: ["battery", "motor", "wire"],
    search_message: "You are looking around the Salvage lot...",
}

// Terminal Messages
var messages = []     // current messages
var msg_hist = []     // all messages


// Functions

function cooldown(obj) {
    console.log("DEBUG: starting cooldown");

    //clear terminal
    clr_term();

    //disables all search btns
    disable_btns();

    //terminal message
    message = obj.search_message
    messages.push(message);
    msg_hist.push(message);
    update_terminal(message)

    // Ananymous function to send arguments into second function
    anon_fun()

    function anon_fun() {
        setTimeout(function() {get_loot(obj);},obj.cooldown);
    }
}

function get_loot(obj) {

    clr_term()
    
    // console
    console.log("function get_loot")

    loot_list = obj.loot;
    for (i of loot_list) {
        x = get_rand_int(0,10);
        console.log("increase " + i + " by " + x);
        increase_item(i, x);
        message = i + " has increased by " + x 

        // adds new msg to top of list
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
    var item_count = document.getElementById(item).innerHTML;
    item_count = parseInt(item_count, 10)
    total = item_count + quantity;
    document.getElementById(item).innerHTML = total;
}

function disable_btns() {
    let parent = document.querySelectorAll("button");
    console.log("DEBUG: disable buttons");

    for (let i = 0; i < parent.length; i++) {
        parent[i].disabled = true;
    }
}

function enable_btns() {
    let parent = document.querySelectorAll("button");
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
    document.getElementById("terminal").innerHTML += i + "<br>";
}

function clr_term() {
    document.getElementById("terminal").innerHTML = ""
    messages = []
}

function buttonClick(e) {
    let sel = e.target.id;
    console.log("DEBUG: " + sel + " clicked");

    if (sel === "salvage_btn") {
        cooldown(salvage);
    };
    
    if (sel === "junkyard_btn") {
        cooldown(junkyard);
    };

}

// EVENT HANDLERS

let parent_btn = document.getElementById('parent_btn').addEventListener('click', buttonClick);
