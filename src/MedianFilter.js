class MedianFilter {
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
    const sorted = [...this.buffer].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }
}

if (typeof module !== 'undefined') {
  module.exports = MedianFilter;
}
