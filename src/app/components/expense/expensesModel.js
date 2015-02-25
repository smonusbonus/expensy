//ExpenseModel Object constructor
expenseTrackerAppModule.service('expensesModel', function ($http, categoriesModel, userModel) {
  'use strict';
  var sefl = this;
  // @TODO: use the ID from the backend / database
  var nextIDCounter = 9,
    categoryColors = categoriesModel.getAvailableColors(),
    expenses = [],
    currentExpense,
    spendingStats,

    expense = {
      amount : 0,
      time : null,
      date : null,
      location : null,
      description : null,
      categoryId : null
    };

  Date.prototype.monthDays = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
  };

  Date.prototype.getWeek = function () {
    var determinedate = new Date();
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = determinedate.getDay();
    if (D === 0) {
      D = 7;
    } 
    determinedate.setDate(determinedate.getDate() + (4 - D));
    var YN = determinedate.getFullYear();
    var ZBDoCY = Math.floor((determinedate.getTime() - new Date(YN, 0, 1, -6)) / 86400000);
    var WN = 1 + Math.floor(ZBDoCY / 7);
    return WN;
  };

  function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
      foo.push(i);
    }
    return foo;
  }

  function rangeEmpty(start, end) {
      var foo = [];
      for (var i = start; i <= end; i++) {
        foo.push('');
      }
      return foo;
  }

  return {
      
    initNewExpense : function () {
      currentExpense = expense;
      return currentExpense;
    },

    getCurrentExpense : function () {
      return currentExpense;
    },

    getExpenses : function () {
      return expenses.reverse();
    },

    getAmount : function () {
      return currentExpense.amount;
    },

    setAmount : function (newAmount) {
      currentExpense.amount = newAmount;
    },

    getCategory : function () {
      return currentExpense.category_id;
    },

    setCategory : function (newCategory) {
      currentExpense.categoryId = newCategory;
    },

    addExpenseToCollection : function (expense) {

      console.log(expense);

      var req = {
        method: 'POST',
        url: '/api/expenses/',
        data: expense
      };

      return $http(req);
    },

    removeExpenseFromCollection : function (expenseId) {
      for (var key in expenses) {
        if (expenses[key].id == expenseId) {
          expenses.splice(expenses.indexOf(expenses[key]), 1);
        }
      }
    },

    getExpenseById : function (expenseId) {
      for (var key in expenses) {
        if (expenses[key].id == expenseId) {
          return expenses[key];
        }
      }
    },

    getExpensesChronologically : function () {

      var chronologicalExpenses = expenses;

      chronologicalExpenses.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        //return new Date(b.date) - new Date(a.date);
        return b.date - a.date;
      });
      return chronologicalExpenses;
    },

    getExpensesByCategory : function () {
      var categories = categoriesModel.listCategories(),
        dataArray = [];

      for (var category in categories) {
        var sum = 0;
        for (var id in expenses) {
          if (expenses[id].category_id == category){
            sum += expenses[id].amount;
          }
        }
        dataArray[category] = {
          value : sum,
          color : categoryColors[ categories[category].color_id ].color_value
        };
      }
      return dataArray;
    },

    getExpensesByTime : function () {
      var data = {
        labels : ['Mo','Tu','We','Th','Fr','Sa','Su'],
          datasets : [
          {
                fillColor : 'rgba(220,220,220,0.5)',
            strokeColor : 'rgba(220,220,220,1)',
            pointColor : 'rgba(220,220,220,1)',
            pointStrokeColor : '#fff',
            data : this.getPreviousWeeksExpenses()
          },
          {
                  fillColor : 'rgba(151,187,205,0.5)',
                strokeColor : 'rgba(151,187,205,1)',
                pointColor : 'rgba(151,187,205,1)',
                pointStrokeColor : '#fff',
                data : this.getThisWeeksExpenses()
              }
          ]
      };

      return data;
    },

    getExpensesByBudget : function () {

      var currentDay = (new Date()).getDate(),
        budgetGrad = this.calculateAverageSpendingPerDay().optimalSpendingPerDayByBudget,
        budgetGradArray = $.map(range(1,30), function( n ) {
        return n*budgetGrad;
      });
      
      var monthlyGrad = this.calculateAverageSpendingPerDay().averageSpendingPerDay;
      var monthlyGradArray = $.map( range(1,currentDay), function( n ) {
        return n*monthlyGrad;
      });
      
      var data = {
        labels : rangeEmpty(1,30),
          datasets : [
            {
                //red color
                fillColor : 'rgba(245,49,49,0.5)',
            strokeColor : 'rgba(245,49,49,1)',
            pointColor : 'rgba(245,49,49,1)',
            pointStrokeColor : '#fff',
            data : monthlyGradArray
          },
            {
                  //blue color
                  fillColor : 'rgba(151,187,205,0.3)',
                strokeColor : 'rgba(151,187,205,1)',
                pointColor : 'rgba(151,187,205,1)',
                pointStrokeColor : '#fff',
                data : budgetGradArray
              }
          ]
      };

      return data;
    },

    getThisWeeksExpenses : function () {
      var currentDate = new Date();
      var currentWeekNumber = currentDate.getWeek();
      var expenses = this.getExpenses();
      var weekData = [0,0,0,0,0,0,0];

      for (var idx in expenses){

        if ( typeof expenses[idx].date == 'string' ){
          expenses[idx].date = new Date(expenses[idx].date);
        }

        if (expenses[idx].date.getWeek() == currentWeekNumber){
          var dayIndex = expenses[idx].date.getDay()-1;
          weekData[dayIndex] += expenses[idx].amount;
        }
      }
      return weekData;
    },

    getPreviousWeeksExpenses : function () {
      var currentDate = new Date();
      var currentWeekNumber = currentDate.getWeek()-1;
      var expenses = this.getExpenses();

      var weekData = [0,0,0,0,0,0,0];

      for (var idx in expenses){

        if ( typeof expenses[idx].date == 'string' ){
          expenses[idx].date = new Date(expenses[idx].date);
        }

        if (expenses[idx].date.getWeek() == currentWeekNumber){
          var dayIndex = expenses[idx].date.getDay()-1;
          weekData[dayIndex] += expenses[idx].amount;
        }
      }
      return weekData;

    },

    getWeeklyTotals : function () {
      var thisWeek = this.getThisWeeksExpenses();
      var lastWeek = this.getPreviousWeeksExpenses();
      var thisWeekTotal=0;
      var lastWeekTotal=0;
      for(var i in thisWeek) {
        thisWeekTotal += thisWeek[i]; 
        lastWeekTotal += lastWeek[i];
      }
      return [thisWeekTotal, lastWeekTotal];
    },

    getMonthlyTotal : function (month) {
      
      var monthlyTotal = 0,
        expenses = this.getExpenses(),
        currentDate,
        i;

      if (month === undefined) {
        currentDate = new Date();
        month = currentDate.getMonth();
      }

      for (i = 0; i < expenses.length; i++) {

        if (typeof expenses[i].date === 'string') {
          expenses[i].date = new Date(expenses[i].date);
        }
        if (expenses[i].date.getMonth() ===  month) {
          monthlyTotal += expenses[i].amount;
        }
      }
      return monthlyTotal;
    },
    
    calculateAverageSpendingPerDay : function () {
      var NO_OF_DAYS = 30;

      var userBudget = userModel.getBudget();

      // sort expenses, descending
      expenses.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
      });

      var oneMonthAgoDate = new Date();
      oneMonthAgoDate.setMonth( oneMonthAgoDate.getMonth() - 1 );

      var sumOfExpenses = 0;

      for (var i = 0; i < NO_OF_DAYS; i++) {
        if ( expenses[i] !== undefined ) {
          if ( expenses[i].date > oneMonthAgoDate ) {
            sumOfExpenses += expenses[i].amount;
          }
        }
      }

      var averageSpendingPerDay = Math.ceil( sumOfExpenses / NO_OF_DAYS );
      var optimalSpendingPerDayByBudget = Math.ceil( userBudget / NO_OF_DAYS );
      var spendingDelta = optimalSpendingPerDayByBudget - averageSpendingPerDay;

      spendingStats = { 
        'spendingDelta' : spendingDelta,
        'averageSpendingPerDay' : averageSpendingPerDay,
        'optimalSpendingPerDayByBudget' : optimalSpendingPerDayByBudget
      };

      return spendingStats;
    },

    getAverageSpendingPerDay : function () {
      return spendingStats.averageSpendingPerDay;
    },
    
    getOptimalSpendingPerDayByBudget : function () {
      return spendingStats.optimalSpendingPerDayByBudget;
    },
  
    getSavingsPerDay : function () {
      return spendingStats.spendingDelta;
    },

    getExpenseByIdFromDB : function (expenseId) {
      return $http({method: 'GET', url: '/api/expenses/' + expenseId});
    },

    getExpensesFromDB : function () {
      return $http({method: 'GET', url: '/api/expenses/'});
    }
    
  };
});
