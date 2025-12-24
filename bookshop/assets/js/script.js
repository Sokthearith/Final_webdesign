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
            if(!e.target.closest('.btn-icon')) {
                window.location.href = `book-detail.html?id=${book.id}`;
            }
        };

        const stars = '★'.repeat(Math.floor(book.rating)) + '☆'.repeat(5 - Math.floor(book.rating));

        card.innerHTML = `
            <div class="card-image">
                <img src="${book.image}" alt="${book.title}">
            </div>
            <div class="card-cat">${book.category}</div>
            <div class="card-title">${book.title}</div>
            <div class="card-author">${book.author}</div>
            <div class="card-rating">${stars}</div>
            <div class="card-footer">
                <div class="card-price">$${book.price}</div>
                <button class="btn-icon" onclick="addToCart(${book.id})">
                    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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