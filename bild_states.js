if (debug === 1) {
    document.getElementById("debug_1").innerHTML = "DEBUG ON";
} else {}


// button states - 1. any way to do it, 2. right way to do it
function check_craft_buttons() {
    debugging("check_craft_buttons");

    for (x of craftable_units) {
        
        //console.log(x);  // prints object of current loop

        // sets btn_state to 1, missing ingredient will set to zero
        let btn_state = 1;

        Object.keys(x.ingredients).forEach(element => {

            // assigns quantity from inventory to variable and converts to number
            let qua_in_inv = document.getElementById(element).innerHTML;
            qua_in_inv = parseInt(qua_in_inv, 10);
            
            // assigns quantity of ingredient required to a variable
            let elem_req = x.ingredients[element];
            
            // check inventory vs requirements and update btn_state
            if (qua_in_inv >= elem_req) {
                console.log("Item: " + x.name + "; qua_in_inv: " + qua_in_inv + "; elem_req: " + elem_req + "; yes");
                console.log(btn_state);
            } else {
                btn_state = 0
                console.log("no");
                console.log(btn_state);
            }
            
            // enable/disable craft button based on state
            if (btn_state == 0) {
                x.btn.disabled = true;
            } else {
                x.btn.disabled = false;
            }


        });
  

    } 
}  // button states need checked after inventory changes

check_craft_buttons()