const response = document.getElementById("response");
const response2 = document.getElementById("response2");
const url = "https://us-central1-cloud-computing-345200.cloudfunctions.net/calculator";
const url2 = "https://us-central1-cloud-computing-345200.cloudfunctions.net/submit-pubsub";

function add() { send('add'); }
function sub() { send("sub"); }
function mul() { send("mul"); }
function div() { send("div"); }
function pow() { send("pow"); }

function timeout() { document.getElementById("response2").innerHTML = ""; }

function get_form_data(op) {
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    if (num1 == "") { num1 = '0'; }
    if (num2 == "") {
        switch (op) {
            case "add":
                num2 = '0';
                break;
            case "sub":
                num2 = '0';
                break;
            case "mul":
                num2 = '1';
                break;
            case "div":
                num2 = '1';
                break;
            case "pow":
                num2 = '1';
                break;
        }
    }
    let data = {
        'num1': num1,
        'num2': num2,
        'op': op
    };
    return data;
}

function send(op) {
    let data = get_form_data(op);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader('Content-type', 'application/json');
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange = function () {
        switch (this.readyState) {
            case 0:
                response.innerText = "Not initialized connection";
                break;
            case 1:
                response.innerText = "Server connection established";
                break;
            case 2:
                response.innerText = "Server received the request";
                break;
            case 3:
                response.innerText = "Server is processing the request";
                break;
            case 4:
                if (xmlhttp.status != 200) {
                    response.innerText = this.responseText;
                    document.getElementById("num1").value = "";
                    document.getElementById("num2").value = "";
                }
                else {
                    response.innerText = this.responseText;
                    document.getElementById("num1").value = this.responseText;
                    document.getElementById("num2").value = "";
                }
                break;
        }
    }
}

function pubsub() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", url2, true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function () {
        switch (this.readyState) {
            case 0:
                response2.innerText = "Not initialized connection";
                break;
            case 1:
                response2.innerText = "Server connection established";
                break;
            case 2:
                response2.innerText = "Server received the request";
                break;
            case 3:
                response2.innerText = "Server is processing the request";
                break;
            case 4:
                if (xmlhttp.status != 200) {
                    response2.innerText = "Server gave the error " + request.status + ": " + this.responseText;
                } else {
                    response2.innerText = this.responseText;
                    setTimeout(timeout, 6000);
                }
                break;
        }
    }
}