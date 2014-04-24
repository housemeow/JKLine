app.controller('friendListController',function($scope, $http, JKLineDB, PhoneGap){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	$scope.preference = {};
	

	JKLineDB.getPreference(function(member){
		console.log("hello i'm in friend controller ="+ JSON.stringify(member));
		$scope.preference = member;
		updateFriends();
	});
	
	var updateFriends = function(){
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "GetFriends",
	        data: {
	            mid:$scope.preference.mid
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			$scope.friends = response;
			JKLineDB.updateFriends(response);
		});
		
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "GetInvitations",
	        data: {
	            mid:$scope.preference.mid
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			$scope.friendInvitations = response;
			JKLineDB.updateInvitations(response);
			
			
		});
	};
	
	$scope.clickAccept = function(id)
	{
		console.log("id+"+id);
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "AgreeInvitation",
	        data: {
	            smid:id,
	            rmid:$scope.preference.mid
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
	            rmid:$scope.preference.mid
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