const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const dropdownParents = document.querySelectorAll('.has-dropdown');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
})

dropdownParents.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    })
})