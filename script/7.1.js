window.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu2 li');
    const titleDisplay = document.getElementById('selected-title');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            const title = this.getAttribute('data-title');
            titleDisplay.textContent = `» ${title}`;
        });
    });
});
