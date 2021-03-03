const infoBody = () => {
    const idCommande = sessionStorage.getItem('orderId');
    console.log(idCommande);

    const body = document.querySelector('body');
    body.style.textAlign = 'center';

    const title = document.createElement('h1');
    title.innerHTML = 'Votre commande à était traiter avec succés';
    body.appendChild(title);

    const paragraphe = document.createElement('p');
    paragraphe.innerHTML = `Votre numero de commande et <strong>${idCommande}</strong> nous vous remercions d'avoir fais affaire avec orinoco. `
    body.appendChild(paragraphe);

    const section = document.createElement('section');
    body.appendChild(section);

    const titleSection = document.createElement('h2');
    titleSection.innerHTML = 'Récapitulatife de commande';
    section.appendChild(titleSection);






}

infoBody()