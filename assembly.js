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
    console.log("update_table_ids");
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
function selection_input() {

}

  // Creates ingredient header
function ing_hdr(ing) {
    let ing_hdr = ing;
    let h = document.createElement("h3");
    let node = document.createTextNode(ing_hdr);
    h.appendChild(node);
    let m = document.getElementById("ingredients");
    m.appendChild(h);
  }
  
  // Creates radio button
function create_radio(id, name, value) {
      let radiobox = document.createElement('input');
      radiobox.type = 'radio';
      radiobox.id = id;  // id
      radiobox.name = name;  // group
      radiobox.value = value;  // input

      let label = document.createElement('label');  // 
      label.htmlFor = id;

      let description = document.createTextNode(" " + id);
      label.appendChild(description);

      let newline = document.createElement('br');

      let container = document.getElementById('ingredients');
      container.appendChild(radiobox);
      container.appendChild(label);
      container.appendChild(newline);
  }

ing_hdr("robot_assembly")
create_radio("fish", "name", "value")
  // Creates radio btn list for each ingredient of selection



/* document.getElementById('submit').onclick = function() {
  var radiobox = document.createElement('input');
  radiobox.type = 'radio';
  radiobox.id = 'contact';
  radiobox.value = 'email';
 
  var label = document.createElement('label')
  label.htmlFor = 'contact';
 
  var description = document.createTextNode('Email');
  label.appendChild(description);
 
  var newline = document.createElement('br');
 
  var container = document.getElementById('container');
  container.appendChild(radiobox);
  container.appendChild(label);
  container.appendChild(newline); */