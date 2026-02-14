let threshold = 400;
let co2Data = [];
let labels = [];
let fanOn = false;

const ctx = document.getElementById('co2Chart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'CO₂ Level',
            data: co2Data,
            borderColor: '#3b82f6',
            fill: false,
            tension: 0.3
        }]
    }
});

function simulateCO2() {
    let value = Math.floor(Math.random() * 600);
    let time = new Date().toLocaleTimeString();

    labels.push(time);
    co2Data.push(value);

    if (labels.length > 10) {
        labels.shift();
        co2Data.shift();
    }

    chart.update();

    documen
