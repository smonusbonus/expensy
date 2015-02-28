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
