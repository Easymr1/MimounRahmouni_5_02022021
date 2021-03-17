//Récuperation de l'API//
function getElement() {
    return requet = fetch("http://localhost:3000/api/furniture")
        .then(httpBodyResponse => httpBodyResponse.json())
        .then(articles => articles)
        .catch(error => alert(error));
}

async function post() {

    await fetch("http://localhost:3000/api/furniture/order", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartInformation)
    }).then(function(response) {
        return response.json();
    }).then(data => {

        if (data.orderId !== undefined) {
            alert('formulaire envoyé !');
            sessionStorage.setItem('orderId', data.orderId);
            sessionStorage.setItem('products', JSON.stringify(product));
            sessionStorage.setItem('Total', total);
            localStorage.clear();
            window.location = `confirmation.html?id=${data.orderId}`;
        } else {
            alert('Erreur dans le formulaire')
        };
    });
}