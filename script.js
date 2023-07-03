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