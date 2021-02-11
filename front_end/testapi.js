function getElement() {
    return requet = fetch("http://localhost:3000/api/furniture")
        .then(httpBodyResponse => httpBodyResponse.json())
        .then(articles => articles)
        .catch(error => alert(error));
}

async function main() {
    const articles = await getElement();
    articles.map(article => displayArticle(article));
}

main()


const displayArticle = () => {
    let parent = document.getElementById("parent").innerHTML += `<article class="produit">
    </article>`

}