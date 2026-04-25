const MovingAverage = require('../src/MovingAverage');
const MedianFilter = require('../src/MedianFilter');
const AdaptiveFilter = require('../src/AdaptiveFilter');

const chalk = {
    green: (t) => `\x1b[32m${t}\x1b[0m`,
    red: (t) => `\x1b[31m${t}\x1b[0m`,
    yellow: (t) => `\x1b[33m${t}\x1b[0m`,
    cyan: (t) => `\x1b[36m${t}\x1b[0m`
};

function runTest(name, fn) {
    console.log(chalk.cyan(`Running: ${name}`));
    try {
        fn();
        console.log(chalk.green(`  [PASS] ${name}`));
        return true;
    } catch (e) {
        console.log(chalk.red(`  [FAIL] ${name}: ${e.message}`));
        return false;
    }
}

function assertEquals(actual, expected, message) {
    if (Math.abs(actual - expected) > 0.01) {
        throw new Error(`${message} | Expected ${expected}, got ${actual}`);
    }
}

// --- Task 1: Moving Average Rise Time ---
function testMovingAverage() {
    const filter = new MovingAverage(5);
    const input = [0, 0, 0, 0, 0, 10, 10, 10, 10, 10];
    const expectedOutputs = [0, 0, 0, 0, 0, 2, 4, 6, 8, 10]; // For N=5
    
    input.forEach((val, i) => {
        const result = filter.update(val);
        // We only check once the step starts (index 5 onwards)
        if (i >= 5) {
            assertEquals(result, expectedOutputs[i], `Step index ${i-5}`);
        }
    });
}

// --- Task 2: Median Filter Spike Rejection ---
function testMedianFilter() {
    const filter = new MedianFilter(3);
    const input = [10, 10, 10, 1000, 10, 10];
    const outputs = input.map(v => filter.update(v));
    
    // The value 1000 should be filtered out by a median filter of window 3
    assertEquals(outputs[3], 10, "Spike at index 3 was not rejected");
}

// --- Task 3: Adaptive Filter ---
function testAdaptiveFilter() {
    const filter = new AdaptiveFilter(0.1, 0.9);
    // On a large step, error is large, so alpha should be large (fast response)
    // On steady state, error is small, so alpha should be small (smooth)
    
    const result1 = filter.update(100); // Initial
    const result2 = filter.update(110); // Small change
    const result3 = filter.update(500); // Large step
    
    if (result1 === result2 && result2 === result3) {
        throw new Error("Filter not implemented (returning same value)");
    }
    
    // We expect some difference in tracking speed if implemented correctly
    // This is a soft check
    console.log(chalk.yellow("  (Soft check: Ensure filter is not a static LPF)"));
}

console.log(chalk.cyan("=== Classroom Auto-Grading System ===\n"));

let passedCount = 0;
const tests = [
    { name: "Task 1: Moving Average Logic", fn: testMovingAverage },
    { name: "Task 2: Median Filter Spike Rejection", fn: testMedianFilter },
    { name: "Task 3: Adaptive Filter Implementation", fn: testAdaptiveFilter }
];

tests.forEach(t => {
    if (runTest(t.name, t.fn)) passedCount++;
});

console.log("\n" + chalk.cyan("Summary:"));
console.log(`${passedCount} / ${tests.length} tests passed.`);

if (passedCount < tests.length) {
    process.exit(1);
} else {
    process.exit(0);
}
