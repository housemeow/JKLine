app.controller('chatRoomController',function($scope, $location, JKLineDB, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/message/";

	$scope.messageLogs = [];
    $scope.mid = ($location.search()).mid;
    $scope.name = ($location.search()).name;
    
    $scope.preference = {};
    $scope.message = {};


    var updateMessageLog = function(){
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "receiveMessage",
	        data: {
	            smid:$scope.mid,
	            rmid:$scope.preference.mid
	        }
	    }).success(function(response, status, headers, config){
			console.log("messageLog from server" + JSON.stringify(response));
			var index;
			for (index = 0; index < response.length; ++index) {
				var messageLog = response[index];
				messageLog.messageState = 4;
				JKLineDB.saveMessage(
						messageLog,
						function(){
							console.log("hello i'm in chat room controller save message");
						}, 
						function (e) {
		                    console.log('add message fail: ' + e.message);
                });
				$scope.messageLogs.push(messageLog);
			    console.log("messageLog from server response[index]=" + JSON.stringify(response[index]));
			}
		});
		var friend = {mid:$scope.mid};
		JKLineDB.getMessageLog(
			friend, 
			function(member){
				//console.log("fwefe");
				console.log("i got messageLogs!");// + Json.stringify(messageLogs));
				console.log("oring messageLogs=" + JSON.stringify($scope.messageLogs));
				console.log("new member=" + JSON.stringify(member));
				if(member.length!=$scope.messageLogs.length){
					$scope.messageLogs = member;
					
				}
			},
			function(){
				console.log("abcd");
			}
			);
    };
    
	var updatePreference = function(){
		JKLineDB.getPreference(function(member){
			console.log("hello i'm in chat room controller getmember ="+ JSON.stringify(member));
			$scope.preference = member;
	        console.log("$scope.mid=" +$scope.mid);
	        console.log("$scope.preference.mid="+$scope.preference.mid);
		    updateMessageLog();
		});
		

	    window.setInterval(updateMessageLog,1000);
	};
	updatePreference();
    

    
    $scope.clickSend = function()
    {
    	console.log("You clicked send button." + $scope.message.message);
    	
    	 $http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "sendMessage",
	        data: {
	            smid:$scope.preference.mid,
	            rmid:$scope.mid,
	            message:$scope.message.message
	        }
    	 }).success(function(response, status, headers, config){
    		 
    		 

    		 var messageLog = {};//response[index];
    		 messageLog.smid = $scope.mid;
    		 messageLog.message = $scope.message.message;
    		 messageLog.messageState = 4;
    		 messageLog.name = $scope.name;
    		 JKLineDB.saveMessage(
				messageLog,
				function(){
					console.log("hello i'm in chat room controller save message");
				}, 
				function (e) {
					console.log('add message fail: ' + e.message);
			});
			$scope.messageLogs.push(messageLog);

			$scope.message.message = "";
    	 });
    };
});