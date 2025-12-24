/* --- SCRIPT.JS: Homepage Specific Logic --- */

function renderBooks(filter = 'All') {
    const grid = document.getElementById('book-grid');
    grid.innerHTML = '';

    const filteredBooks = filter === 'All' 
        ? books 
        : books.filter(book => book.category === filter);

    filteredBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        // Make entire card clickable
        card.onclick = (e) => {
            // Prevent navigating if clicking the add button
            if(!e.target.closest('.btn-cart')) {
                window.location.href = `book-detail.html?id=${book.id}`;
            }
        };

        const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

        card.innerHTML = `
            <div class="card-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="card-cat">${book.category.toUpperCase()}</div>
            <div class="card-title">${book.title}</div>
            <div class="card-author">${book.author}</div>
            <div class="card-rating">${stars} (${book.rating})</div>
            <div class="card-footer">
                <div class="card-price">$${book.price.toFixed(2)}</div>
                <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${book.id})">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterBooks(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === category) btn.classList.add('active');
    });
    renderBooks(category);
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    renderBooks();
});