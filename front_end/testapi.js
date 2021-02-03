let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
        console.log(response);
        for (let i = 0; i < response.length; i++)  {
            console.log(response[i].name)
            let parent = document.getElementById("parent").innerHTML +=
                `<article class = "produit">
            <h1 class = "title" id = "${response[i].name}">${response[i].name}</h1>
            <img class = "img_product" src="${response[i].imageUrl}" alt="">
            <p class = "description" >${response[i].description}</p>
            <h2 class = "prix" value = "${response[i].price/100}">${response[i].price/100}€</h2>
            <label for="color-select">Choose a vernish:</label>
            <select name="color" id="color-select">
            <option value="">Please choose an option</option>
            <option value="${response[i].varnish[0]}">${response[i].varnish[0]}</option>
            <option value="${response[i].varnish[1]}">${response[i].varnish[1]}</option>
            <option value="${response[i].varnish[2]}">${response[i].varnish[2]}</option>
            </select>
            <button id = "addToCart" onclick = "onClick()">Buy</button>
            </article>`
        }

    }
}
xhr.open("GET", "http://localhost:3000/api/furniture", true);
xhr.send()

function onClick() {
    document.getElementById("cart").innerHTML = "Merci";
}