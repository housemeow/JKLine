app.controller('chatRoomController',function($scope, $location){
	var messages = [ {
		name : "Friend1",
		text : "hi!"
	},
	{
		name : "Me",
		text : "Long time no see!"
	} ];
	$scope.messages = messages;
    $scope.mid = ($location.search()).mid;
    $scope.name = ($location.search()).name;
    $scope.clickSend = function()
    {
    	console.log("You clicked send button." + $scope.message);
    	$scope.message = "";
    };
});