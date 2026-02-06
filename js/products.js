// botón ver más

//
const API_URL = './data/products.json'

//Extracción de DOM
const btn_VerMas = document.getElementById("btn_VerMas")
const product_container = document.getElementById("product_container")
const btn_VerMenos = document.getElementById("btn_VerMenos")

//Da funcionalidad de botones para desplegar y ocultar productos
btn_VerMas.addEventListener('click', desplegarProductos)
btn_VerMenos.addEventListener('click', ocultarProductos)

const productosIniciales = product_container.innerHTML

allProducts = []

//Fetch para la carga de productos 

function fetchProductsList() {
    const options = { 'method': 'GET' }
    fetch(API_URL, options)
        .then((response) => {
            response.json().then((products) => {
                for (let i = 0; i < products.length; i++) {
                    console.log(products[i]);
                }
                allProducts = products


                localStorage.setItem('productos', JSON.stringify(products))
                cargarProductosIniciales()
            })
        })
        .catch((err) => { console.log(err.message); })
}

//Carga de productos de local storage o en caso de no existir información en storage, realiza el fetch a la API
function loadProductsFromStorage() {
    const productosStorage = localStorage.getItem('productos');

    if (productosStorage) {
        allProducts = JSON.parse(productosStorage);
        console.log("Productos cargados desde el localStorage");
        cargarProductosIniciales()
    } else {
        console.log("Productos cargados desde fetch");
        fetchProductsList();
    }
}

//Realizar el despliegue de todos los productos que se encuentren en la base de datos
function desplegarProductos() {
    btn_VerMenos.style.display = 'block' 
    btn_VerMas.style.display = "none"

    let productosHTML = ''

    for (let i = 3; i < allProducts.length; i++) {
        productosHTML += `
    <div class="col-md-4">
        <div class="card h-100 product-card border-0 shadow-sm bg-dark text-white">
          <div class="product-image-wrapper position-relative">
            <img src="${allProducts[i].img}" 
                 class="card-img-top" 
                 alt="Zapatillas Running">
            <div class="product-image-overlay">
              <p class="mb-1 fw-bold">${allProducts[i].name}</p>
              <p class="mb-1 small">${allProducts[i].description}</p>
            </div>
            <span class="badge bg-danger position-absolute top-0 start-0 m-3">-20%</span>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold">${allProducts[i].name}</h5>
            <p class="card-text text-white-50">${allProducts[i].category}</p>
            <h4 class="text-primary fw-bold text-white">$${allProducts[i].price}</h4>
            <button class="btn btn-secondary w-100 mt-2 add-to-cart text-white" onclick="addToCart(this)">Añadir al Carrito</button>
          </div>
        </div>
      </div>
    `;

    }

    product_container.innerHTML += productosHTML

}


//Carga los primeros tres productos de la base de datos
function cargarProductosIniciales() {
    let productosHTMLInicial = ''

    for (let i = 0; i < 3; i++) {
        productosHTMLInicial += `
    <div class="col-md-4">
        <div class="card h-100 product-card border-0 shadow-sm bg-dark text-white">
          <div class="product-image-wrapper position-relative">
            <img src="${allProducts[i].img}" 
                 class="card-img-top" 
                 alt="Zapatillas Running">
            <div class="product-image-overlay">
              <p class="mb-1 fw-bold text-white">${allProducts[i].name}</p>
              <p class="mb-1 small text-white">${allProducts[i].description}</p>
            </div>
            <span class="badge bg-danger position-absolute top-0 start-0 m-3">-20%</span>
          </div>
          <div class="card-body text-center">
            <h5 class="card-title fw-bold text-white">${allProducts[i].name}</h5>
            <p class="card-text  text-white-50">${allProducts[i].category}</p>
            <h4 class="text-primary fw-bold text-white">$${allProducts[i].price}</h4>
            <button class="btn btn-secondary w-100 mt-2 add-to-cart text-white" onclick="addToCart(this)">Añadir al Carrito</button>
          </div>
        </div>
      </div>
    `;
    }

    product_container.innerHTML = productosHTMLInicial
}

//Oculta los productos, excepto los primeros tres
function ocultarProductos() {
    btn_VerMenos.style.display = 'none'
    btn_VerMas.style.display = "block"
    cargarProductosIniciales()

}


loadProductsFromStorage()
