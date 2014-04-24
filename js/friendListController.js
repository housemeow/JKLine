app.controller('friendListController',function($scope, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	
	var updateFriends = function(){
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "GetFriends",
	        data: {
	            mid:1
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			$scope.friends = response;
		});
		
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "GetInvitations",
	        data: {
	            mid:1
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			$scope.friendInvitations = response;
		});
	};
	updateFriends();
	
	
	
	$scope.clickAccept = function(id)
	{
		console.log("id+"+id);
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "AgreeInvitation",
	        data: {
	            smid:id,
	            rmid:1
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			updateFriends();
		});
		console.log("You clicked accept button." + id);
	};
	
	$scope.clickReject = function(id)
	{
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "DisagreeInvitation",
	        data: {
	            smid:id,
	            rmid:1
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			updateFriends();
		});
		console.log("You clicked reject button." + id);
	};
	$scope.clickFriend = function(id)
	{
		console.log("You clicked friend in friend list." + id);
	};
});