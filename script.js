// Code for changing subtitle
const sub = document.getElementById("subtitle");

let options;

let xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let result = xhttp.responseText;
        options = result.split(/\r?\n/)
        sub.innerHTML = options[Math.floor(Math.random() * options.length)];
    }
};

xhttp.open("GET", "et.txt", true);
xhttp.send();

// Code for navbar
let page = window.location.pathname.split("/").pop();

console.log(page)

let nav = document.getElementsByTagName("nav")[0];
let list = nav.children[0].children

for (let i = 0; i < list.length; i++) {
    let a = list[i].children[0];
    let navPage = a.href.split("/").pop();
    if (navPage === page) {
        console.log("Match found");
        a.classList.add("active");
    }
}