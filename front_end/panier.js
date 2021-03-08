let product = localStorage.getItem(`producte`);
let total = localStorage.getItem(`Total`);
let cartNumbers = localStorage.getItem(`cartNumbers`);
document.querySelector(".cart").textContent = cartNumbers;


const cartInformation = {
    contact: {},
    products: [],
};



//Création produit du panier
const creationProduit = () => {;


    product = JSON.parse(product);

    if (product !== null) {
        Object.values(product).map(item => {

            document.querySelector('.produit').innerHTML += `
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
            document.querySelector('.prixTotal').textContent = total + ' €';
            cartInformation.products.push(item.id); // Envoie id pour la requet push
        })
    } else {
        document.querySelector('.produit').innerHTML += `
        <div class = 'panierVide'>
        <h2>Votre panier et vide</h2>
        </div>
        `;
        let formulaire = document.querySelector('.formulaire');
        formulaire.style.display = "none";
        document.querySelector('.prixTotal').textContent = 0 + ' €';
    }
}


//Tester le formulaire 

const dataRetouner = () => {

    document.querySelector('#commande').addEventListener('submit', function(e) {
        e.preventDefault(); //Annuler le comportement par defaut du formulaire
        let firstName = document.querySelector('#prenom').value;
        let lastName = document.querySelector('#nom').value;
        let address = document.querySelector('#adresse').value;
        let city = document.querySelector('#ville').value;
        let email = document.querySelector('#email').value;

        cartInformation.contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: "",
        }


        if (email.match(/\S+@\S+\.\S+/)) {
            cartInformation.contact.email = email;
        } else {
            console.log('Bad very bad');
        }






        post();


    })


};





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
            alert('Error')
        };
    });
}

creationProduit();
dataRetouner();