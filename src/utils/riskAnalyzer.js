export const RiskAnalyzer = {
  // Calculate overall portfolio risk
  calculateRisk: (portfolio) => {
    if (!portfolio || portfolio.length === 0) {
      return {
        score: 0,
        level: 'Low',
        diversification: 'N/A',
        recommendation: 'Start building your portfolio'
      };
    }
    
    // Calculate volatility-based risk
    const totalValue = portfolio.reduce((sum, coin) => sum + (coin.amount * coin.price), 0);
    const volatility = portfolio.reduce((acc, coin) => {
      const coinVolatility = Math.abs(coin.change24h || 0);
      const coinWeight = (coin.amount * coin.price) / totalValue;
      return acc + (coinVolatility * coinWeight);
    }, 0);
    
    const riskScore = Math.min(100, volatility * 10);
    
    // Check diversification
    const uniqueCoins = new Set(portfolio.map(c => c.id)).size;
    const diversification = uniqueCoins >= 5 ? 'Excellent' : 
                           uniqueCoins >= 3 ? 'Good' : 
                           uniqueCoins >= 2 ? 'Fair' : 'Poor';
    
    // Generate recommendation
    let recommendation = '';
    if (riskScore > 70) {
      recommendation = 'High risk detected. Consider diversifying with stable coins.';
    } else if (riskScore > 40) {
      recommendation = 'Moderate risk. Monitor positions and set stop losses.';
    } else {
      recommendation = 'Well balanced portfolio. Continue monitoring.';
    }
    
    return {
      score: riskScore,
      level: riskScore > 70 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
      diversification,
      recommendation,
      totalValue,
      volatility: volatility.toFixed(2)
    };
  },
  
  // Calculate Value at Risk (VaR)
  calculateVaR: (portfolio, confidenceLevel = 0.95) => {
    // 95% confidence VaR calculation
    const totalValue = portfolio.reduce((sum, coin) => sum + (coin.amount * coin.price), 0);
    const dailyVolatility = 0.05; // 5% average daily volatility
    const zScore = 1.645; // 95% confidence
    
    return totalValue * dailyVolatility * zScore;
  },
  
  // Suggest portfolio rebalancing
  suggestRebalancing: (portfolio) => {
    const suggestions = [];
    const totalValue = portfolio.reduce((sum, coin) => sum + (coin.amount * coin.price), 0);
    
    portfolio.forEach(coin => {
      const weight = ((coin.amount * coin.price) / totalValue) * 100;
      if (weight > 40) {
        suggestions.push(`Reduce ${coin.symbol} exposure (currently ${weight.toFixed(1)}%)`);
      }
    });
    
    return suggestions;
  }
};