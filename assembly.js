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
    //let manual = get_storage("manuals");
    let r = get_storage("user_inv");

    // Post information about selection in debug window
    debug.textContent = "Information about the " + radio_target;

    // Clear ingredients section
    clear_section('ing_section');

    // Selection
    console.log("target = " + radio_target);

    let selection = get_selection(radio_target);

    // Print Assembly Subheading
    let assembly_header = document.createElement('h3');
    let newline = document.createElement('br');
    assembly_header.textContent = radio_target;
    ing_section.appendChild(assembly_header);
    ing_section.appendChild(newline);

    for ( i in selection ) {
    
        // Ingredient Heading
        let ingredient_header = document.createElement('h4');
        ingredient_header.textContent = i;
        ing_section.appendChild(ingredient_header);

            // Display User Inventory 
            let count = 0;
            for (x of r) {
                
                if (x.item_name === i) {
                    count = count + 1;

                    // Create Radio Buttons for User's Set of Ingredient
                    let name = " " + x.id + " - " + x.item_name + " - h." + x.health
                    create_radio(x.item_name, name, x.id);
                    
                    // Set first button as default checked
                    if ( count === 1 ) {
                        document.getElementsByName(i)[0].checked = true;
                    }
                }}

            // Add space between ingredient radio button sections    
            let newline = document.createElement('br');
            ing_section.appendChild(newline);
            }
    }
    
// TODO
// DISABLE SUBMIT BUTTON UNTIL ALL INGREDIENTS ARE SELECTED
sub_btn = document.getElementById("submit_btn").disabled = false;

// Returns user ingredient selection from radio button
function get_selection(target) {
    console.log("function get_selection");
    let manual = get_storage("manuals");
    let selection = {};

    if ( target === "power_subsystem" ) {
        selection = manual.power_subsystem;
    }

    if ( target === "controller_assembly" ) {
        selection = manual.controller_assembly;
    }

    if ( target === "small_chassis" ) {
        selection = manual.small_chassis;
    }

    if ( target === "arm_assembly" ) {
        selection = manual.arm_assembly;
        }

    return selection
}   

function clr_term() {
    terminal.innerHTML = ""
    messages = []
}

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
      radiobox.value = id_num;  // input

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

function craft_assembly(assembly_name, obj_list) {
    console.log("function = craft()")
    new_item = {};
    parts_list = [];

    let r = get_storage("user_inv");
    let track = get_storage("tracking");
    let a = get_storage("assemblies_list")

    // Set New Assembly Name
    new_item.name = assembly_name;
    console.log("new_item.name = " + new_item.name);

    // Set New Assembly Id Number
    track.id_assembly = track.id_assembly + 1;
    let assembly_id = "P" + track.id_assembly;
    console.log(assembly_id + " " + track.id_assembly);
    set_storage("tracking", track);

    // Set New Assembly Parts List
    console.log(obj_list);
    for ( id of obj_list ) {
        id = parseInt(id, 10);
        console.log("for id in obj_list " + id)
        for ( part of r ) {
            if ( part.id === id ) {
                console.log("yes " + part.id + part.item_name + part.health)
                parts_list.push(part);
            }  
        }
    }

    // Calculate Assembly Health
    function get_health(parts_list) {
        let count = 0;
        let total = 0;
        for ( i of parts_list ) {
            count = count + 1;
            total = total + i.health;
        }

        let health = total / count;
        console.log("health = " + health)
        return health
    }

    console.log(parts_list)
    new_item.parts_list = parts_list;
    new_item.id = assembly_id;
    new_item.health = get_health(parts_list)
    console.log(new_item)
    
   
    
/*

assembly structure:

assembly_list = {
    assembly_name : x,
    health : 50,
    id_num : P0
    parts_list : {obj, obj, obj}
}

*/

    // Add to Storage

    // Refresh Terminal to Current Activity
    clr_term();
    // set_terminal_message();
}

// SUBMIT BUTTON
function submit_selection() {
    console.log('function = submit button');

    // Access user_inv and assembly_list 
    let manual = get_storage("manuals");
    let r = get_storage("user_inv");

    // Assembly Selection Assignment
    let radio_target = get_checked_value("assembly");
    let selection = get_selection(radio_target);
    console.log("selection = ");
    console.log(selection);

    // Parts Assignment List
    let assignment_list = []

    for ( i in selection ) {
        let x = get_checked_value(i);
        x = parseInt(x, 10);  // ? still come out as strings in craft function
        assignment_list.push(x);
        console.log(typeof(x))

    }

    craft_assembly(radio_target, assignment_list);

    // Remove these items from user_inv and add to object
    // console.log(assignment_list);


} // End submit_selection

function reset() {
    localStorage.clear();
    location.reload();
    window.alert("Your game has been reset.")
}

// Get inputs from radio button groups
function get_checked_value(group_name) {
    let group = document.getElementsByName(group_name);
    for (d = 0; d < group.length; d++) {
        if (group[d].checked) {
        return group[d].value;
        }
    }
}

  // EVENTS

// displays assembly info when new radio button is selected
const assembly_radio = document.getElementById('assembly_radio').addEventListener('input', radio_check);

const submit = document.getElementById('submit_btn').addEventListener('click', submit_selection);

const log = document.getElementById('terminal');



