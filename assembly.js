

function load_assembly() {
    console.log("load_assembly");
    gen_table(table_2, get_storage("user_inv"));
    gen_table(table_3, get_storage("assemblies_list"));
}



function refresh_table() {
    clear_table("table_2");  // why does this need parens and 
    clear_table("table_3");

    regen_table_headers(table_2);
    regen_table_headers(table_3);

    gen_table(table_2, get_storage("user_inv")); // this does not?
    gen_table(table_3, get_storage("assemblies_list"));
}

function clear_table(table) {
    console.log("clear_table")
    let parent = document.getElementById(table);
    while(parent.hasChildNodes()) {
        parent.removeChild(parent.firstChild);
    };
}

function regen_table_headers(table) {
    console.log("regen_table_headers");
    let hdr_list = ["ID", "Item_name", "Health"]
    console.log(table);

    let new_head = table.createTHead();
    console.log(new_head)

    let row = new_head.insertRow();
    console.log(row)

    for ( let i of hdr_list ) {
        let th = document.createElement("th");
        let text = document.createTextNode(i);
        th.appendChild(text);
        row.appendChild(th);
    }

}
 
function gen_table(table, data) {
    console.log("gen_table")

    for ( let x of data) {
        let row = table.insertRow();

        let cell_id = row.insertCell();
        let text_id = document.createTextNode(x.id);
        cell_id.appendChild(text_id);

        let cell_item_name = row.insertCell();
        let text_item_name = document.createTextNode(x.item_name);
        cell_item_name.appendChild(text_item_name);

        let cell_health = row.insertCell();
        let text_health = document.createTextNode(x.health.toFixed(1));
        cell_health.appendChild(text_health)
    }}

// On radio button selection, display user's available ingredients
function radio_check(e) {
    let radio_target = e.target.value;

    // Post information about selection in debug window
    debug.textContent = "Information about the " + radio_target;

    // Clear ingredients section of previous content
    clear_section('ing_section');

    // Selection
    let selection = get_selection(radio_target);
    sub_heading(radio_target);

    display_parts(selection);
}

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



// SUBMIT BUTTON
function submit_selection() {
    console.log('function = submit button');

    // Assembly Selection Assignment
    let radio_target = get_checked_value("assembly");
    let assignment_list = get_assignment_list(get_selection(radio_target));

    craft_assembly(radio_target, assignment_list);

    // Clear ingredients section of previous content
    clear_section('ing_section');
    refresh_parts();

    // Refresh Table
    refresh_table();

    
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



function craft_assembly(assembly_name, obj_list) {
    console.log("craft_assembly")
    new_item = {};
    
    let a = get_storage("assemblies_list")
 
    // Set New Assembly Name
    item_name = assembly_name;
 
    let assembly_id = tracking_no();
 
    create_parts_list(obj_list);
    a.push(new_assembly(item_name, assembly_id, parts_list))
    set_storage("assemblies_list", a)
 
 
    remove_parts(parts_list);
 }
 
 function create_parts_list(obj_list) {
    let r = get_storage("user_inv");
    parts_list = [];
 
    // Set New Assembly Parts List
    for ( id of obj_list ) {
        id = parseInt(id, 10);
 
        for ( part of r ) {
            if ( part.id === id ) {
                parts_list.push(part);
            }  
        }
    }
    return parts_list
    }

// REMOVE PARTS FROM INVENTORY
function remove_parts(parts_list) {
    let r = get_storage("user_inv");
    console.log("function remove_parts");
    
    for ( p of parts_list ) {

        function match_id() {
        for ( i of r ) {
            if ( p.id === i.id ) {
                return i
                } else {};
            }
        }

        let x = r.indexOf(match_id());
        r.splice(x, 1)
    }

    set_storage("user_inv", r);
}



// Create list of users inventory by type; assignment_list
function get_assignment_list(selection) {
    let assignment_list = []

    for ( i in selection ) {
        let x = get_checked_value(i);
        x = parseInt(x, 10); 
        assignment_list.push(x);
    }
    return assignment_list
    }



// Print Assembly Subheading
function sub_heading(target) {
    console.log("function sub_heading")

    let assembly_header = document.createElement('h3');
    let newline = document.createElement('br');
    assembly_header.textContent = target;
    ing_section.appendChild(assembly_header);
    ing_section.appendChild(newline);
    }

// Reprint Assembly Options after submission
function refresh_parts() {

    // Clear ingredients section of previous content
     clear_section('ing_section');

    let selection = get_selection(get_checked_value("assembly"));
    display_parts(selection);
    }

function display_parts(selection) {
    console.log("function display_parts");
    let r = get_storage("user_inv");
    let sub_btn = 1;

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
                } 
            }

            // will disable submit button if an ingredient is missing
            if ( count === 0 ) {
                sub_btn = 0;
            }

            // Add space between ingredient radio button sections    
            let newline = document.createElement('br');
            ing_section.appendChild(newline);
            }

        if ( sub_btn === 0 ) {
            console.log("check sub_btn: " + sub_btn)
            document.getElementById("submit_btn").disabled = true;

        } else {
                document.getElementById("submit_btn").disabled = false;   
        }

        console.log("end display_parts")
}



  // EVENTS

// displays assembly info when new radio button is selected
const assembly_radio = document.getElementById('assembly_radio').addEventListener('input', radio_check);

const submit = document.getElementById('submit_btn').addEventListener('click', submit_selection);

const log = document.getElementById('terminal');

