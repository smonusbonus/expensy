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