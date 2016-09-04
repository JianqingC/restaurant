var Dispatcher = require('flux').Dispatcher;
var locDispatcher = new Dispatcher();

locDispatcher.handleViewAction = function(action){
	this.dispatch({
		source: "View_Action",
		action: action
	});
}