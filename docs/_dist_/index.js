/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const appNode = document.getElementById('app');
const baseUrl = 'https://platzi-avo.vercel.app';

//Api Intl internalización
// formato de fechas y monedas
const formatPrice = (price) => {
  const newPrice = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
  return newPrice;
};

//Web api FETCH

//conectar al servidor.
window
  .fetch(`${baseUrl}/api/avo`)
  //Porcesar la respuesta y convertirla en json
  .then((response) => response.json())
  //JSON-> Data->Renderizar info browser
  .then((responseJson) => {
    const allItems = [];
    responseJson.data.map((item) => {
      //crear nodos
      const image = document.createElement('img');
      image.src = `${baseUrl}${item.image}`;
      image.className =
        'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';

      const title = document.createElement('h2');
      title.textContent = item.name;
      title.className = 'text-lg'; //uso de tailwindcss

      const price = document.createElement('p');
      price.textContent = formatPrice(item.price);
      price.className = 'text-gray-600';

      const priceAndTitle = document.createElement('div');
      priceAndTitle.className = 'text-center md:text-left';
      priceAndTitle.append(title, price);

      const card = document.createElement('div');
      card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
      card.append(image, priceAndTitle);
      console.log(card);

      allItems.push(card);
    });
    appNode.append(...allItems);
  });

/* 
  async function fetchData() {
    const response = await fetch(url),
    data = await response.json(),
    allItems = [];
  
    data.data.forEach((item) => {
      // create image
      const image = document.createElement("img");
      // create title
      const title = document.createElement("h2");
      // create price
      const price = document.createElement("div");
  
      const container = document.createElement("div");
      container.append(image, title, price);
  
      allItems.push(container);
    });
  
    document.body.append(...allItems)
  }
  
  fetchData(); */
