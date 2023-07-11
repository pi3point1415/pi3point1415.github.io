// Currently rolling new subtitle
let rolling = false;
// Last subtitle
let last = null;
// Possible subtitles
let options;


function setSubtitleInitial() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let result = xhttp.responseText;
            options = result.split(/\r?\n/)

            setSubtitle();
        }
    };

    xhttp.open("GET", "et.txt", true);
    xhttp.send();
}

// Code for changing subtitle
function setSubtitle() {
    let sub = document.getElementById("subtitle");

    let choice;
    do {
        choice = options[Math.floor(Math.random() * options.length)]
    } while (choice === last);

    last = choice;

    sub.innerHTML = choice;
}

// Code for active navbar page
function importNavbar() {
    let page = window.location.pathname.split("/").pop();
    if (page === "") {
        page = "index.html";
    }

    let nav = document.getElementsByTagName("nav")[0];

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            nav.innerHTML = xhttp.responseText;

            let navList = nav.children[0].children

            for (let i = 0; i < navList.length; i++) {
                let a = navList[i].children[0];
                let navPage = a.href.split("/").pop();
                if (navPage === page) {
                    a.classList.add("active");
                }
            }
        }
    }
    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
}

// Code for clicking the die to randomize the ET text
function rollDice() {
    if (rolling) {
        return;
    }
    rolling = true;

    let die = document.getElementById("die");


    let t1 = new Date().getTime();
    let interval = 500;
    let delay = 50;

    function updateDie() {
        let num = Math.floor(Math.random() * 6) + 1
        die.className = "die" + num
        if (new Date().getTime() - t1 < interval) {
            setTimeout(updateDie, delay);
        }
        else {
            setSubtitle();
            rolling = false;
        }
    }

    setTimeout(updateDie, delay);
}

setSubtitleInitial();
importNavbar();