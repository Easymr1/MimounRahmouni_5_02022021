const id = new URLSearchParams(window.location.search).get("id");

async function main() {
    const articles = await getElement();
    const oneArticle = createArticle(articles, id);
    creatArticle(oneArticle);
    creatVarnish(oneArticle.varnish);
    getPrice(oneArticle.price / 100);

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
        let choseVarnish = chose.target.value;
        console.log(choseVarnish);
    })

}

const getPrice = (price) => {
    let totals = [];
    let numberOfArticle = document.querySelector(".cart");
    const btn = document.querySelector(".button");
    btn.addEventListener('click', () => {
        totals.push(price);
        numberOfArticle.textContent += 1;
        return calcule(totals);

    })

}

const calcule = data => {

    let sum = 0;
    data.map(total => {
        sum += total;
    });

    localStorage.setItem("total", sum)
}


main()