app.controller('messageLogController',function($scope){
	var messageLogs = [
	 {
		 mid:1,
		 name:"Friend1",
		 recentlyMessage: "hi!"
	 },
	 {
		 mid:2,
		 name:"Friend2",
		 recentlyMessage: "how about you?"
	 }
	 ];
	$scope.messageLogs = messageLogs;
	$scope.clickMessageLog = function(id)
	{
		console.log("You clicked messageLog." + id);
	};
});