class CurrencyApp {
    constructor() {
        // Hard-coded list for 100% reliability
        this.currencies = [
            "USD", "EUR", "GBP", "JPY", "INR", "AUD", "CAD", "SGD", 
            "CHF", "CNY", "HKD", "NZD", "BRL", "ZAR", "MXN", "AED"
        ];

        this.from = document.getElementById('fromCurrency');
        this.to = document.getElementById('toCurrency');
        this.amount = document.getElementById('amount');
        this.result = document.getElementById('resultValue');
        this.rateLabel = document.getElementById('rateLabel');
        this.baseLabel = document.getElementById('baseLabel');

        this.init();
    }

    init() {
        // Populate dropdowns
        this.currencies.forEach(code => {
            this.from.add(new Option(code, code));
            this.to.add(new Option(code, code));
        });

        this.from.value = "USD";
        this.to.value = "INR";

        // Listeners
        document.getElementById('convertBtn').onclick = () => this.convert();
        document.getElementById('swapBtn').onclick = () => this.swap();
        
        // Initial Conversion
        this.convert();
    }

    swap() {
        const temp = this.from.value;
        this.from.value = this.to.value;
        this.to.value = temp;
        this.convert();
    }

    async convert() {
        const val = this.amount.value;
        if (val <= 0) return;

        this.result.innerText = "Loading...";

        try {
            const response = await fetch(`http://localhost:3000/api/rates/${this.from.value}`);
            const data = await response.json();
            
            const rate = data.rates[this.to.value];
            const finalValue = (val * rate).toFixed(2);

            this.result.innerText = finalValue;
            this.rateLabel.innerText = `${rate.toFixed(4)} ${this.to.value}`;
            this.baseLabel.innerText = this.from.value;
        } catch (error) {
            this.result.innerText = "Error";
            console.error(error);
        }
    }
}

new CurrencyApp();