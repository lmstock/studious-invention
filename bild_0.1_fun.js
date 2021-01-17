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
        // x = dice(3, 6);
        x = get_rand_int(0,10);
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
    var item_count = document.getElementById(item).innerHTML;
    item_count = parseInt(item_count, 10)
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
