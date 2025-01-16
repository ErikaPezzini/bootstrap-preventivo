// Seleziona gli elementi del DOM
const form = document.getElementById('form');
const serviceType = document.getElementById('lavoro');
const promoCodeInput = document.getElementById('codice');
const resultDisplay = document.getElementById('prezzo-finale');

// Prezzi orari per i diversi tipi di servizi
const hourlyRates = {
    'sviluppo backend': 20.50,
    'sviluppo frontend': 15.30,
    'analisi progettuale': 33.60
};

// Codici promozionali validi
const validPromoCodes = [
    'YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'
];

// Numero fisso di ore per ogni progetto
const fixedHours = 10; // Esempio: 10 ore fisse per ogni progetto

function calculateQuote(event) {
    event.preventDefault(); // Previene il comportamento di default del form

    // Ottiene i valori selezionati dall'utente
    const selectedService = serviceType.value;
    const promoCode = promoCodeInput.value.trim();

    // Controlla che il servizio sia valido
    if (!hourlyRates[selectedService]) {
        resultDisplay.textContent = 'Seleziona un tipo di lavoro valido.';
        return;
    }

    // Calcola il prezzo base
    const hourlyRate = hourlyRates[selectedService];
    let totalPrice = hourlyRate * fixedHours;

    // Verifica se il codice promozionale è valido
    if (promoCode && validPromoCodes.includes(promoCode)) {
        totalPrice *= 0.75; // Applica lo sconto 25%
        resultDisplay.textContent = `€ ${totalPrice.toFixed(2)}`; // Mostra il prezzo scontato
    } else if (promoCode) {
        resultDisplay.textContent = `Codice promozionale non valido.`; // Mostra il messaggio
        setTimeout(() => { // Mostra il prezzo finale dopo un po' di tempo
            resultDisplay.textContent = `€ ${totalPrice.toFixed(2)}`; // Mostra il prezzo senza sconto
        }, 1000); // Dopo 1 secondo, aggiorna il prezzo finale
    } else {
        // Mostra il prezzo senza sconto se non è stato inserito alcun codice
        resultDisplay.textContent = `€ ${totalPrice.toFixed(2)}`;
    }
}

// Aggiunge il listener al bottone
const calculateButton = document.getElementById('calcola-preventivo');
calculateButton.addEventListener('click', calculateQuote);