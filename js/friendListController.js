app.controller('friendListController',function($scope, $http, JKLineDB, PhoneGap){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	$scope.preference = {};
	JKLineDB.getPreference(function (member){
		$scope.preference = member;
		console.log("member.mid="+ $scope.preferece.mid);
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
			PhoneGap.ready(function() {
	            db.transaction(function(tx) {
	                tx.executeSql("DELETE FROM Friend WHERE 1");
	                for (var i = 0; i < response.length; i++) 
					{
		                tx.executeSql("INSERT INTO Friend(mid, name, state) VALUES (?, ?, ?)",
		                		[response[i].mid, response[i].name, response[i].state],
		                    onSucces, 
		                    onError
		                );
					}
                });
    		});
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
			PhoneGap.ready(function() {
	            db.transaction(function(tx) {
	                tx.executeSql("DELETE FROM Invitation WHERE 1");
	                for (var i = 0; i < response.length; i++) 
					{
		                tx.executeSql("INSERT INTO Invitation(mid, name) VALUES (?, ?)",
		                		[response[i].mid, response[i].name],
		                    onSucces, 
		                    onError
		                );
					}
                });
    		});
			
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