export const Analytics = {
  // Track screen views
  trackScreen: (screenName) => {
    console.log(`Screen viewed: ${screenName}`);
    // Integrate with Firebase Analytics or other service
    // analytics().logScreenView({ screen_name: screenName });
  },
  
  // Track user actions
  trackAction: (actionName, params = {}) => {
    console.log(`Action: ${actionName}`, params);
    // analytics().logEvent(actionName, params);
  },
  
  // Track coin views
  trackCoinView: (coinId, coinName) => {
    Analytics.trackAction('coin_view', {
      coin_id: coinId,
      coin_name: coinName
    });
  },
  
  // Track predictions requested
  trackPredictionRequest: (coinId) => {
    Analytics.trackAction('prediction_request', { coin_id: coinId });
  },
  
  // Track portfolio actions
  trackPortfolioAction: (action, coinId) => {
    Analytics.trackAction('portfolio_action', {
      action: action, // 'add', 'remove', 'update'
      coin_id: coinId
    });
  },
  
  // Track errors
  trackError: (errorType, errorMessage) => {
    console.error(`Error: ${errorType}`, errorMessage);
    // analytics().logEvent('error', {
    //   error_type: errorType,
    //   error_message: errorMessage
    // });
  }
};