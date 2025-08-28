var currentImage = 1;
var interval = null; // chưa chạy

function showImage(n) {
    for (var i = 1; i <= 4; i++) {
        document.getElementById('image' + i).style.display = 'none';
    }
    document.getElementById('image' + n).style.display = 'block';
}

function jump() {
    currentImage = currentImage % 4 + 1; // chuyển ảnh 1→2→3→4→1
    showImage(currentImage);

    // nếu slideshow chưa chạy thì khởi động
    if (!interval) interval = setInterval(jump, 1000);
}


function stop() {
    clearInterval(interval);
    interval = null;
}

// Khi load trang, chỉ hiển thị ảnh đầu tiên
window.onload = function() {
    showImage(currentImage);
};
