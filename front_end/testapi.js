//Récuperation de l'API//

function getElement() {
    return requet = fetch("http://localhost:3000/api/furniture")
        .then(httpBodyResponse => httpBodyResponse.json())
        .then(articles => articles)
        .catch(error => alert(error));
}

//Récuperation donné de l'API//
async function main() {
    const articles = await getElement();
    articles.map(article => displayArticle(article));
}
main()

// Création des article via l'API //
const displayArticle = (article) => {
    let template = document.getElementById("template");
    var clone = document.importNode(template.content, true);

    clone.querySelector(".title_product").textContent = article.name;
    clone.querySelector(".img_product").src = article.imageUrl;
    clone.querySelector(".desription_product").textContent = article.description;
    clone.querySelector(".price").textContent = article.price / 100 + ` €`;
    clone.querySelector(".buy").textContent = `Buy`;
    clone.querySelector(".varnish").textContent = article.varnish;
    clone.querySelector(".produit").href = `article.html?id=${article._id}`;




    const price = clone.querySelector(".price").value = article.price / 100;

    document.querySelector(".parent").appendChild(clone);
    creatVarnish(article.varnish);
    buyArticle(price);
}

const buyArticle = price => {
    console.log(price)
}

const creatVarnish = (varnish) => {
    const parent = document.querySelector(".varnish");

    console.log(varnish);
    varnish.map(colorVarnish => {
        const newVarnish = document.createElement("option");
        parent.appendChild(newVarnish).textContent = colorVarnish;
    })



}