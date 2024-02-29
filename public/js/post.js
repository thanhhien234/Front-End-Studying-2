async function postBook(title, price, author,description,image) {
    let formData = new FormData();
    formData.append('image', image);
    await $.ajax({
        url: `http://43.203.50.204:8080/api/books?title=${title}&price=${price}&author=${author}&description=${description}`,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(res){
           alert("책이 등록되었습니다")
        },
        error: function(err){
            console.log(err);
            alert("책이 등록 시 에러가 발생되었습니다.")
        }
    });
}
$(document).ready(function() {
    $('#image').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).siblings('.file-name-text').text(fileName ? fileName : '파일 선택');
    });
});

$('#save-add-book-btn').click(function(event) {
    event.preventDefault();
    const title = $('#title').val();
    const price = $('#price').val();
    const author = $('#author').val();
    const description = $('#description').val();
    const image = $('#image')[0].files[0];

    $('.error-message').text('');
    if (!title) {
        $('#title-error').text('*책의 제목을 입력해주세요');
    }
    if (!price) {
        $('#price-error').text('*책의 가격을 입력해주세요');
    }
    if (!author) {
        $('#author-error').text('*저자의 이름을 입력해주세요');
    }
    if (!description) {
        $('#description-error').text('*책에 대한 설명을 입력해주세요');
    }
    if (!image) {
        $('#image-error').text('*표지 사진을 등록해주세요');
    }
    let inputErr = $('.error-message').text().trim() !== '';
    if (inputErr) {
        return;
    }

    postBook(title, price, author, description, image);
});


//manage buttons
$(".add-book-btn").click(function(){
    $(".add-book-container").addClass("active");
    $(".delete-book-container").removeClass("active");
    $(".add-book-btn").addClass("active");
    $(".delete-book-btn").removeClass("active");
});

$(".delete-book-btn").click(function(){
    $(".delete-book-container").addClass("active");
    $(".add-book-container").removeClass("active");
    $(".delete-book-btn").addClass("active");
    $(".add-book-btn").removeClass("active");
});
$('.add-book-btn').trigger('click');