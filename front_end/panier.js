let product = localStorage.getItem(`producte`);
let total = localStorage.getItem(`Total`);
let cartNumbers = localStorage.getItem(`cartNumbers`);
document.querySelector(".cart").textContent = cartNumbers;

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
    `

})

document.querySelector('.prixTotal').textContent = total;

console.log(product.length);