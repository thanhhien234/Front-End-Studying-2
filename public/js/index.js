let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

/* poster slide */
let currentPoster = 0;
const slides = document.querySelectorAll(".slider img");
function nextSlide() {
    currentPoster = (currentPoster + 1) % 3;
    for (let i = 0; i < 3; i++) {
        if (slides[i]) {
            slides[i].style.transition = "transform 0.5s ease";
            slides[i].style.transform = `translateX(-${currentPoster * 100}%)`;
        }
    }
}
setInterval(nextSlide, 2500);


//topnav active menu
var path = window.location.pathname;
var page = path.split("/").pop();

$('.topnav a').each(function() {
    var href = $(this).attr('href');
    if (page === href) {
        $(this).addClass('active');
    }
});




$(".main-container").on("click", ".title", function() {
    const index = $(this).closest(".item-wrapper").index();
    const book = booksData[index];
    $("#modalBookImage").attr("src", book.imagePath);
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

$(".main-container").on("click", ".cart-btn", function() {
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

$(".main-container").on("click", ".cart-btn", function() {
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


$(".recommended-wrapper").on("click", ".title", function() {
    const bookItem = $(this).closest('.item-wrapper');
    const bookId = bookItem.data('bookid');
    const URLSearch = new URLSearchParams();
    URLSearch.append('bookId', bookId);
    window.location.href = `detail.html?${URLSearch.toString()}`;
});








