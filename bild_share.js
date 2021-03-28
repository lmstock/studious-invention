
// Assembly

function tracking_no() {
   let track = get_storage("tracking");

       // Set New Assembly Id Number
       track.id_assembly = track.id_assembly + 1;
       let new_id = "P" + track.id_assembly;
       set_storage("tracking", track);

       return new_id
}

function new_assembly(name, id, parts_list) {
   console.log("function new_assembly")
   new_item = {}

   new_item.item_name = name;
   new_item.id = id;
   new_item.parts_list = parts_list;
   new_item.health = calc_health(parts_list)
   
   return new_item
} 

function calc_health(parts_list) {
   console.log("function calc_health");
   let count = 0;
   let total = 0;
   for ( i of parts_list ) {
       count = count + 1;
       total = total + i.health;
   }

   let health = total / count;
   return health
}


// Dice
function get_rand_int(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

// Storage Access
function set_storage(name, list) {
   localStorage.setItem(name, JSON.stringify(list));
}

function get_storage(list) {
   try {
   let l = JSON.parse(localStorage.getItem(list));
   return l;
   } catch (error) {
       console.log(error);
   }
}

// Clear localStorage & reload page
function reset() {
    
   localStorage.clear();
   location.reload();
   window.alert("Your game has been reset.")
}


document.getElementById("reset").addEventListener("click", reset);

run_ads()