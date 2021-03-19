function set_storage(name, list) {
    localStorage.setItem(name, JSON.stringify(list))
}

function get_storage(list) {
    let l = JSON.parse(localStorage.getItem(list));
    return l;
}

function load_assembly() {
    console.log("load_assembly");
    let r = get_storage("user_inv");
    a_generateTable(table_2, r);
}

function a_generateTable(table, data) {
    console.log("a_generateTable")
    for ( let x of data) {
        let row = table.insertRow();

        let cell_id = row.insertCell();
        let text_id = document.createTextNode(x.id);
        cell_id.appendChild(text_id);

        let cell_item_name = row.insertCell();
        let text_item_name = document.createTextNode(x.item_name);
        cell_item_name.appendChild(text_item_name);

        let cell_health = row.insertCell();
        let text_health = document.createTextNode(x.health);
        cell_health.appendChild(text_health)
    }}


// Assembly Section

// take input from assembly selection and display required ingredients
function radio_check(e) {
    let radio_target = e.target.value;
    let manual = get_storage("manuals");
    let r = get_storage("user_inv");

    // Post information about selection in debug window
    debug.textContent = "Information about the " + radio_target;

    // Clear ingredients section
    clear_section('ing_section');

    // Selection
    console.log("target = " + radio_target);
    let selection = {};

    if ( radio_target === "power_subsystem" ) {
        selection = manual[0].power_subsystem;
        console.log(selection)
    }

    if ( radio_target === "controller_assembly" ) {
        selection = manual[1].controller_assembly;
        console.log(selection)
    }

    if ( radio_target === "small_chassis" ) {
        selection = manual[2].small_chassis;
        console.log(selection)
    }

    if ( radio_target === "arm_assembly" ) {
        selection = manual[3].arm_assembly;
        console.log(selection)
        }

    // Print Assembly Subheading
    let assembly_header = document.createElement('h3');
    let newline = document.createElement('br');
    assembly_header.textContent = radio_target;
    ing_section.appendChild(assembly_header);
    ing_section.appendChild(newline);

    for ( i in selection ) {
        console.log(i)
    
        // Ingredient Heading
        let ingredient_header = document.createElement('h4');
        ingredient_header.textContent = i;
        ing_section.appendChild(ingredient_header);

                // Get User Inventory 
                for (x of r) {
                    if (x.item_name === i) {

                        // IF MISSING INGREDIENTS, ADD TO INFO BOX

                        // Create Radio Buttons for User's Set of Ingredient
                        let name = x.id + " - " + x.item_name + " - h." + x.health
                        create_radio(x.item_name, name, x.id);
                    }}

            // Add space between ingredient radio button sections    
            let newline = document.createElement('br');
            ing_section.appendChild(newline);
            }
    }
    
// TODO
// DISABLE SUBMIT BUTTON UNTIL ALL INGREDIENTS ARE SELECTED
sub_btn = document.getElementById("submit_btn").disabled = false;


// Clear ing_section
function clear_section(section) {
    const parent = document.getElementById(section);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }}
  
// Creates Radio Button
function create_radio(id, text, id_num) {
      let radiobox = document.createElement('input');
      radiobox.type = 'radio';
      radiobox.id = id_num;  // id
      radiobox.name = id;  // group
      radiobox.value = id;  // input

      let label = document.createElement('label'); 
      label.htmlFor = id;

      let description = document.createTextNode(text + " ");
      label.appendChild(description);

      let newline = document.createElement('br');

      let container = document.getElementById('ing_section');
      container.appendChild(radiobox);
      container.appendChild(label);
      container.appendChild(newline);
      container.appendChild(newline);
  }



  // YOU ARE HERE
  function craft(obj) {
    // Removes ingredients from inventory (localStorage);
    Object.keys(obj.ingredients).forEach(element => {

        let r = JSON.parse(localStorage.getItem("local_inv"));
        let inv_qua = 0;
        let req = 0;
        let total = 0;

        for (x of r) {
            if (x.item === element) {
                req = obj.ingredients[element];
                // req = parseInt(req, 10);
                x.qua = x.qua - req;
            }
        }
        
        localStorage.setItem("local_inv", JSON.stringify(r));

    })

    // add to storage
    increase_item(obj.name, 1);

    // refresh terminal to current activity
    clr_term();
    messages.push("you have assembled an " + obj.name);
    set_terminal_message();
}

  // SUBMIT BUTTON
function submit_selection() {
    console.log('function = submit button');

    // Access user_inv and assembly_list 
    let m = get_storage("manuals");
    let r = get_storage("user_inv");

    // New Assembly
    let selections = [];
    let new_obj = [];



    // Get assembly selection from radio button
    let ass_list = document.getElementsByName('assembly');
    
    function get_assembly_item() {
    for (y of ass_list) {
        if (y.checked === true) {
            return y.value;
        };
    }
}
    assembly_item = get_assembly_item();
    console.log("assembly_item = " + assembly_item);



    // Get ingredients list for chosen assembly
    function get_ing_list() {
        for (b of a) {
            if (b.name === assembly_item) {
                return b.ingredients;
            }
        }
    }
    let ing_list = get_ing_list();
    console.log("ing_list = " + ing_list);


    // Loop through ingredient list of chosen assembly and finds ids of selected units
    Object.keys(ing_list).forEach(element => {
        let checked = get_checked_value(element);
        console.log("id # = " + checked);  // id #s
        console.log("typeof = " + typeof(checked));
        selections.push(checked); 
    })
        // Get inputs from radio buttons
        function get_checked_value(group_name) {
            let frog = document.getElementsByName(group_name);
            for (d = 0; d < frog.length; d++) {
                if (frog[d].checked) {
                return frog[d].id;
                }
            }
        }
    
    // THE ACTUAL CHANGES
    console.log(selections);
    for ( m of selections ) {
        console.log(m);
        m = parseInt(m, 10);

        for ( u of r ) {

            if ( u.item_no === m ) {
                console.log("yes " + m);
                new_obj.push(u);
            }
            
            
            
            
        }
        
        // add to new object with slice


        // remove from inventory with splice

        //add new_obj to r
    }

    console.log(new_obj);
    let assembly_item = new Assembly(assembly_item, "assembly", 3000, )

} // End submit_selection

function reset() {
    localStorage.clear();
    location.reload();
    window.alert("Your game has been reset.")
}



  // EVENTS

// displays assembly info when new radio button is selected
const assembly_radio = document.getElementById('assembly_radio').addEventListener('input', radio_check);


const submit = document.getElementById('submit_btn').addEventListener('click', submit_selection);

const log = document.getElementById('terminal');



