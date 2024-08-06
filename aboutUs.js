let navbar = document.querySelector('#navbar');
let links = document.querySelectorAll('.nav-link');
let logoNavbar = document.querySelector('#logoNavbar');
let opener = document.querySelector('.opener');
let circle = document.querySelector('.circle');

// Navbar
let nav = navbar.style.backgroundColor = 'var(--blue)';
let navLinks = links.forEach((link) => {
    link.style.color = 'var(--beige)';
});

let teachers = [
    { name: 'Matteo', description: 'Docente Frontend 69', url: 'media/person.png' },
    { name: 'Marco', description: 'Docente Frontend e responsabile Hackademy', url: 'media/person1.png' },
    { name: 'Nicola', description: 'Docente Frontend e noto sex-symbol', url: 'media/person2.png' },
    { name: 'Luca', description: 'Docente Backend e giocatore di ruolo', url: 'media/person3.png' },

];

teachers.forEach((docente) => {
    let div = document.createElement('div');
    div.classList.add('moved');
    div.style.backgroundImage = `url(${docente.url})`

    circle.appendChild(div);
});

let movedDivs = document.querySelectorAll('.moved');

let check = false;

let flipCard = document.querySelector('.flip-card')


opener.addEventListener('click', () => {
    if (!check) {
        opener.style.transform = 'rotate(45deg)';
        movedDivs.forEach((moved, i) => {
            let angle = (360 * i) / movedDivs.length;
            moved.style.transform = `rotate(${angle}deg) translate(150px) rotate(-${angle}deg)`;
        });
        check = true;
    } else {
        check = false;
        opener.style.transform = '';
        movedDivs.forEach((moved) => {
            moved.style.transform = '';
        });
        flipCard.classList.add('d-none')
    }
});



let innerFace = document.querySelector(".inner-face");
let cardName = document.querySelector('#cardName');
let cardDescription = document.querySelector('#cardDescription');

movedDivs.forEach((moved, i) => {
    moved.addEventListener('click', () => {

        flipCard.classList.remove('d-none')
        let docente = teachers[i];
        innerFace.style.backgroundImage = `url(${docente.url})`;
        cardName.innerHTML = docente.name
        cardDescription.innerHTML = docente.description
    });
})
