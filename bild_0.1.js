/*
THIS VERSION IS UNDER HEAVY RECONSTRUCTION
FIX SCRIPT

to do:
everything
*/

// Should all the code go in  ready document ??

$(document).ready(function () {
    //your code here

class Lot {
    constructor(name, cool, loot) {
      this.name = name;
      this.cool = cool;
      this.loot = loot;
    }

    // Cooldown Method
    cooldown() {
        disable_btns();

        // Anonymous function to send arguments into second function
        anon_fun()
        function anon_fun() {}
        setTimeout(function() {enable_btns();}, this.cool);

        console.log("success " + this.name);
    }

    // Get Loot Method
    get_loot() {
        this.loot.forEach(element => {
            console.log(element);
            let x = get_rand_int(1,10);
            console.log(x);

            // add quantity to table
            let amt = document.getElementById(element).innerHTML;
            amt = parseInt(amt, 10);
            let total = amt + x;

            // updates cell
            $("#" + element).text(total);

        }); {

        }
    }

}



// FUNCTIONS

function disable_btns() {
    $(":button").attr("disabled",true);
}

function enable_btns() {
    $(":button").attr("disabled",false);
}

function get_rand_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




// LOOT LISTS
let salvage_loot = ["wire", "battery", "bolt"];
let tinnery_loot = ["motor", "screw", "nut"];

// LOTS
let salvage = new Lot("salvage", 3000, salvage_loot); 
let tinnery = new Lot("tinnery", 3000, tinnery_loot);

// BUTTONS
$("#salvage").click(function(){
    salvage.cooldown();
    salvage.get_loot();
})

$("#tinnery").click(function(){
    tinnery.cooldown();
    tinnery.get_loot();
})




});