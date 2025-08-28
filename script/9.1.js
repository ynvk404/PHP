document.getElementById('tree').addEventListener('click', function(e) {
    // Kiểm tra xem phần tử được click có phải là <li> không
    if (e.target && e.target.nodeName === 'LI') {
        var listItem = e.target;
        // Toggle class 'expanded' để có thể dùng CSS thay đổi biểu tượng
        listItem.classList.toggle('expanded');

        // Tìm danh sách con <ul> bên trong <li>
        var childList = listItem.querySelector('ul');
        if (childList) {
            // Nếu có danh sách con, đổi trạng thái hiển thị
            childList.style.display = (childList.style.display === 'none') ? 'block' : 'none';
        }
    }
});
