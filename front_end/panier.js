let product = localStorage.getItem(`producte`);
let total = localStorage.getItem(`Total`);
let cartNumbers = localStorage.getItem(`cartNumbers`);
document.querySelector(".cart").textContent = cartNumbers;

product = JSON.parse(product);
Object.values(product).map(item => {
    console.log('hello')
})

console.log(product.length);