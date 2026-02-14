async convert() {
    const val = this.amount.value;
    this.result.innerText = "Loading...";

    try {
        // We are going directly to the API, bypassing your server.js for now
        const response = await fetch(`https://open.er-api.com/v6/latest/${this.from.value}`);
        const data = await response.json();
        
        const rate = data.rates[this.to.value];
        const finalValue = (val * rate).toFixed(2);

        this.result.innerText = finalValue;
        this.rateLabel.innerText = `${rate.toFixed(4)} ${this.to.value}`;
        this.baseLabel.innerText = this.from.value;
    } catch (error) {
        this.result.innerText = "Check Connection";
        console.error("The error is:", error);
    }
}