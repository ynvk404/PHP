window.onload=function(){
    const selectAllCheckbox = document.getElementById("select-all");
    var rowCheckboxes = document.querySelectorAll('.select-row');
    var rows = document.querySelectorAll('tbody tr');

    // Xử lý sự kiện khi ô checkbox đầu thay đổi trạng thái
    selectAllCheckbox.addEventListener('change', function() {
        if (selectAllCheckbox.checked) {
            // Nếu ô checkbox đầu hàng được chọn thì thêm highlight cho tất cả các hàng
            rowCheckboxes.forEach(function(checkbox) {
            checkbox.checked = true;
            checkbox.parentNode.parentNode.classList.add('highlight');
            });

            } else {
                // Nếu ô checkbox đầu hàng bỏ chọn, loại bỏ lớp highlight cho tất cả các hàng
                rowCheckboxes.forEach(function(checkbox) {
                    checkbox.checked = false;
                    checkbox.parentNode.parentNode.classList.remove('highlight');
                });
            }
        });
        // Xử lý sự kiện checkbox hàng
    rowCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                // Nếu ô checkbox hàng được chọn, thêm highlight cho hàng tương ứng
                checkbox.parentNode.parentNode.classList.add('highlight');
            } else {
                // Nếu ô checkbox hàng bỏ chọn, loại bỏ highlight hàng tương ứng
                checkbox.parentNode.parentNode.classList.remove('highlight');
            }

            // Kiểm tra nếu tất cả ô checkbox đã được tích thì ô checkbox đầu sẽ tự động checked
            var allChecked = Array.from(rowCheckboxes).every(function(checkbox){
                return checkbox.checked;
            });
            });
    });

    // Xử lý sự kiện khi người dùng click vào hàng
    rows.forEach(function(row, index){
        row.addEventListener('click', function(){
            // Khi người dùng click vào hàng thì tích ô checkbox tương ứng
            rowCheckboxes[index].checked = !rowCheckboxes[index].checked;

            var allChecked = Array.from(rowCheckboxes).every(function(checkbox){
                return checkbox.checked;
            });

            selectAllCheckbox.checked = allChecked;

            if(rowCheckboxes[index].checked){
                row.classList.add('highlight');
            }
            else{
                row.classList.remove('highlight');
            }

        })
    })

}