// Last subtitle
let last = null;
// Possible subtitles
let options = null;
// Has updated via scroll
let scrolled = false;


// Code for changing subtitle
function setSubtitleInitial() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let result = xhttp.responseText;
            options = result.split(/\r?\n/)

            setSubtitle();
        }
    }

    xhttp.open("GET", "et.txt", true);
    xhttp.send();
}

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

window.onscroll = function () {
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    let header = document.getElementsByTagName("header")[0];
    let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue("height"))

    if (scroll > headerHeight) {
        if (!scrolled) {
            setSubtitle();
            scrolled = true;
        }
    }
    else {
        scrolled = false;
    }
}

setSubtitleInitial();
importNavbar();
