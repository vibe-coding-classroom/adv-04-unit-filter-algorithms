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

    // Calculate absolute error to determine signal volatility
    const error = Math.abs(newValue - this.lastValue);
    
    // Simple adaptive logic: more error -> higher alpha (faster response)
    // We normalize the error against a sensitivity threshold (e.g., 5.0)
    const sensitivity = 5.0;
    const factor = Math.min(error / sensitivity, 1.0);
    
    // Linear interpolation between minAlpha and maxAlpha based on factor
    const alpha = this.minAlpha + (this.maxAlpha - this.minAlpha) * factor;
    
    const filteredValue = alpha * newValue + (1 - alpha) * this.lastValue;
    this.lastValue = filteredValue;
    
    return filteredValue;
  }
}

if (typeof module !== 'undefined') {
  module.exports = AdaptiveFilter;
}
