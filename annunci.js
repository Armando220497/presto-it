fetch('./annunci.json')
    .then((response) => response.json())
    .then((data) => {
        // Sort data by price in ascending order
        data.sort((a, b) => a.price - b.price);

        let radioWrapper = document.querySelector('#radioWrapper');
        let cardWrapper = document.querySelector('#cardWrapper');

        // Function to create radio buttons
        function radioCreate() {
            let categories = data.map((annuncio) => annuncio.category);
            let uniqueCategories = Array.from(new Set(categories));
            uniqueCategories.unshift('Tutti'); // Add 'Tutti' category as the first option

            uniqueCategories.forEach((category) => {
                let div = document.createElement('div');
                div.classList.add('form-check');
                div.innerHTML = `<input class="form-check-input" type="radio" name="categories"
            id="${category}">
            <label class="form-check-label" for="${category}">
            ${category}
            </label>`;
                radioWrapper.appendChild(div);
            });

            // Default select the 'Tutti' radio button
            document.querySelector('#Tutti').checked = true;
        }
        radioCreate();

        // Function to truncate long words
        function truncateWord(string) {
            if (string.length > 15) {
                return string.split(' ')[0] + '...';
            } else {
                return string;
            }
        }

        // Function to display cards
        function showCards(array) {
            cardWrapper.innerHTML = ''; // Clear previous cards
            array.forEach((annuncio, i) => {
                let div = document.createElement('div');
                div.classList.add('card-custom');
                div.innerHTML = `<img src="https://picsum.photos/300?random=${i}" alt="immagine casuale" class="img-fluid img-card"> 
                <p class="h3" title="${annuncio.name}">${truncateWord(
                    annuncio.name
                )}</p>
                <p class="h5">${annuncio.category}</p>
                <p class="lead">${annuncio.price} €</p>`;

                cardWrapper.appendChild(div);
            });
        }

        showCards(data);

        // Category filter
        let radioButtons = document.querySelectorAll('.form-check-input');

        function filterByCategory(array) {
            let selectedRadio = Array.from(radioButtons).find(
                (bottone) => bottone.checked
            );
            let categoria = selectedRadio ? selectedRadio.id : 'Tutti';

            if (categoria != 'Tutti') {
                // Filter by selected category if not 'Tutti'
                let filtered = array.filter((annuncio) => annuncio.category === categoria);
                return filtered;
            } else {
                // Return all if 'Tutti' is selected
                return array;
            }
        }

        radioButtons.forEach((button) => {
            button.addEventListener('click', () => {
                setPriceInput();
                globalFilter();
            });
        });

        // Price filter
        let PriceInput = document.querySelector('#priceInput');
        let priceValue = document.querySelector('#priceValue');

        function setPriceInput() {
            let prices = filterByCategory(data).map((annuncio) => +annuncio.price);
            prices.sort((a, b) => a - b);
            let maxPrice = Math.ceil(prices.pop());
            PriceInput.max = maxPrice;
            PriceInput.value = maxPrice;
            priceValue.innerHTML = maxPrice;
        }

        setPriceInput();

        function filterByPrice(array) {
            return array.filter((annuncio) => +annuncio.price <= PriceInput.value);
        }

        PriceInput.addEventListener('input', () => {
            priceValue.innerHTML = PriceInput.value;
            globalFilter();
        });

        // Word filter
        let wordInput = document.querySelector('#wordInput');

        function filterByWord(array) {
            return array.filter((annuncio) =>
                annuncio.name.toLowerCase().includes(wordInput.value.toLowerCase())
            );
        }

        wordInput.addEventListener('input', () => {
            globalFilter();
        });

        // Combine filters
        function globalFilter() {
            let filteredByCategory = filterByCategory(data);
            let filteredByPrice = filterByPrice(filteredByCategory);
            let filteredByWord = filterByWord(filteredByPrice);

            showCards(filteredByWord);
        }
    });
