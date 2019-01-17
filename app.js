document.querySelector(".get-jokes").addEventListener("click", getJokes);


function errorAlert() {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.innerHTML = "That number is invalid!"
    const container = document.querySelector(".container");
    const form = document.querySelector("form");
    container.insertBefore(div, form);
}

function getJokes(e) {
    const number = document.querySelector("#number").value;

    if (number <= 0 ) {
        errorAlert();
        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000);
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `https://api.icndb.com/jokes/random/${number}`, true);

    xhr.onload = function () {
        if (this.status === 200) {
            const response = JSON.parse(this.responseText);
            let output = "";

            if (response.type === "success") {
                response.value.forEach(function (joke) {
                    output += `<li class="font-weight-bold my-3">${joke.joke}</li>`
                })
            } else {
                output += "<li>Something went wrong!</li>";
            }

            document.querySelector(".jokes").innerHTML = output;
        }
    }

    e.preventDefault();

    xhr.send();
}