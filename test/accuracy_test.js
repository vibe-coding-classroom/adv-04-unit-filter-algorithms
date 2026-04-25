const fs = require('fs');
const MovingAverage = require('../src/MovingAverage');
const MedianFilter = require('../src/MedianFilter');
const AdaptiveFilter = require('../src/AdaptiveFilter');

const rawData = JSON.parse(fs.readFileSync('./data/sensor_noise.json', 'utf8'));

function calculateSNR(original, filtered) {
    // Simple SNR approximation: signal power / noise power
    // Here we consider the "ideal" signal to be some smoothed version or the filtered one
    // For classroom purposes, we might just compare variance
    let signalPower = 0;
    let noisePower = 0;
    
    const mean = original.reduce((a, b) => a + b, 0) / original.length;
    
    original.forEach((val, i) => {
        signalPower += Math.pow(val - mean, 2);
        noisePower += Math.pow(val - filtered[i], 2);
    });
    
    return 10 * Math.log10(signalPower / noisePower);
}

function evaluateFilter(name, filter, data) {
    const start = Date.now();
    const filtered = data.map(v => filter.update(v));
    const end = Date.now();
    
    const snr = calculateSNR(data, filtered);
    
    console.log(`--- ${name} Evaluation ---`);
    console.log(`Execution Time: ${end - start}ms`);
    console.log(`Approx. SNR Improvement: ${snr.toFixed(2)} dB`);
    console.log('--------------------------\n');
}

console.log('Starting Accuracy Tests...\n');

evaluateFilter('Moving Average (N=5)', new MovingAverage(5), rawData);
evaluateFilter('Median Filter (N=5)', new MedianFilter(5), rawData);
evaluateFilter('Adaptive Filter', new AdaptiveFilter(0.1, 0.8), rawData);
