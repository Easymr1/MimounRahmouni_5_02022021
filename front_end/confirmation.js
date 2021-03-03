const infoBody = () => {
    const idCommande = sessionStorage.getItem('orderId');
    const total = sessionStorage.getItem('Total');
    let products = sessionStorage.getItem('products');

    const body = document.querySelector('#body');
    body.style.textAlign = 'center';

    const title = document.createElement('h1');
    title.innerHTML = 'Votre commande à était enregistrée';
    body.appendChild(title);

    const paragraphe = document.createElement('p');
    paragraphe.innerHTML = `Votre commande n°<strong>${idCommande}</strong> d'une valeur de <strong>${total}</strong> € à bien était validée.<br>  Nous vous remercions d'avoir fais affaire avec orinoco. `
    body.appendChild(paragraphe);

    const section = document.createElement('section');
    body.appendChild(section);

    const titleSection = document.createElement('h2');
    titleSection.innerHTML = 'Récapitulatife de commande';
    section.appendChild(titleSection);

    const article = document.createElement('article');
    article.id = 'produit';
    section.appendChild(article);

    recapProducts(products)


}

const recapProducts = (products) => {
    products = JSON.parse(products);
    console.log(products);

    Object.values(products).map(item => {
        document.querySelector('#produit').innerHTML += `
        <div class = 'item'>
            <div class='img__title'>
                <img class='img__produit' src =${item.image}>
                <div class = 'title'>
                    <h3>${item.name}</h3>
                    <p class='numberItems'>Qté : ${item.inCart}</p>
                </div>
            </div>
            <p class ='price'>${item.price}</p>
        </div>
        `;

    })
}

infoBody()