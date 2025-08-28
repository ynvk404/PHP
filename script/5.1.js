// Khi load trang → focus vào ô Họ tên
window.onload = function () {
    document.getElementById("fullName").focus();

    // Ẩn toàn bộ lỗi khi mới load
    document.querySelectorAll('.error').forEach(err => err.classList.add('hidden'));
};

// Các ô bắt buộc → nền xanh
document.querySelectorAll("#registrationForm input[required]").forEach(el => {
    el.style.background = "#d1fae5";
});

// Enter → chuyển sang ô tiếp theo
document.querySelectorAll("#registrationForm input, #registrationForm textarea").forEach((el, idx, arr) => {
    el.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (idx + 1 < arr.length) arr[idx + 1].focus();
        }
    });
});

// Chuẩn hóa họ tên
document.getElementById("fullName").addEventListener("blur", function () {
    let name = this.value.trim().replace(/\s+/g, " ");
    name = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    this.value = name;
});

// Kiểm tra email cơ bản khi blur
document.getElementById("email").addEventListener("blur", function () {
    let emailPattern = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/;
    if (!emailPattern.test(this.value)) {
        showError(this, "Email không hợp lệ");
    } else {
        clearError(this);
    }
});

// Tự thêm "/" khi nhập ngày sinh (ddMMyyyy → dd/MM/yyyy)
document.getElementById("birthDate").addEventListener("input", function () {
    let val = this.value.replace(/[^0-9]/g, "");
    if (val.length > 2 && val.length <= 4) val = val.slice(0, 2) + "/" + val.slice(2);
    else if (val.length > 4) val = val.slice(0, 2) + "/" + val.slice(2, 4) + "/" + val.slice(4, 8);
    this.value = val;
});

// Kiểm tra mật khẩu nhập lại
document.getElementById("confirmPassword").addEventListener("blur", function () {
    let pass = document.getElementById("password").value;
    if (this.value !== pass) {
        showError(this, "Mật khẩu gõ lại không đúng");
    } else {
        clearError(this);
    }
});

// Xử lý khi bấm "Chấp nhận"
function submitForm() {
    var fullName = document.getElementById("fullName").value.trim();
    var address = document.getElementById("address").value.trim();
    var gender = document.querySelector('input[name="gender"]:checked');
    var birthDate = document.getElementById("birthDate").value;
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();
    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var note = document.getElementById("note").value.trim();

    let valid = true;

    // Kiểm tra các ô bắt buộc
    let requiredIds = ["fullName", "birthDate", "email", "username", "password", "confirmPassword"];
    requiredIds.forEach(id => {
        let el = document.getElementById(id);
        if (!el.value.trim()) {
            showError(el, "Không được bỏ trống");
            valid = false;
        } else {
            clearError(el);
        }
    });

    // Giới tính
    if (!gender) {
        showError(document.getElementById("female"), "Vui lòng chọn giới tính");
        valid = false;
    }

    // Ít nhất 1 checkbox
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var checked = Array.from(checkboxes).some(cb => cb.checked);
    if (!checked) {
        showError(document.getElementById("php"), "Vui lòng chọn ít nhất một khóa đăng ký");
        valid = false;
    }

    // Email phải là Gmail
    var emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
        showError(document.getElementById("email"), "Email phải là Gmail hợp lệ");
        valid = false;
    }

    // SĐT bắt đầu 03 và có 10 số
    var phonePattern = /^03\d{8}$/;
    if (phone && !phonePattern.test(phone)) {
        showError(document.getElementById("phone"), "Số điện thoại không hợp lệ");
        valid = false;
    } else {
        clearError(document.getElementById("phone"));
    }

    // Username ≥3 ký tự, có chữ hoa + số
    var usernamePattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{3,}$/;
    if (!usernamePattern.test(username)) {
        showError(document.getElementById("username"), "Tên dùng ≥3 ký tự, có chữ hoa & số");
        valid = false;
    }

    // Mật khẩu trùng khớp
    if (password !== confirmPassword) {
        showError(document.getElementById("confirmPassword"), "Mật khẩu không trùng khớp");
        valid = false;
    }

    if (!valid) return;

    // Hiển thị dữ liệu
    var message =
        "Họ Tên: " + fullName + "\n" +
        "Địa Chỉ: " + address + "\n" +
        "Giới Tính: " + gender.value + "\n" +
        "Ngày Sinh: " + birthDate + "\n" +
        "Email: " + email + "\n" +
        "SĐT: " + phone + "\n" +
        "Tên Dùng: " + username + "\n" +
        "Ghi Chú: " + note;
    alert("Dữ liệu đã gửi:\n\n" + message);

    // Reset form
    document.getElementById("registrationForm").reset();
    document.querySelectorAll('.error').forEach(err => err.classList.add('hidden'));
    document.getElementById("fullName").focus();
}

// Nút "Bỏ qua"
function skipForm() {
    alert("Bạn đã bỏ qua việc đăng ký.");
}

// Hiện lỗi: bỏ hidden
function showError(input, message) {
    let errDiv = input.parentNode.querySelector(".error");
    if (errDiv) {
        errDiv.textContent = message;
        errDiv.classList.remove("hidden");
    }
}

// Xóa lỗi: thêm hidden
function clearError(input) {
    let errDiv = input.parentNode.querySelector(".error");
    if (errDiv) {
        errDiv.classList.add("hidden");
    }
}
