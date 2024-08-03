fetch('./annunci.json').then((response) => response.json()).then((data) => {
    data.sort((a, b) => a.price - b.price);
    let radioWrapper = document.querySelector('#radioWrapper');
    let cardWrapper = document.querySelector('#cardWrapper');

    function radioCreate() {
        let categories = data.map((annuncio) => annuncio.category);
        let uniqueCategories = Array.from(new Set(categories));

        uniqueCategories.forEach((category) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = `<input class="form-check-input" type="radio" name="categories"
        id="${category}">
        <label class="form-check-label" for="flexRadioDefault1">
        ${category}
        </label>`;
            radioWrapper.appendChild(div);
        });
    }
    radioCreate();

    // tronca le parole

    function truncateWord(string) {
        if (string.length > 15) {
            return string.split(' ')[0] + '...';
        } else {
            return string;
        }
    }

    // cards
    function showCards(array) {
        cardWrapper.innerHTML = '';
        array.forEach((annuncio, i) => {
            let div = document.createElement('div');
            div.classList.add('card-custom');
            div.innerHTML =
                `<img src="https://picsum.photos/300?random=${i}" alt="immagine casuale" class="img-fluid img-card"> 
                <p class="h3" title="${annuncio.name}">${truncateWord(annuncio.name)}</p>
                <p class="h5">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>`;

            cardWrapper.appendChild(div);

        });
    }

    showCards(data);

    // filtro per categorie

    function filterByCategory(categoria) {
        if (categoria != 'All') {
            let filtered = data.filter((annuncio) => annuncio.category == categoria);
            showCards(filtered);

        } else {
            showCards(data);
        }
    }

    let radioButtons = document.querySelectorAll('.form-check-input');

    radioButtons.forEach((button) => {
        button.addEventListener('click', () => {
            filterByCategory(button.id);
        });
    });

    // filtro per prezzo

    let PriceInput = document.querySelector('#priceInput');
    let priceValue = document.querySelector('#priceValue');

    function setPriceInput() {
        let prices = data.map((annuncio) => +annuncio.price);
        prices.sort((a, b) => a - b);
        let maxPrice = Math.ceil(prices.pop());
        PriceInput.max = maxPrice;
        PriceInput.value = maxPrice;
        priceValue.innerHTML = maxPrice;
    }

    setPriceInput();

    function filterByPrice() {
        let filtered = data.filter((annuncio) => +annuncio.price <= PriceInput.value);
        showCards(filtered);
    }

    PriceInput.addEventListener('input', () => {
        priceValue.innerHTML = PriceInput.value;
        filterByPrice();
    });

    let wordInput = document.querySelector('#wordInput');

    // filtro per parola

    function filterByWord(parola) {
        let filtered = data.filter((annuncio) =>
            annuncio.name.toLowerCase().includes(parola.toLowerCase()) // Aggiungi le parentesi a toLowerCase
        );
        showCards(filtered);
    }

    wordInput.addEventListener('input', () => {
        filterByWord(wordInput.value);
    });

});
