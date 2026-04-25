class MovingAverage {
  constructor(windowSize) {
    this.windowSize = windowSize;
    this.buffer = [];
  }

  /**
   * Update the filter with a new value and return the filtered result.
   * @param {number} newValue 
   * @returns {number}
   */
  update(newValue) {
    this.buffer.push(newValue);
    if (this.buffer.length > this.windowSize) {
      this.buffer.shift();
    }
    const sum = this.buffer.reduce((a, b) => a + b, 0);
    return sum / this.buffer.length;
  }
}

if (typeof module !== 'undefined') {
  module.exports = MovingAverage;
}
