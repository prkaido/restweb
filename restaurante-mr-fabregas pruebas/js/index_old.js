    let currentSlide = 0;
    const slides = document.querySelector('.slider'); // Selecciona el contenedor del slider
    const totalSlides = document.querySelectorAll('.slide').length; // Número total de slides

    const slideDuration = 3000; // Tiempo que la imagen queda visible (3 segundos)
    const transitionDuration = 1000; // Duración de la transición (1 segundo)

    // Aplica la transición a través de CSS dinámicamente
    slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;

    function changeSlide() {
        currentSlide++;

        if (currentSlide >= totalSlides) {
            // Resetea la posición instantáneamente al inicio cuando llega al último slide
            slides.style.transition = 'none'; // Elimina la transición para evitar el efecto visual de retroceso
            currentSlide = 0; // Vuelve al primer slide
            slides.style.transform = `translateX(0%)`; // Mueve el slider a la primera posición

            // Después de un breve delay, vuelve a activar la transición
            setTimeout(() => {
                slides.style.transition = `transform ${transitionDuration}ms ease-in-out`;
            }, 50); // Retrasa el cambio de transición para que sea fluido en los siguientes slides
        } else {
            // Si no es el último slide, continúa con la transición normal
            slides.style.transform = `translateX(-${currentSlide * 100 / totalSlides}%)`;
        }
    }

    // Ejecuta el ciclo de cambio de slide en intervalos regulares
    setInterval(() => {
        changeSlide();
    }, slideDuration + transitionDuration); // Tiempo total antes de cambiar a la siguiente imagen

    // Estado del carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
    renderCart();
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCartCount();
    saveCart();
}

// Función para actualizar la cantidad en el carrito
function updateCartCount() {
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").innerText = cartCount;
}

// Función para eliminar un producto del carrito
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    renderCart();
    saveCart();
    updateCartCount();
}

// Función para actualizar la cantidad de un producto
function updateQuantity(productName, newQuantity) {
    const product = cart.find(item => item.name === productName);
    if (product && newQuantity > 0) {
        product.quantity = newQuantity;
    } else if (newQuantity === 0) {
        removeFromCart(productName);
    }
    renderCart();
    saveCart();
}

// Función para renderizar los productos del carrito
function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h4>${item.name}</h4>
            <div class="cart-item-quantity">
                <button onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)">
                <button onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
            </div>
            <h5>$${item.price * item.quantity} COP</h5>
            <button onclick="removeFromCart('${item.name}')">🗑️</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    document.getElementById("total-price").innerText = totalPrice;
}

// Función para guardar el carrito en localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Función para proceder al pago (checkout)
function checkout() {
    if (cart.length > 0) {
        alert("Llevando al proceso de pago...");
        // Lógica para llevar los productos al checkout
    } else {
        alert("El carrito está vacío.");
    }
}

// Inicializar carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    renderCart();
});
