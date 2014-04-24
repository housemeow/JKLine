app.controller('messageLogController',function($scope, $location, JKLineDB){
	var messageLogs = [];
    $scope.mid = ($location.search()).mid;
    $scope.name = ($location.search()).name;
	
	$scope.preference = {};
	JKLineDB.getPreference(function(member){
		console.log("hello i'm in messageLog controller ="+ JSON.stringify(member));
		$scope.preference = member;
	});
	
	
	
	
	
	JKLineDB.getFriends(function(tx, res)
	{
		console.log("res.rows=" + JSON.stringify(res.rows));
		for (var i = 0, max = res.rows.length; i < max; i++) {
			var friend = res.rows.item(i);
			//cnosole.log("friend=" + JSON.stringify(friend));
			JKLineDB.getTheLatestMessageLog(friend, function(message){
				console.log("get latestMessageLog" + message);
				if(message.length>0){
					messageLogs.push(message[0]);
				}
			});
		}
	});
	
	

	
	
	$scope.messageLogs = messageLogs;
	$scope.clickMessageLog = function(id)
	{
		console.log("You clicked messageLog." + id);
	};
});