/*
THIS VERSION IS BORKEN
cant salvage in both places at once -->
turn on debug
test tagname property
lists
    recipes section
    lots
    items
    buffs
    test update
    <!--am i here?-->

*/

// This feature is experimental and rudimentary. You probably do not want to use it.

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

var messages = []
var msg_hist = []


// Functions



function clr_term() {
    document.getElementById("activity").innerHTML = ""
    messages = []
}



function cooldown(obj) {
    console.log("start cooldown")

    //clear terminal
    clr_term()

    //disables btns
    disable_btns()

    //terminal message
    message = obj.search_message
    messages.push(message);
    msg_hist.push(message);
    update_terminal(message)

    // Anonymous function to send arguments into second function
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

    //re-enables buttons
    enable_btns()
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



function update_terminal() {

    // reprints entire msg list to 'terminal'
    messages.forEach(print_activity);
}

function print_activity(i) {
    document.getElementById("activity").innerHTML += i + "<br>";
}

$(document).ready(function () {
    //your code here

    function disable_btns() {
        $(":button").attr("disabled",true);
    }
    
    function enable_btns() {
        $(":button").attr("disabled",false);
    }

});