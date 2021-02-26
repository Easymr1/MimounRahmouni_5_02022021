let product = localStorage.getItem(`producte`);
let total = localStorage.getItem(`Total`);
let cartNumbers = localStorage.getItem(`cartNumbers`);
document.querySelector(".cart").textContent = cartNumbers;
document.querySelector('.prixTotal').textContent = total;


const cartInformation = {
    contact: {},
    produits: [],
};


async function main() {
    creationProduit(product);
    productId(JSON.parse(product))
}



function test() {
    console.log("Hello");
}




function productId(data) {
    let allId = [];
    let id = Object.values(data).map(item => {
        return item.id;
    });

    for (let i = 0; i < id.length; i++) {
        const element = id[i];
        console.log(id);
    }

}

console.log(cartInformation.produits);

//Création des produits sur la page pannier
const creationProduit = product => {
    product = JSON.parse(product);

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
    })
}

let firstName = document.querySelector('#prenom').value;

console.log(firstName);

//Tester le formulaire 

document.querySelector('#commande').addEventListener('submit', function(e) {
    e.preventDefault(); //Annuler le comportement par defaut du formulaire

    let lastName = document.querySelector('#nom').value;
    let address = document.querySelector('#adresse').value;
    let city = document.querySelector('#ville').value;
    let email = document.querySelector('#email').value;

    const cartInformation = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        produits: [],
    };

    alert('formulaire envoyé !')
})

main();