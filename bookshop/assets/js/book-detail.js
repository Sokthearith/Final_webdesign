/* --- BOOK-DETAIL.JS --- */

let currentBookId = null;

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));

    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    const book = books.find(b => b.id === id);
    if (!book) {
        window.location.href = 'index.html';
        return;
    }

    currentBookId = book.id;

    // Render Data
    document.title = `${book.title} | Bookshop`;
    document.getElementById('detail-img').src = book.image;
    document.getElementById('detail-cat').innerText = book.category;
    document.getElementById('detail-title').innerText = book.title;
    document.getElementById('detail-author').innerText = book.author;
    document.getElementById('detail-price').innerText = `$${book.price}`;
    document.getElementById('detail-desc').innerText = book.description;
    
    // Rating
    const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));
    document.getElementById('detail-rating').innerText = stars + ` (${book.rating})`;

    // Table
    document.getElementById('table-pub').innerText = book.publisher;
    document.getElementById('table-year').innerText = book.year;
    document.getElementById('table-pages').innerText = book.pages;
    document.getElementById('table-isbn').innerText = book.isbn;

    // Button State
    const btn = document.getElementById('add-to-cart-btn');
    if (!appState.user) {
        btn.innerText = "Login to Purchase";
        btn.onclick = () => {
            // Save current page URL for redirect after login
            let returnUrl = 'book-detail.html' + window.location.search;
            try {
                const pathname = window.location.pathname;
                const filename = pathname.split('/').pop() || 'book-detail.html';
                returnUrl = filename + window.location.search;
            } catch (e) {
                // Use default with current search params
                returnUrl = 'book-detail.html' + window.location.search;
            }
            localStorage.setItem('bookshop_return_url', returnUrl);
            localStorage.setItem('bookshop_pending_book_id', currentBookId.toString());
            window.location.href = 'login.html';
        };
    }
});

function handleDetailAdd() {
    if (currentBookId) addToCart(currentBookId);
}