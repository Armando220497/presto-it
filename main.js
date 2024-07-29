let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar')
console.dir(logoNavbar);
window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo%20black.png'
    } else {
        navbar.classList.add('bg-black');
        navbar.classList.add('bg-yellow');
        navbar.style.height = '140px';
        links.forEach((link) => {
            link.style.color = 'var(--yellow)';

        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo%20giallo.png'
    }
});
