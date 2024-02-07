let booksData = [];
let currentIndex = 0;

function showBooks() {
    for (let i = currentIndex; i < currentIndex + 3 && i < booksData.length; i++) {
        $(".recommended-wrapper").addClass("show-animation");
        const book = booksData[i];
        $(".recommended-wrapper").append(`
            <li class="item-wrapper">
                <img src="${book.imageNum}">
                <p class="title">${book.title}</p>
            </li>
        `);
    }
    currentIndex += 3;
    if (currentIndex >= booksData.length) {
        $("#read-more-button").text("줄이기");
    }
}

async function getBook() {
    await $.ajax({
        url: "https://shopping-mall-rzdwe.run.goorm.site/books/",
        type: "GET",
        success: function(data){
            booksData = data;
            showBooks();
            $.each(data, function(index, book){
                $(".main-container").append(`
                    <li class="item-wrapper" data-bookid="${book.id}">
                        <img src="${book.imageNum}">
                        <p class="title">${book.title}</p>
                        <p class="author">${book.author}</p>
                        <div class="item-price">
                            <p class="price">${book.price}원</p>
                            <button class="cart-btn" type="button">장바구니</button>
                        </div>
                    </li>
                `);
            });
        },
        error: function(err){
            console.log(err);
        }
    });
}

$("#read-more-button").on("click", function() {
    if ($(this).text() === "줄이기") {
        $(".recommended-wrapper").empty();
        currentIndex = 0;
        showBooks();
        $(this).text("더보기");
    } else {
        showBooks();
    }
});

getBook();

