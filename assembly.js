function load_assembly() {

    // get local_inv from localStorage
    let r = JSON.parse(localStorage.getItem("user_inv"));

    // run table functions from below
    a_generateTableHead();
    a_generateTable(table_2, r);
    a_update_table_ids();
}


// Generates Table Headers - 
function a_generateTableHead() {

    let table_inv = document.getElementById("table_2");
    let data_inv = ["Id", "Item", "Health"];

    let thead = table_2.createTHead();
    let row = thead.insertRow();
    for (let key of data_inv) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function a_generateTable(table, data) {
    for ( let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}

function a_update_table_ids() {
    let rowNum = document.getElementById("table_2").rows.length;
    for (let i = 0; i < rowNum; i++) {
        let name = table_2.rows[i].cells[0].innerHTML;
        table_2.rows[i].cells[1].id = name;
    }
}


// Assembly Section

// take input from assembly selection and display required ingredients
function radio_check(e) {
    let radio_target = e.target.value;
    let a = JSON.parse(localStorage.assembly_list);
    let r = JSON.parse(localStorage.user_inv);

    // Information about selection posted to terminal
    debug.textContent = "Information about the " + radio_target;

    // Clear DOM section
    clear_section('ing_section');

    // for assembly selection
    for (i of a) {
        if (i.name === radio_target) {

            // Print Assembly Subheading
            let a_head = document.createElement('h3');
            let newline = document.createElement('br');
            a_head.textContent = radio_target;
            ing_section.appendChild(a_head);
            ing_section.appendChild(newline);

            // for each ingredient
            Object.keys(i.ingredients).forEach(element => {

                // ingredient heading
                let i_head = document.createElement('h4');
                i_head.textContent = element;
                ing_section.appendChild(i_head);

                // get user inventory of 
                for (x of r) {
                    if (x.item_name === element) {

                        // if none of ingredient, add to info box

                        // create radio buttons for user's set of ingredient
                        let name = x.item_no + " - " + x.item_name + " - h." + x.health
                        create_radio(x.item_name, name, x.item_no);
                    }
                }

            // space between ingredient selection sections    
            let newline = document.createElement('br');
            ing_section.appendChild(newline);
        })
    }
}}

// disable submit button until all ingredients are selected
sub_btn = document.getElementById("submit_btn").disabled = false;

  // Clear ing_section
function clear_section(section) {
    const parent = document.getElementById(section);
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
  
// Set one as default
  // Creates radio button
function create_radio(id, text, id_num) {
      let radiobox = document.createElement('input');
      radiobox.type = 'radio';
      radiobox.id = id_num;  // id
      radiobox.name = id;  // group
      radiobox.value = id;  // input

      let label = document.createElement('label');  // 
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

  // calculate new inventory 
function submit_selection() {
    console.log('wired up');

    // Access user_inv and assembly_list 
    let a = JSON.parse(localStorage.assembly_list);
    let r = JSON.parse(localStorage.user_inv);

    // Get assembly item from radio button
    let ass_list = document.getElementsByName('assembly');
    
    function get_assembly_item() {
    for (y of ass_list) {
        if (y.checked === true) {
            return y.value;
        };
    }
}

    assembly_item = get_assembly_item();

    // Get ingredients list
    function get_ing_list() {
        for (b of a) {
            if (b.name === assembly_item) {
                return b.ingredients;
            }
        }
    }

    let ing_list = get_ing_list();
    console.log(ing_list);

    Object.keys(ing_list).forEach(element => {
        let test = get_checked_value(element);
        console.log(test);  // id #s
        
        console.log(r[2].item_no); 
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
    
    
// RETURN HERE AFTER REWIRING ASSEMBLY

    // Subtract ingredients from inventory

    // Calculate Assembly Health

    // Add assembly to inventory


} // End submit_selection



function gen_rand_assembly(lot) {};

  // EVENTS

  // displays assembly info when new radio button is selected
const assembly_radio = document.getElementById('assembly_radio').addEventListener('input', radio_check);
const submit = document.getElementById('submit_btn').addEventListener('click', submit_selection);

const log = document.getElementById('terminal');


      // UTILIZE ARROW FUNCTIONS
      // LOOK BACK FOR OTHER OPPORTUNITES TO RETURN


