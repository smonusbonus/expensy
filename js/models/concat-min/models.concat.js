//CategoryModel Object constructor
expenseTrackerAppModule.service('categoriesModel', function () {
	'use strict';

	// @TODO: use the ID from the backend / database
	var nextIDCounter = 6;

	var categories = [],
		category = {
			id : -1,
			title : '',
			color_id : '',
			icon : '',
			custom: null
		},
		currentCategory,
		color = {
			id : -1,
			title : '',
			initial : '',
			color_value : ''
		},
		availableColors = [];

		availableColors.push( 
		{
			id 	  : 0,
			title : 'turquoise',
			color_value : '#1abc9c'
		},{
			id 	  : 1,
			title : 'green sea',
			color_value : '#16a085'
		},{
			id 	  : 2,
			title : 'emerland',
			color_value : '#2ecc71'
		},{
			id 	  : 3,
			title : 'nephritis',
			color_value : '#27ae60'
		},{
			id 	  : 4,
			title : 'peter priver',
			color_value : '#3498db'
		},{
			id 	  : 5,
			title : 'belize hole',
			color_value : '#2980d9'
		},{
			id 	  : 6,
			title : 'sun flower',
			color_value : '#f1c40f'
		},{
			id 	  : 7,
			title : 'orange',
			color_value : '#f39c12'
		},{
			id 	  : 8,
			title : 'carrot',
			color_value : '#d35400'
		},{
			id 	  : 9,
			title : 'alazarin',
			color_value : '#e74c3c'
		},{
			id 	  : 10,
			title : 'pomegranate',
			color_value : '#c0392b'
		},{
			id 	  : 11,
			title : 'amethyst',
			color_value : '#9b59b6'
		},{
			id 	  : 12,
			title : 'grey',
			color_value : '#CCC'
		});

	// default categories
	categories.push(
		{
			id : 0,
			title : 'groceries',
			color_id : 1,
			icon : 'fa-shopping-cart',
			custom : false
		},
		{
			id : 1,
			title : 'eating out',
			color_id : 6,
			icon : 'fa-cutlery',
			custom : false
		},
		{
			id : 2,
			title : 'coffee',
			color_id : 8,
			icon : 'fa-coffee',
			custom : false
		},
		{
			id : 3,
			title : 'beer',
			color_id : 7,
			icon : 'fa-beer',
			custom : false
		},
		{
			id : 4,
			title : 'cell phone',
			color_id : 4,
			icon : 'fa-phone',
			custom : false
		},
		{
			id : 5,
			title : 'other',
			color_id : 12,
			icon : 'fa-ellipsis-h',
			custom : false
		}
	);

	return {

		initNewCategory : function () {
			currentCategory = jQuery.extend(true, {}, category);
			currentCategory.id = nextIDCounter;
			nextIDCounter = nextIDCounter + 1;
			currentCategory.custom = true;
			return currentCategory;
		},

		saveCurrentCategoryToCollection : function () {
			currentCategory.initial = currentCategory.title.charAt(0);
			categories.push(currentCategory);
		},

		removeCategoryFromCollection : function (categoryId) {
			for (var key in categories) {
				if (categories[key].id === parseInt(categoryId, 10)) {
					categories.splice(categories.indexOf(categories[key]), 1);
				}
			}
		},
		
		setCategoryColorById : function (colorId) {
			currentCategory.color_id = colorId;
		},

		getAvailableColors : function () {
			return availableColors;
		},

		listCategories : function () {
			return categories;
		},

		getCategoryById : function (categoryId) {
			for (var key in categories) {
				if (categories[key].id === categoryId) {
					return categories[key];
				}
			}
		},

		getCategoryColorById : function (colorId) {
			for (var key in availableColors) {
				if (availableColors[key].id === colorId) {
					return availableColors[key];
				}
			}
		}
	};
});

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
//ExpenseModel Object constructor
expenseTrackerAppModule.service('expensesModel', function (categoriesModel, userModel) {
  'use strict';
  var sefl = this;
  // @TODO: use the ID from the backend / database
  var nextIDCounter = 9,
    categoryColors = categoriesModel.getAvailableColors(),
    expenses = [],
    currentExpense,
    spendingStats,

    expense = {
      id : -1,
      amount : 0.0,
      time : null,
      date : null,
      location : null,
      description : null,
      category_id : null
    };
  // pre-defined expenses for testing
  expenses.push(
    {
      id : 0,
      amount : 123.00,
      time : '10:33:51 AM',
      date : new Date(2014, 2, 10),
      location : null,
      description : null,
      category_id : 2
    },
    {
      id : 1,
      amount : 45.00,
      time : '11:33:51 AM',
      date : new Date(2014, 2, 10),
      location : null,
      description : null,
      category_id : 2
    },
    {
      id : 2,
      amount : 301,
      time : '10:44:51 AM',
      date : new Date(2014, 2, 11),
      location : null,
      description : null,
      category_id : 3
    },
    {
      id : 3,
      amount : 21,
      time : '7:33:51 AM',
      date : new Date(2014, 2, 12),
      location : null,
      description : null,
      category_id : 1
    },
    {
      id : 4,
      amount : 79,
      time : '3:33:51 PM',
      date : new Date(2014, 2, 13),
      location : null,
      description : null,
      category_id : 3
    },
    {
      id : 5,
      amount : 103,
      time : '8:03:51 AM',
      date : new Date(2014, 2, 15),
      location : null,
      description : null,
      category_id : 0
    },
    {
      id : 6,
      amount : 73,
      time : '10:33:51 AM',
      date : new Date(2014, 2, 15),
      location : null,
      description : null,
      category_id : 2
    },
    {
      id : 7,
      amount : 137,
      time : '10:33:51 AM',
      date : new Date(2014, 2, 16),
      location : null,
      description : null,
      category_id : 4
    },
    {
      id : 8,
      amount : 89,
      time : '10:33:51 AM',
      date : new Date(2014, 2, 17),
      location : null,
      description : null,
      category_id : 1
    }
  );

  Date.prototype.monthDays = function () {
    var d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
    return d.getDate();
  };

  Date.prototype.getWeek = function () {
    var determinedate = new Date();
    determinedate.setFullYear(this.getFullYear(), this.getMonth(), this.getDate());
    var D = determinedate.getDay();
    if(D == 0) D = 7;
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
      currentExpense = jQuery.extend(true, {}, expense);
      currentExpense.id = nextIDCounter;
      nextIDCounter = nextIDCounter + 1;
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
      currentExpense.category_id = newCategory;
    },

    // higher level functions

    addExpenseToCollection : function (expense) {
      // return detailViewId;
      expenses.push(currentExpense);
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
      }
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
      }
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
        if (expenses[i]['date'].getMonth() ===  month) {
          monthlyTotal += expenses[i]['amount'];
        }
      }
      return monthlyTotal;
    },
    
    calculateAverageSpendingPerDay : function () {
      var NO_OF_DAYS = 30;

      var userBudget = userModel.getBudget();

      // sort expenses, descending
      expenses.sort(function(a,b){
        return new Date(b['date']) - new Date(a['date']);
      });

      var oneMonthAgoDate = new Date();
      oneMonthAgoDate.setMonth( oneMonthAgoDate.getMonth() - 1 );

      var sumOfExpenses = 0;

      for (var i = 0; i < NO_OF_DAYS; i++) {
        if ( expenses[i] !== undefined ) {
          if ( expenses[i]['date'] > oneMonthAgoDate ) {
            sumOfExpenses += expenses[i]['amount'];
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
    }
    
  };
});

//GoalModel Object constructor
expenseTrackerAppModule.service('goalsModel', function (expensesModel) {
	'use strict';

	// @TODO: use the ID from the backend / database
	var nextIDCounter = 0,
		goals = [],
		currentGoal,
		goal = {
			id : -1,
			target : '',
			description : ''
		};

	/*goals.push(
		{
			id : 0,
			target : 1000,
			description : 'Jetski'
		}, {
			id : 1,
			target : 5000,
			description : 'iPad'
		}, {
			id : 2,
			target : 2500,
			description : 'Paris'
		}
	);*/

	return {

		initNewGoal : function () {
			currentGoal = jQuery.extend(true, {}, goal);
			currentGoal.id = nextIDCounter;
			nextIDCounter = nextIDCounter + 1;
			return currentGoal;
		},

		saveCurrentGoalToCollection : function (target, description) {
      currentGoal.target = target;
      currentGoal.description = description;
			goals.push(currentGoal);
		},

		removeGoalFromCollection : function (GoalId) {
			for (var key in goals) {
				if (goals[key].id === parseInt(GoalId, 10)) {
					goals.splice(goals.indexOf(goals[key]), 1);
				}
			}
		},

		calculateDaysUntilGoalIsReached : function (target, spendingPerDay) {
			var daysUntilGoalIsReached = Math.floor(target / spendingPerDay);
			return daysUntilGoalIsReached;
		},

		getAllGoals : function () {
			var spendingStats = expensesModel.calculateAverageSpendingPerDay();

			for (var key in goals) {
				goals[key].daysUntilGoalIsReached = this.calculateDaysUntilGoalIsReached(goals[key].target, spendingStats.spendingDelta);
			}

			goals.sort(function (a, b) {
				return a.daysUntilGoalIsReached - b.daysUntilGoalIsReached;
			});

			return goals;
		}
	};
});

//UserModel Object constructor
expenseTrackerAppModule.service('knobModel', function (expensesModel) {
	'use strict';
	
	var infiniteValue,
    v,
    up,
    down,
    $ival,
    now = new Date();

  var resetKnob = function (element) {
    infiniteValue = 0;
    up = 0;
    down = 0;
    now = new Date();

    $ival = element;
	}

   var incr = function () {
		infiniteValue++;
		updateValue();
	};

	var decr = function () {
		if (expensesModel.getAmount() !== 0) {
			infiniteValue--;
			updateValue();
		}
	};

	var updateValue = function () {
		var newValue = infiniteValue;

		// YOU ARE HERE

		$ival.html( newValue );
		expensesModel.setAmount( newValue );
	};

	var changeEventHandler = function () {
		if (v > this.cv) {
			if (up) {
			  decr();
			  up = 0;
			} else {
			  up = 1;
			  down = 0;
			}
		} else {
			if (v < this.cv) {
			  if (down) {
			    incr();
			    down = 0;
			  } else {
			    down = 1;
			    up = 0;
			  }
			}
		}
		v = this.cv;
	};

	return {
		initialize : function(element) {
			resetKnob(element);

			$('.infinite').knob({
			    min: 0,
			    max: 30,
			    width: 230,
			    height: 230,
			    stopper: false,
			    cursor: 30,
			    inline: false,
			    fgColor: '#0fb2be',
			    bgColor: '#e6e6e7',
			    displayInput: false,
			    change: changeEventHandler
			});
		}
	};
});
//Back-button service
expenseTrackerAppModule.service('navigationService', function () {
  'use strict';

  return {
    goBack : function () {
      window.history.back();
    }
  };
});
//UserModel Object constructor
expenseTrackerAppModule.service('userModel', function () {
	'use strict';

	var currentUser = {
		firstName : '',
		lastName : '',
		eMailAddress : '',
		budget : 0.0,
		token : '',
		currency: 2
	};

	return {

		getCurrentUser : function () {
			return currentUser;
		},

		/* Getter and Setter */
		getFirstName : function () {
			return currentUser.firstName;
		},
		
		setFirstName : function (value) {
			currentUser.firstName = value;
		},

		getLastName : function () {
			return currentUser.lastName;
		},
		
		setLastName : function (value) {
			currentUser.lastName = value;
		},
		
		getEMailAddress : function () {
			return currentUser.eMailAddress;
		},
		
		setEMailAddress : function (value) {
			currentUser.eMailAddress = value;
		},

		getBudget : function () {
			return currentUser.budget;
		},
		
		setBudget : function (value) {
			currentUser.budget = value;
		},

		isBudgetSet : function () {
			return (currentUser.budget !== 0.0);
		},

		getCurrency : function () {
			return currentUser.currency;
		},
		
		setCurrency : function (currencyId) {
			currentUser.currency = currencyId;
		}
	};
});