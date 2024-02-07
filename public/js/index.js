let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

let currentPoster = 0;
const slides = document.querySelectorAll(".slider img");

function nextSlide() {
    currentPoster = (currentPoster + 1) % 3;
    for (let i = 0; i < 3; i++) {
        slides[i].style.transition = "transform 0.5s ease";
        slides[i].style.transform = `translateX(-${currentPoster * 100}%)`;
    }
}

setInterval(nextSlide, 2000);





$(".recommended-wrapper").on("click", ".title", function() {
    window.location.href = "product.html";
});


$(".main-container").on("click", ".title", function() {
    const index = $(this).closest(".item-wrapper").index();
    const book = booksData[index];
    $("#modalBookImage").attr("src", book.imageNum);
    $("#modalBookTitle").text(book.title);
    $("#modalBookPrice").text(book.price + "원");
    $("#modalBookAuthor").text(book.author);
    $("#bookModal").modal("show");
});

$(".modal-btn").click(function() {
    $("#bookModal").modal("hide");
});

function findBookById(bookId) {
    const book = booksData.find(book => book.id === parseInt(bookId));
    return book;
}

$(document).on("click", ".cart-btn", function() {
    const bookId = $(this).closest(".item-wrapper").data("bookid");
    const book = findBookById(bookId);
    const existingCartItem = cartItems.find(item => item.id === book.id); // Check if the book is already in the cart
    if (existingCartItem) {
        existingCartItem.quantity++;
    } else {
        book.quantity = 1;
        cartItems.push(book);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
});

$(document).on("click", ".cart-btn", function() {
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







