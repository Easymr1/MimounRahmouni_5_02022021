//Récuperation de l'API//
function getElement() {
    return requet = fetch("http://localhost:3000/api/furniture")
        .then(httpBodyResponse => httpBodyResponse.json())
        .then(articles => articles)
        .catch(error => alert(error));
}