let inventory = [
    { item: "plastic framing", item_no: 001, quantity: 0 },
    { item: "bundle of wiring", item_no: 002, quantity: 0 },
    { item: "sensor", item_no: 003, quantity: 0 },
    { item: "controller", item_no: 004, quantity: 0 },
    { item: "power supply", item_no: 005, quantity: 0 },
];


console.log("test");

function generateTableHead(table) {
    let thead = table.createTHead();
}

let table = document.querySelector("table");
generateTableHead(table);

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



