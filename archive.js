



// SAVE STORAGE QUERY
/* navigator.storage.estimate().then(function(estimate) {
    console.log("Total Storage Available: " + estimate.quota);
    console.log("Storage Used: " + estimate.usage);
}) */


// THERE MUST BE A BETTER WAY
/* function AssembleClick(e) {
    let sel = e.target.id;
    let assembly = JSON.parse(localStorage.getItem('assembly_list'));
    let bot = JSON.parse(localStorage.getItem('bots_list'));

    if (sel === "pwr_sub_btn") {
        start_cooldown(assembly[0]);
    };
    
    if (sel === "ctr_ass_btn") {
        start_cooldown(assembly[1]);
    };

    if (sel === "sm_chass_btn") {
        start_cooldown(assembly[2]);
    };

    if (sel === "arm_ass_btn") {
        start_cooldown(assembly[3]);
    }; 

    if (sel === "salv_assembly_btn") {
        start_cooldown(bot[0]);
    }; 

    if (sel === "bild_assembly_btn") {
        start_cooldown(bot[1]);
    }; 

    if (sel === "explorer_assembly_btn") {
        start_cooldown(bot[2]);
    }; 
} */