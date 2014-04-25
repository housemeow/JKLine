app.controller('addFriendController',function($scope, $http, JKLineDB){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";
	$scope.friend = {};
	var member = {};
	$scope.message = {};
	
	JKLineDB.getPreference(function(m){
		console.log("getmember="+ JSON.stringify(m));
		member = m;
	});
	
	$scope.clickAddFriend = function()
	{
		console.log("You clicked add friend button. ID:" + $scope.friend.id);
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "SendFriendInvitation",
	        data: {
	            smid:member.mid,
	            rid: $scope.friend.id
	        }
	    }).success(function(response, status, headers, config){
	    	if(response!="success"){
	    		
	    	}
	    	$scope.message.message = response;
			$scope.friends = response;
		});
	};
});