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
// including all item options as radio buttons
// --i think-- add onchange event to each btn to trigger function 
function radio_check(e) {
    let radio_target = e.target.value;
    let a = JSON.parse(localStorage.assembly_list);
    let r = JSON.parse(localStorage.user_inv);

    // Information about selection posted to terminal
    debug.textContent = "Information about the " + radio_target;

    // for assembly selection, print ingredients
    for (i of a) {
        if (i.name === radio_target) {
            console.log(i.name, radio_target)

            // Prints Assembly Title
            ingredients.innerHTML = i.name + "<br><br>";

            Object.keys(i.ingredients).forEach(element => {
                console.log(element);

                for (x of r) {
                    if (x.item_name === element) {
                        let name = x.item_no + " - " + x.item_name + " - h." + x.health
                        console.log(name);
                        create_radio(x.item_name, name);
                    }
                }
// YOU ARE HERE - CREATE RADIO FUNCTIONS IS CRAZY
             
        })
        }


}}

function selection_input() {
}
  
  // Creates radio button
function create_radio(id, text) {
      let radiobox = document.createElement('input');
      radiobox.type = 'radio';
      radiobox.id = id;  // id
      radiobox.name = id;  // group
      radiobox.value = id;  // input

      let label = document.createElement('label');  // 
      label.htmlFor = text;

      let description = document.createTextNode(" " + id);
      label.appendChild(description);

      let newline = document.createElement('br');

      let container = document.getElementById('ingredients');
      container.appendChild(radiobox);
      container.appendChild(label);
      container.appendChild(newline);
  }

create_radio("fish", "name", "value")



  // EVENTS

const assembly_radio = document.getElementById('assembly_radio').addEventListener('input', radio_check);
const log = document.getElementById('terminal');





