// EVENT HANDLERS

let salvage_parent_btn = document.getElementById('salvage_parent_btn').addEventListener('click', SalvageClick);

document.getElementById("reset").addEventListener("click", reset);


// some of this probably needs to be in LS.
// get rid of global vars
// run_ads()



/* 

for each checked item

    find in user_inv by id#
    remove from user_inv

    create new object using latest id //#
    add to group

 */