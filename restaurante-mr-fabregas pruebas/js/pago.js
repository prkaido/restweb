let cart = [];

// Cargar el carrito desde localStorage si existe
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    updateCartUI();
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({...product, quantity: 1});
    }
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartItemsContainer = document.querySelector('#cart-items tbody');
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cart.forEach(product => {
        const row = document.createElement('tr');

        const subtotal = product.price * product.quantity;
        total += subtotal;

        row.innerHTML = `
            <td>${product.name}</td>
            <td>
                <button class="decrease-quantity" data-id="${product.id}">-</button>
                ${product.quantity}
                <button class="increase-quantity" data-id="${product.id}">+</button>
            </td>
            <td>$${product.price} COP</td>
            <td>$${subtotal} COP</td>
            <td><button class="remove-item" data-id="${product.id}">&times;</button></td> <!-- Aquí está la "x" -->
        `; 

        cartItemsContainer.appendChild(row);
    });

    document.getElementById('cart-total').textContent = total;

    addCartEventListeners();
}

function increaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    product.quantity += 1;
    saveCart();
    updateCartUI();
}

function decreaseQuantity(id) {
    const product = cart.find(item => item.id === id);
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        removeItem(id);
    }
    saveCart();
    updateCartUI();
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

function addCartEventListeners() {
    // Aumentar cantidad
    const increaseButtons = document.querySelectorAll('.increase-quantity');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            increaseQuantity(button.getAttribute('data-id'));
        });
    });

    // Disminuir cantidad
    const decreaseButtons = document.querySelectorAll('.decrease-quantity');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            decreaseQuantity(button.getAttribute('data-id'));
        });
    });

    // Eliminar producto
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            removeItem(button.getAttribute('data-id'));
        });
    });
}

// Manejador para los botones "Agregar al carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = {
            id: button.getAttribute('data-id'),
            name: button.getAttribute('data-name'),
            price: parseInt(button.getAttribute('data-price'))
        };
        addToCart(product);
    });
});

// Manejador para el botón "Proceder al Pago"
document.getElementById('checkout-button').addEventListener('click', () => {
    // Redirigir a la página de pago
    window.location.href = 'pago.html';
});
