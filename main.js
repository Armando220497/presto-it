let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar')
let spadaLaser = document.querySelector('#spada-laser')
let collapse = document.querySelector('#collapse')
let check = false

window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;

    if (scrolled > 0) {
        navbar.classList.remove('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-black');
        collapse.classList.add('bg-yellow');
        navbar.style.height = '70px';
        links.forEach((link) => {
            link.style.color = 'var(--black)';
        });
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo%20black.png'
        spadaLaser.src = 'http://127.0.0.1:5500/media/spada-nera.png'
    } else {
        logoNavbar.src = 'http://127.0.0.1:5500/media/logo%20giallo.png'
        spadaLaser.src = 'http://127.0.0.1:5500/media/spada-gialla.png'
        navbar.classList.add('bg-black');
        navbar.classList.add('bg-yellow');
        collapse.classList.remove('bg-yellow');
        collapse.classList.add('bg-black');
        navbar.style.height = '140px';
        links.forEach((link) => {
            link.style.color = 'var(--yellow)';

        });
    }
});

spadaLaser.addEventListener('click', () => {
    if (check == false) {

        spadaLaser.style.transform = 'rotate(-90deg)'
        check = true;
    } else {
        spadaLaser.style.transform = 'rotate(0deg)'
        check = false;
    }
})


// Chiamate asincrone per i number
let firstNumber = document.querySelector('#firstNumber');
let secondNumber = document.querySelector('#secondNumber')
let thirdNumber = document.querySelector('#thirdNumber')

let confirm = true;

function createInterval(n, element, time) {
    let counter = 0

    let interval = setInterval(() => {
        if (counter < n) {
            counter++
            element.innerHTML = counter;
        } else {
            clearInterval(interval);
        }
    }, time);

    setTimeout(() => {
        confirm = true
    }, 8000);
}

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && confirm) {
            createInterval(100, firstNumber, 100);
            createInterval(200, secondNumber, 50);
            createInterval(300, thirdNumber, 20);
            confirm = false;
        }
    })
});

observer.observe(firstNumber);



// swiper e recensioni

let reviews = [
    { user: 'Armando', description: 'Il piu bel sito di annunci', rank: 5 },
    { user: 'Mario', description: 'Brutta recensione', rank: 1 },
    { user: 'Giuseppe', description: 'Un sito mediocre', rank: 3 },
    { user: 'Luigi', description: 'un bel sito', rank: 5 },
]

let swiperwrapper = document.querySelector('.swiper-wrapper');


// recensioni

reviews.forEach((recensione) => {

    let div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="card-review">
        <p class="lead text-center" > ${recensione.description}</p>
            <p class="h4 text-center" > ${recensione.user}</ >
                <div class="d-flex justify-content-center star">
                 </div>
     </div > `;

    swiperwrapper.appendChild(div)

});


let stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    for (let i = 1; i <= reviews[index].rank; i++) {
        let icon = document.createElement('i')
        icon.classList.add('fa-solid', 'fa-star');
        star.appendChild(icon);
    }

    let difference = 5 - reviews[index].rank;
    for (let i = 1; i <= difference; i++) {
        let icon = document.createElement('i')
        icon.classList.add('fa-regular', 'fa-star');
        star.appendChild(icon);
    }

})








const swiper = new Swiper('.swiper', {
    // Optional parameters
    effect: "flip",
    grabCursor: true,
    loop: true,




    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    autoplay: {
        delay: 2000,
    },

});