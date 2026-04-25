let chart;

async function init() {
    const response = await fetch('../data/sensor_noise.json');
    const rawData = await response.json();
    
    const ctx = document.getElementById('filterChart').getContext('2d');
    
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: rawData.map((_, i) => i),
            datasets: [
                {
                    label: 'Original Signal',
                    data: rawData,
                    borderColor: 'rgba(148, 163, 184, 0.5)',
                    borderWidth: 1,
                    pointRadius: 0,
                    fill: false
                },
                {
                    label: 'Filtered Signal',
                    data: [],
                    borderColor: '#38bdf8',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#f8fafc' }
                }
            }
        }
    });

    document.getElementById('run-btn').addEventListener('click', () => runSimulation(rawData));
}

function runSimulation(rawData) {
    const filterType = document.getElementById('filter-type').value;
    const param = parseFloat(document.getElementById('param-value').value);
    
    let filter;
    if (filterType === 'moving-average') {
        filter = new MovingAverage(param);
    } else if (filterType === 'median') {
        filter = new MedianFilter(param);
    } else {
        filter = new AdaptiveFilter(0.1, param); // Using param as maxAlpha
    }

    const filteredData = rawData.map(val => filter.update(val));
    
    chart.data.datasets[1].data = filteredData;
    chart.update();
}

window.onload = init;
