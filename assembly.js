function load_assembly() {

    // get local_inv from localStorage
    let assembly_page_inventory = JSON.parse(localStorage.getItem("local_inv"));

    // run table functions from below
    a_generateTableHead();
    a_generateTable(table_2, assembly_page_inventory);
    a_update_table_ids();
}


// Generates Table Headers - 
function a_generateTableHead() {

    let table_inv = document.getElementById("table_2");
    let data_inv = ["Item", "Quantity", "Health"];

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


