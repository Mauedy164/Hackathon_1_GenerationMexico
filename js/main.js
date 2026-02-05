/* --- LÓGICA DEL CARRITO AVANZADO --- */
let cart = []; // Array para guardar los productos

// Función para añadir al carrito (Vinculada al botón de los productos)
function addToCart(btn) {
    // 1. Obtener datos del producto desde el HTML
    // Usamos .closest para encontrar la tarjeta padre del botón clickeado
    const card = btn.closest('.card'); 
    
    const product = {
        id: Date.now(), // ID único basado en el tiempo
        title: card.querySelector('.card-title').innerText,
        price: card.querySelector('h4').innerText, // Ej: "$120.00"
        image: card.querySelector('img').src
    };

    // 2. Añadir al array
    cart.push(product);

    // 3. Animación del botón (Feedback visual)
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Listo';
    btn.classList.replace('btn-outline-dark', 'btn-success');
    
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.replace('btn-success', 'btn-outline-dark');
    }, 1500);

    // 4. Actualizar la interfaz del carrito
    updateCartUI();
    
    // 5. Mostrar Toast (Notificación)
    const toastEl = document.getElementById('cartToast');
    // Actualizamos el texto del toast para que sea más dinámico
    toastEl.querySelector('.toast-body').innerText = `Se añadió "${product.title}" al carrito.`;
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// Función para eliminar un producto
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Función principal que renderiza el carrito
function updateCartUI() {
    const container = document.getElementById('cart-items-container');
    const countBadge = document.getElementById('cart-count');
    const totalElement = document.getElementById('cart-total');
    const emptyMsg = document.getElementById('empty-msg');

    // Limpiar contenedor actual
    container.innerHTML = '';

    // 1. Actualizar contador rojo
    countBadge.innerText = cart.length;

    // 2. Manejo de estado vacío
    if (cart.length === 0) {
        container.appendChild(emptyMsg); // Volver a poner mensaje vacío
        totalElement.innerText = "$0.00";
        return;
    }

    // 3. Generar HTML para cada producto
    let totalPrice = 0;

    cart.forEach(item => {
        // Limpiamos el precio (quitamos el $) para sumar
        const priceNumber = parseFloat(item.price.replace('$', ''));
        totalPrice += priceNumber;

        const itemHTML = document.createElement('div');
        itemHTML.classList.add('cart-item', 'animate__animated', 'animate__fadeIn');
        itemHTML.innerHTML = `
            <img src="${item.image}" class="cart-thumb" alt="prod">
            <div class="cart-details">
                <span class="cart-title">${item.title}</span>
                <span class="cart-price">${item.price}</span>
            </div>
            <button class="btn-remove" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        container.appendChild(itemHTML);
    });

    // 4. Actualizar Total
    totalElement.innerText = "$" + totalPrice.toFixed(2);
    
    // Animación pequeña al icono del carrito en el navbar
    const cartBtnIcon = document.querySelector('#cart-btn i');
    cartBtnIcon.classList.add('animate__animated', 'animate__headShake');
    setTimeout(() => {
        cartBtnIcon.classList.remove('animate__animated', 'animate__headShake');
    }, 500);
}