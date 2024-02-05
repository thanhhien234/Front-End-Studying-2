const cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
const cartBody = $("#cartTable tbody");

cartData.forEach(book => {
    console.log('cart.js book', book);
    const sum = book.price * book.quantity;
    cartBody.append(`
        <tr>
            <td class = "book" >
                <img src="${book.imageNum}">
                <div class="book-text">
                    <p class="title">${book.title}</p>
                        <p class="author">${book.author}원</p>
                        <p class="price"><strong>가격:</strong> ${book.price}원</p>
                </div>
            </td>
            <td><input type="number" value="${book.quantity}" min="1"></td>
            <td>${sum}원</td>
            <td>
                <span class="material-symbols-outlined">
                    delete
                </span>
            </td>
        </tr>
    `);
});


cartBody.on('change', 'input[type="number"]', function() {
    const input = $(this);
    const bookIndex = input.closest('tr').index();
    const book = cartData[bookIndex];
    const quantity = parseInt(input.val());
    const sum = book.price * quantity;
    input.closest('tr').find('td:eq(2)').text(`${sum}원`);
    book.quantity = quantity;
    localStorage.setItem("cartItems", JSON.stringify(cartData));
});

cartBody.on('click', '.material-symbols-outlined', function() {
    const row = $(this).closest('tr');
    const bookIndex = row.index();
    cartData.splice(bookIndex, 1)
    row.remove();
    localStorage.setItem("cartItems", JSON.stringify(cartData));
});
