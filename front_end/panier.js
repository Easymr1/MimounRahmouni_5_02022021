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
                <p class='numberItems'>Qté : <button class='moins'><i class="fas fa-minus"></i></button> <strong>${item.inCart}</strong> <button class ='plus'><i class="fas fa-plus"></i></button> <button class ='supprimer'>Supprimer</button></p>
            </div>
        </div>
        <p class ='price'>${item.price}</p>
    </div>
    `;
            document.querySelector('.prixTotal').textContent = total + ' €';
            cartInformation.products.push(item.id); // Envoie id pour la requet push
        })
    } else {
        //Si le panier et vide le formulaire ne s'affiche pas//
        document.querySelector('.produit').innerHTML += `
        <div class = 'panierVide'>
        <h2>Votre panier et vide</h2>
        </div>
        `;
        let formulaire = document.querySelector('.formulaire');
        formulaire.style.display = "none";
        document.querySelector('.prixTotal').textContent = 0 + ' €';
    }
    let id = Object.keys(product);

    let supprimer = document.querySelectorAll('.supprimer');
    supprimer.forEach(item => addEventListener('click', async() => {
        console.log()
    }));




}


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

        if (lastName.match(/\b[^\d\W]+\b/) && lastName !== "") {
            cartInformation.contact.lastName = lastName;
            document.querySelector('.nom').textContent = ''

        } else {
            document.querySelector('.nom').textContent = 'Nom incorrect'
        }

        if (firstName.match(/\b[^\d\W]+\b/) && firstName !== "") {
            cartInformation.contact.firstName = firstName;
            document.querySelector('.prenom').textContent = ''

        } else {
            document.querySelector('.prenom').textContent = 'Prénom incorrect'
        }

        if (city.match(/\b[^\d\W]+\b/) && city !== "") {
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
        if (email.match(/\S+@\S+\.\S+/) && email !== "" && lastName.match(/\b[^\d\W]+\b/) && lastName !== "" && firstName.match(/\b[^\d\W]+\b/) && firstName !== "" && city.match(/\b[^\d\W]+\b/) && city !== "" && address !== "") {
            post();
        }




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
            alert('Erreur dans le formulaire')
        };
    });
}

creationProduit();
dataRetouner();