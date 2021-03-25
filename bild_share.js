





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