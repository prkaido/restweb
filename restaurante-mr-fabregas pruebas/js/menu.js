// Estado del carrito
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Función para mostrar/ocultar el carrito
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");

    // Alternar la clase 'active' para mostrar u ocultar el carrito
    if (cartModal.classList.contains('active')) {
        cartModal.style.opacity = '0'; // Oculta suavemente
        setTimeout(() => {
            cartModal.classList.remove('active');
            cartModal.style.display = 'none'; // Tras la animación, lo ocultamos completamente
        }, 500); // Espera el tiempo de la transición antes de ocultarlo
    } else {
        cartModal.style.display = 'flex'; // Lo muestra
        setTimeout(() => {
            cartModal.classList.add('active');
            cartModal.style.opacity = '1'; // Lo hace visible
        }, 50); // Da un breve retraso para aplicar las animaciones
    }

    renderCart(); // Renderiza el carrito cuando se abre o cierra
}

// Función para agregar productos al carrito
function addToCart(productName, productPrice) {
    const productIndex = cart.findIndex(item => item.name === productName);
    if (productIndex > -1) {
        cart[productIndex].quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    console.log(cart); // Verifica el carrito en la consola
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
        product.quantity = parseInt(newQuantity);
    } else if (newQuantity == 0) {
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

// Inicializar el estado del carrito al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    updateCartCount(); // Actualiza el contador del carrito
    renderCart(); // Renderiza el carrito, pero no lo abre

    // Agregar evento a todos los botones de "Agregar al carrito"
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseInt(button.getAttribute("data-price"));
            addToCart(name, price);
        });
    });
});




// Obtener elementos del DOM
const modal = document.getElementById("productModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModal = document.querySelector(".close");
const decreaseQuantityBtn = document.getElementById("decreaseQuantity");
const increaseQuantityBtn = document.getElementById("increaseQuantity");
const quantityInput = document.getElementById("quantity");
const addToCartBtn = document.getElementById("addToCartBtn");

// Mostrar el modal
openModalBtn.onclick = function() {
  modal.style.display = "block";
}

// Cerrar el modal
closeModal.onclick = function() {
  modal.style.display = "none";
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Aumentar cantidad
increaseQuantityBtn.onclick = function() {
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

// Disminuir cantidad
decreaseQuantityBtn.onclick = function() {
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

// Agregar producto al carrito (puedes personalizar esta función)
addToCartBtn.onclick = function() {
  alert("Producto añadido al carrito: " + quantityInput.value);
  modal.style.display = "none"; // Cerrar el modal después de agregar
}
