function sortTable(columnIndex) {
    var table = document.getElementById('productTable');
    var switching = true;

    while (switching) {
        switching = false;
        var rows = table.rows;

        for (var i = 1; i < rows.length - 1; i++) {
            var shouldSwitch = false;
            var x = rows[i].getElementsByTagName("td")[columnIndex];
            var y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            // So sánh theo locale tiếng Việt
            if (x.innerHTML.localeCompare(y.innerHTML, 'vi') > 0) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


function searchTable() {
    var input = document.getElementById("searchInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("productTable");
    var tr = table.getElementsByTagName("tr");

    for (var i = 1; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td");
        var rowMatches = false;

        for (var j = 0; j < td.length; j++) {
            if (td[j]) {
                var txtValue = td[j].textContent || td[j].innerText;

                if (filter !== "" && txtValue.toUpperCase().indexOf(filter) > -1) {
                    rowMatches = true;
                    // Highlight từ khóa tìm thấy
                    var regex = new RegExp("(" + filter + ")", "gi");
                    td[j].innerHTML = txtValue.replace(regex, '<span style="background-color: yellow;">$1</span>');
                } else {
                    // Nếu không match hoặc filter rỗng, reset về nội dung gốc
                    td[j].innerHTML = txtValue;
                }
            }
        }

        // Nếu filter rỗng → hiển thị toàn bộ, không filter row
        if (filter === "") {
            tr[i].style.display = "";
        } else {
            if (rowMatches) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }

    }
}

document.getElementById("searchInput").addEventListener("keyup", searchTable);
