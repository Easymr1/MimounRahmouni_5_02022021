//  Création des article via l'API 
async function main() {
    const articles = await getElement();
    articles.map(article => displayArticle(article));
    articlesNumbers();
}


const displayArticle = (article) => {
    let template = document.getElementById("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".title_product").textContent = article.name;
    clone.querySelector(".img_product").src = article.imageUrl;
    clone.querySelector(".desription_product").textContent = article.description;
    clone.querySelector(".price").textContent = article.price / 100 + ` €`;
    clone.querySelector(".produit").href = `article.html?id=${article._id}`;


    document.querySelector(".parent").appendChild(clone);
}

const articlesNumbers = () => {
    const articleNumbers = localStorage.getItem('cartNumbers');
    const nombreArticlePanier = document.querySelector(".cart");

    if (articleNumbers === null) {
        nombreArticlePanier.textContent = 0;
    } else {
        nombreArticlePanier.textContent = articleNumbers;
    }
}

main()