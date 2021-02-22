// EVENT HANDLERS

let salvage_parent_btn = document.getElementById('salvage_parent_btn').addEventListener('click', SalvageClick);

let assemble_parent_btn = document.getElementById('assemble_parent_btn').addEventListener('click', AssembleClick);

document.getElementById("reset").addEventListener("click", reset);



run_ads()









// SAVE STORAGE QUERY
/* navigator.storage.estimate().then(function(estimate) {
    console.log("Total Storage Available: " + estimate.quota);
    console.log("Storage Used: " + estimate.usage);
}) */