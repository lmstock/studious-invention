    // set ad variables
    var ad1 = document.getElementById("ad1");
    var ad2 = document.getElementById("ad2");
    var ad3 = document.getElementById("ad3");
    var ad4 = document.getElementById("ad4");
    var ad5 = document.getElementById("ad5");

let adList = [ad1, ad2, ad3, ad4, ad5]

// images list 
let ads = [
    "lilads/art.png",
    "lilads/atomic.png",
    "lilads/bits.png",
    "lilads/boat.png",
    "lilads/brick.png",
    "lilads/cateyes.png",
    "lilads/faces.png",
    "lilads/grocery.png",
    "lilads/house.png",
    "lilads/morning.png",
    "lilads/NEWS.png",
    "lilads/retro.png",
    "lilads/revolution.png",
    "lilads/runcat.png",
    "lilads/slots.png",
    "lilads/there.png",
    "lilads/tooth.png",
    "lilads/trash.png",
    "lilads/tresbien.png",
    "lilads/watchers.png",
    "lilads/window.png",
    "lilads/yesterday.png",
]

function change_ad() {
 // replace debug function

    // get random integer to choose ad being replaced
    let adLen = adList.length;
    repAdIndex = get_rand_int(0, adLen-1);
    let replace_this = adList[repAdIndex].src;

    // get random integer to choose replacement ad
    let len = ads.length;
    let new_ad_index = get_rand_int(0, len-1);
    let with_this = ads[new_ad_index];

    let is_duplicate = "no";

    for (i of adList) {

        if (i.src.includes(with_this)) {
            // if ad is already displayed, do nothing
            // this also introduces varying times
            is_duplicate = "yes";
        }

        else {}
    } 

    if (is_duplicate === "no") {
    //replace ad
    adList[repAdIndex].src = ads[new_ad_index];
    }

}

setInterval(change_ad, 3000);