const form = document.getElementById('converterForm');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const convertedAmount = document.getElementById('covertedAmount');
const toCurrency = document.getElementById('toCurrency');
const loading = document.querySelector('.loading');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const button = document.getElementById('converterBtn');
const API_URL = 'https://api.exchangerate-api.com/v4/latest'

async function convertMoney() {
    loading.style.display = 'block';
    error.style.display = 'none';
    result.style.display = 'none';
    button.style.display = 'none';
    
    try {
        const response = await fetch(`${API_URL}/${fromCurrency.value}`);
        const data = await response.json();
        const rate = data.rates[toCurrency.value];
        const convertedValue = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedValue;

        result.innerHTML = `
            <p style="font-size: 1.4rem;">
                ${amount.value} ${fromCurrency.value} está valendo atualmente ${convertedAmount.value} ${toCurrency.value}
            </p>
            <p style="font-size: 0.8rem; opacity: 0.8; margin-top: 10px;">
                Taxa de conversão: 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
            </p>
        `;

        setTimeout(() => {
            result.style.display = 'block';
            button.style.display = 'block';
            loading.style.display = 'none';
        }, 1000);

        
    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
        error.innerHTML = `<p>Erro ao converter moeda. Por favor, tente novamente.</p>`;
        button.style.display = 'block';
    }

}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    convertMoney();
})