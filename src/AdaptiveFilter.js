class AdaptiveFilter {
  constructor(minAlpha, maxAlpha) {
    this.minAlpha = minAlpha;
    this.maxAlpha = maxAlpha;
    this.lastValue = null;
  }

  /**
   * Update the filter with a new value and return the filtered result.
   * @param {number} newValue 
   * @returns {number}
   */
  update(newValue) {
    if (this.lastValue === null) {
      this.lastValue = newValue;
      return newValue;
    }

    // TODO: Implement adaptive alpha logic
    // Hint: Calculate error between newValue and lastValue to adjust alpha
    let alpha = this.maxAlpha; 
    let filteredValue = alpha * newValue + (1 - alpha) * this.lastValue;
    
    this.lastValue = filteredValue;
    return filteredValue;
  }
}

if (typeof module !== 'undefined') {
  module.exports = AdaptiveFilter;
}
