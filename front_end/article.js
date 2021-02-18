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
    return select.addEventListener("change", (chose) => {
        let choseVarnish = chose.target.value;
        return choseVarnish;
    });

}

const cartNumbers = (data, varnish) => {
    let btn = document.querySelector('.button');

    btn.addEventListener('click', () => {
        let articleNumbers = localStorage.getItem('cartNumbers');
        articleNumbers = parseInt(articleNumbers);

        if (articleNumbers) {
            localStorage.setItem('cartNumbers', articleNumbers + 1);
            document.querySelector(".cart").textContent = articleNumbers + 1;
        } else {
            localStorage.setItem('cartNumbers', 1);
            document.querySelector(".cart").textContent = 1;
        }
    });
    let articleNumbers = localStorage.getItem('cartNumbers');
    document.querySelector(".cart").textContent = articleNumbers;


    setItems(data);
}

const setItems = data => {
    console.log("My product is : ", data)
}

main()