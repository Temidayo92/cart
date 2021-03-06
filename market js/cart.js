async function getAllProducts() {
  var products = [];
  var cards = [];
  const errorMessage = "<p>We don't currently have any items in stock, but feel free to add your own product/s </p>";
  
  await fetch('index.html', {
      method: 'GET',
      mode: 'cors'
  })
  .then(response => response.json())
  .then(data => products = data)
  .catch(_ => cards.push(errorMessage));

  if (products.length > 0 && cards.length < 1) {
      for (const index in products) {
          var product = products[index];
      
          var productID = product.id;
          var productName = product.name;
          var productImageURL = product.imageURL;
          var productPrice = product.price;
          var productDescription = product.description;

          var card = `
              <div class="col-sm" id=${productID}>
                  <div class="card bg-dark" style="width: 18rem;">
                      <img class="card-img-top" src=${productImageURL} alt="Product Image">
                      <div class="card-body text-white">
                          <h5 class="card-title">${productName}</h5>
                          <p class="card-text">${productDescription}</p>
                          <br />
                          <p><strong>Price: $</strong> ${productPrice}</p>
                      </div>
                      <div class="card-footer bg-transparent text-center row">
                          <button type="button" class="btn btn-outline-warning btn-sm col" id="buy-btn">Buy Product</button>
                          <button type="button" class="btn btn-outline-warning btn-sm col offset-md-1" id="edit-btn">Edit Product</button>
                      </div>
                  </div>
              </div>
          `;

          cards.push(card);
      }
  } else if (products.length < 1 && cards.length < 1) {
      cards.push(errorMessage);
  }

  return cards;
}

async function createNewProduct(product) {
  var result = false;

  await fetch('index.html', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(_ => result = true)
  .catch(_ => result = false);

  return result;
}
