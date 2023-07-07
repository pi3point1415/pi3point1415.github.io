// Code for changing subtitle
function setSubtitle() {
    const sub = document.getElementById("subtitle");

    let options;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let result = xhttp.responseText;
            options = result.split(/\r?\n/)
            sub.innerHTML = options[Math.floor(Math.random() * options.length)];
        }
    };

    xhttp.open("GET", "et.txt", true);
    xhttp.send();
}

// Code for active navbar page
function importNavbar() {
    let page = window.location.pathname.split("/").pop();

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
                    console.log("Match found");
                    a.classList.add("active");
                }
            }
        }
    }
    xhttp.open("GET", "navbar.html", true);
    xhttp.send();
}

setSubtitle();
importNavbar();