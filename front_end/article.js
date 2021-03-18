const id = new URLSearchParams(window.location.search).get("id");

async function main() {
    const articles = await getElement();
    const oneArticle = createArticle(articles, id);
    creatArticle(oneArticle);
    const varnish = creatVarnish(oneArticle.varnish);
    cartNumbers(oneArticle, varnish);
}


const createArticle = (element, id) => {
    let sameArticle = element.find(sameId => sameId._id === id);
    return sameArticle;
}

const creatArticle = (data) => {
    const template = document.getElementById("template");
    const clone = document.importNode(template.content, true);

    clone.querySelector(".title_choix").textContent = data.name;
    clone.querySelector(".img_choix").src = data.imageUrl;
    clone.querySelector(".description_choix").textContent = data.description;
    clone.querySelector(".price_choix").textContent = data.price / 100 + ` €`;

    document.querySelector("#parent").appendChild(clone);
}

const creatVarnish = varnish => {
    const selection = document.querySelector(".selection");
    const label = document.createElement("label");
    label.innerText = "Choose Varnish : ";
    selection.appendChild(label);

    let select = document.createElement("select");
    select.class = "select";
    selection.appendChild(select);

    varnish.map(itchVarnish => {
        const option = document.createElement("option");
        option.value = itchVarnish.toLowerCase();
        option.textContent = itchVarnish;
        select.appendChild(option);
    })
    select.addEventListener("change", (chose) => {
        choseVarnish = chose.target.value;
    });

}

const cartNumbers = (data) => {
    let btn = document.querySelector('.button');


    const product = {
        name: data.name,
        price: data.price / 100,
        image: data.imageUrl,
        id: data._id,
        inCart: 1,
    }


    btn.addEventListener('click', () => {
        let articleNumbers = localStorage.getItem('cartNumbers');
        articleNumbers = parseInt(articleNumbers);
        setItems(product);


        if (articleNumbers) {
            localStorage.setItem('cartNumbers', articleNumbers + 1);
            document.querySelector(".cart").textContent = articleNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector(".cart").textContent = 1;
        }
    });

    const articleNumbers = localStorage.getItem('cartNumbers');
    const nombreArticlePanier = document.querySelector(".cart");

    if (articleNumbers === null) {
        nombreArticlePanier.textContent = 0;
    } else {
        nombreArticlePanier.textContent = articleNumbers;
    }


}

const setItems = product => {
    let articleCart = localStorage.getItem(`producte`);
    articleCart = JSON.parse(articleCart);

    if (articleCart === null) {
        articleCart = {};
    }
    if (articleCart[product.id] !== undefined) {
        articleCart[product.id].inCart += 1;
    } else {
        articleCart[product.id] = product;
    }



    localStorage.setItem(`producte`, JSON.stringify(articleCart));

    //Récuperation du prix
    totalCost(product.price)

}

//Obtenir le prix total du panier 
const totalCost = product => {
    let cartCost = localStorage.getItem('Total');


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('Total', cartCost + product);
    } else {
        localStorage.setItem('Total', product);
    }

}

main()