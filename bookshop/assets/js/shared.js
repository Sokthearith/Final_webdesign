/* --- SHARED.JS: Global Logic for Header, Cart, Auth --- */

const appState = {
    cart: JSON.parse(localStorage.getItem('bookshop_cart')) || [],
    user: JSON.parse(localStorage.getItem('bookshop_user')) || null
};

// --- AUTH FUNCTIONS ---
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('bookshop_user'));
    appState.user = user;
    updateHeaderAuth();
}

function logout() {
    localStorage.removeItem('bookshop_user');
    window.location.href = 'index.html';
}

function updateHeaderAuth() {
    const authContainer = document.getElementById('auth-section');
    if (!authContainer) return;

    if (appState.user) {
        authContainer.innerHTML = `
            <span class="user-name">Hi, ${appState.user.name}</span>
            <button onclick="logout()" class="nav-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>
        `;
    } else {
        authContainer.innerHTML = `
            <a href="login.html" class="nav-btn">
                <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <span>Login</span>
            </a>
        `;
    }
}

// --- CART FUNCTIONS ---
function toggleCart() {
    const cartEl = document.getElementById('cart-wrapper');
    cartEl.classList.toggle('cart-open');
    renderCartItems();
}

function addToCart(bookId) {
    if (!appState.user) {
        window.location.href = 'login.html';
        return;
    }

    const book = books.find(b => b.id === bookId);
    const existing = appState.cart.find(item => item.id === bookId);

    if (existing) {
        existing.qty++;
    } else {
        appState.cart.push({ ...book, qty: 1 });
    }

    saveCart();
    openCart();
}

function updateQty(id, change) {
    const item = appState.cart.find(i => i.id === id);
    if (item) {
        item.qty += change;
        if (item.qty <= 0) {
            appState.cart = appState.cart.filter(i => i.id !== id);
        }
    }
    saveCart();
    renderCartItems();
}

function removeItem(id) {
    appState.cart = appState.cart.filter(i => i.id !== id);
    saveCart();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('bookshop_cart', JSON.stringify(appState.cart));
    updateCartCount();
}

function updateCartCount() {
    const count = appState.cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

function openCart() {
    document.getElementById('cart-wrapper').classList.add('cart-open');
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cart-list');
    const subtotalEl = document.getElementById('cart-subtotal');
    
    if (appState.cart.length === 0) {
        container.innerHTML = `
            <div style="text-align:center; margin-top: 2rem; color: #888;">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24" style="margin: 0 auto 1rem;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <p>Your cart is empty.</p>
                <button onclick="toggleCart()" style="margin-top:1rem; text-decoration:underline;">Continue Shopping</button>
            </div>`;
        subtotalEl.innerText = "$0.00";
        return;
    }

    let total = 0;
    container.innerHTML = appState.cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="${item.title}">
                <div class="cart-item-details">
                    <div>
                        <div style="font-weight:700; font-size:0.95rem;">${item.title}</div>
                        <div style="font-size:0.85rem; color:#666;">$${item.price}</div>
                    </div>
                    <div class="cart-controls">
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <span style="font-size:0.9rem; min-width:20px; text-align:center;">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button onclick="removeItem(${item.id})" style="margin-left:auto; color:red; font-size:0.8rem;">Remove</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    subtotalEl.innerText = "$" + total.toFixed(2);
}

// Initialize Shared Components
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    updateCartCount();
});