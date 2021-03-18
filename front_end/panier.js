let product = localStorage.getItem(`producte`);
let total = localStorage.getItem(`Total`);
let cartNumbers = localStorage.getItem(`cartNumbers`);


const cartInformation = {
    contact: {},
    products: [],
};



//Création produit du panier
const creationProduit = () => {;
    product = JSON.parse(product);
    const caseProduit = document.querySelector('.produit');
    const arrayProduit = [];
    const nombreArticlePanier = document.querySelector(".cart");
    const prixTotalDuPanier = document.querySelector('.prixTotal');
    const formulaire = document.querySelector('.formulaire');

    if (product !== null) {
        Object.values(product).map(item => {
            arrayProduit.push(item);
        })
        newProduit(arrayProduit, caseProduit, nombreArticlePanier, prixTotalDuPanier);
    } else {
        //Si le panier et vide le formulaire ne s'affiche pas//
        caseProduit.innerHTML += `
        <div class = 'panierVide'>
        <h2>Votre panier et vide</h2>
        </div>
        `;

        formulaire.style.display = "none";
        prixTotalDuPanier.textContent = 0 + ' €';
        nombreArticlePanier.textContent = 0;

    }


}


const newProduit = (arrayProduit, caseProduit, nombreArticlePanier, prixTotalDuPanier) => {
    for (let i = 0; i < arrayProduit.length; i++) {
        caseProduit.innerHTML += `
    <div class = 'item'>
        <div class='img__title'>
            <img class='img__produit' src =${arrayProduit[i].image}>
            <div class = 'title'>
                <h3>${arrayProduit[i].name}</h3>
                <p class='numberItems'>Qté :<strong class='nbrProduit${i}'>${arrayProduit[i].inCart}   </strong><button class ='supprimer' id='${arrayProduit[i].id}'>Supprimer</button></p>
            </div>
        </div>
        <p class ='price'>${arrayProduit[i].price} €</p>
    </div>
    `;

        nombreArticlePanier.textContent = cartNumbers;
        prixTotalDuPanier.textContent = total + ' €';
        cartInformation.products.push(arrayProduit[i].id);

        //Suppresion d'un element du pannier au click 
        supprimerElement(arrayProduit);
    }

}




const supprimerElement = (product) => {
    let btn = document.querySelectorAll('.supprimer');
    btn.forEach(item => item.addEventListener('click', () => {
        let result = product.filter(un => un.id !== item.id);
        localStorage.removeItem('producte');
        localStorage.removeItem('Total');
        localStorage.removeItem('cartNumbers');
        let sum = 0;
        let inCart = 0;
        result.forEach(item => {

            let articleCart = localStorage.getItem(`producte`);
            articleCart = JSON.parse(articleCart);
            console.log(articleCart);
            console.log(item)
            if (articleCart === null) {
                articleCart = {};
            }
            if (articleCart[item.id] === undefined) {
                articleCart[item.id] = item;
            }

            let total = localStorage.getItem('Total');
            sum += item.price * item.inCart;
            console.log(sum);

            let cart = localStorage.getItem('cartNumbers');
            inCart += item.inCart;

            localStorage.setItem('cartNumbers', inCart);
            localStorage.setItem('Total', sum);
            localStorage.setItem(`producte`, JSON.stringify(articleCart));



        })
        location.reload();

    }))


};



//Interactcion avec le forumulaire//
const dataRetouner = () => {

    document.querySelector('#commande').addEventListener('submit', function(e) {
        e.preventDefault(); //Annuler le comportement par defaut du formulaire
        let firstName = document.querySelector('#prenom').value;
        let lastName = document.querySelector('#nom').value;
        let address = document.querySelector('#adresse').value;
        let city = document.querySelector('#ville').value;
        let email = document.querySelector('#email').value;

        cartInformation.contact = {
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            email: "",
        }

        if (email.match(/\S+@\S+\.\S+/) && email !== "") {
            cartInformation.contact.email = email;
            document.querySelector('.email').textContent = ''
        } else {
            document.querySelector('.email').textContent = 'Email incorrect';
        }
        if (lastName.match(/^([a-zA-Z ]+)$/) && lastName !== "") {
            cartInformation.contact.lastName = lastName;
            document.querySelector('.nom').textContent = ''
        } else {
            document.querySelector('.nom').textContent = 'Nom incorrect'
        }
        if (firstName.match(/^([a-zA-Z ]+)$/) && firstName !== "") {
            cartInformation.contact.firstName = firstName;
            document.querySelector('.prenom').textContent = ''

        } else {
            document.querySelector('.prenom').textContent = 'Prénom incorrect'
        }
        if (city.match(/^([a-zA-Z ]+)$/) && city !== "") {
            cartInformation.contact.city = city;
            document.querySelector('.ville').textContent = ''

        } else {
            document.querySelector('.ville').textContent = 'Ville incorrect'
        }
        if (address !== "") {
            cartInformation.contact.address = address;
            document.querySelector('.adresse').textContent = ''
        } else {
            document.querySelector('.adresse').textContent = 'Address incorrect'
        }

        //Vérification de tout les condition avant Envoie des donner à l'API//
        if (email.match(/\S+@\S+\.\S+/) && email !== "" &&
            lastName.match(/^([a-zA-Z ]+)$/) && lastName !== "" &&
            firstName.match(/^([a-zA-Z ]+)$/) && firstName !== "" &&
            city.match(/^([a-zA-Z ]+)$/) && city !== "" &&
            address !== "") {
            post();
        }
    })
};

creationProduit();
dataRetouner();