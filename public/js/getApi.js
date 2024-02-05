let booksData = [];

async function getBook() {
    await $.ajax({
        url: "https://shopping-mall-rzdwe.run.goorm.site/books/",
        type: "GET",
        success: function(data){
            booksData = data;
            $.each(data, function(index, book){
                if (index < 3) {    // recommend first 3 books in home page
                    $(".recommended-wrapper").append(`
                        <li class="item-wrapper">
                            <img src="${book.imageNum}">
                            <p class="title">${book.title}</p>
                        </li>
                    `);
                }
                $(".main-container").append(`
                    <li class="item-wrapper" data-bookid="${book.id}">
                        <img src="${book.imageNum}">
                        <p class="title">${book.title}</p>
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

getBook();
