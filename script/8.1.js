const tabs = document.querySelectorAll('.tab');

const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Xóa trạng thái active hiện tại
        tabs.forEach(t => t.classList.remove('active'));
        contents.forEach(c => c.style.display = 'none');
        // Đánh dấu tab được chọn
        tab.classList.add('active');
        // Hiển thị nội dung tương ứng
        const target = tab.getAttribute('data-tab');
        document.getElementById(target).style.display = 'block';
    });
});
// Mặc định chọn tab đầu tiên
tabs[0].click();