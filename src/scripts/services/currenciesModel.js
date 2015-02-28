//CurrencyModel Object constructor
expenseTrackerAppModule.service('currenciesModel', function () {
  'use strict';

  var currencies = [],
    currency = {
      id: 0,
      name: '',
      sign: '',
      token: '',
      position: ''
    };

  // available currencies
  currencies.push(
    {
      id: 0,
      name: 'Euro',
      sign: '€',
      token: 'EUR',
      position: 'right'
    },
    {
      id: 1,
      name: 'US Dollar',
      sign: '$',
      token: 'USD',
      position: 'left'
    },
    {
      id: 2,
      name: 'Swedish Kronor',
      sign: 'kr',
      token: 'SEK',
      position: 'right'
    },
    {
      id: 3,
      name: 'Japanese Yen',
      sign: '¥',
      token: 'JPY',
      position: 'right'
    },
    {
      id: 4,
      name: 'British Pound',
      sign: '£',
      token: 'GBP',
      position: 'left'
    },
    {
      id: 5,
      name: 'Swiss Franc',
      sign: 'SFr',
      token: 'CHF',
      position: 'right'
    },
    {
      id: 6,
      name: 'Canadian Dollar',
      sign: '$',
      token: 'CAD',
      position: 'left'
    },
    {
      id: 7,
      name: 'Australian Dollar',
      sign: '$',
      token: 'AUD',
      position: 'left'
    },
    {
      id: 8,
      name: 'New Zealand Dollar',
      sign: '$',
      token: 'NZD',
      position: 'left'
    },
    {
      id: 9,
      name: 'South African Rand',
      sign: 'R',
      token: 'ZAR',
      position: 'right'
    }
  );

  return {

    getCurrenciesList : function () {
      return currencies;
    },

    getCurrencyById : function (currencyId) {
      for (var key in currencies) {
        if (currencies[key].id === currencyId) {
          return currencies[key];
        }
      }
    }
    
  };
});