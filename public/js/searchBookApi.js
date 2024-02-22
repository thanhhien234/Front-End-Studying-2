async function searchBook(bookId) {
    await $.ajax({
        url: `http://43.203.50.204:8080/api/books?id=${bookId}`,
        type: "GET",
        success: function(res){
            $('#bookImage').attr('src', res.imagePath);
            $('#bookTitle').text(res.title);
            $('#bookAuthor').text('저자: '+ res.author);
            $('#bookDescription').text(res.description);
            $('#bookPrice').text('가격: ' + res.price + '원');

        },
        error: function(err){
            console.log(err);
        }
    });
}

//detail.js
if (location.pathname.includes("detail.html")) {
    const URLSearch = new URLSearchParams(location.search);
    const bookId = URLSearch.get("bookId");
    searchBook(bookId);

    $(".detail-container").on("click", ".cart-btn", function() {
        //add to cart
        const book = findBookById(bookId);
        const existingCartItem = cartItems.find(item => item.id === book.id);
        if (existingCartItem) {
            existingCartItem.quantity++;
        } else {
            book.quantity = 1;
            cartItems.push(book);
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems))

        //animation
        const $cartBtn = $(this);
        const $cartAnimation = $('<div class="cart-animation"></div>');
        $cartBtn.after($cartAnimation);
        $cartAnimation.addClass('active');
        $cartBtn.hide();
        setTimeout(() => {
            $cartAnimation.remove();
            $cartBtn.show();
        }, 500);
    });
}

