app.controller('chatRoomController',function($scope, $location, JKLineDB, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/message/";

//	var messages = [ {
//		name : "Friend1",
//		message : "hi!",
//		timeStamp : "2010-11-11 0:0:0"
//		
//	},
//	{
//		name : "Me",
//		message : "Long time no see!",
//		timeStamp : "2010-11-11 0:1:0"
//	} ];
	$scope.messageLogs = [];
    $scope.mid = ($location.search()).mid;
    $scope.name = ($location.search()).name;
    
    $scope.preference = {};


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
				JKLineDB.saveMessage(function(){
					console.log("hello i'm in chat room controller save message");
				});
				$scope.messageLogs.push(messageLog);
			    console.log("messageLog from server response[index]=" + JSON.stringify(response[index]));
			}
		});
		JKLineDB.getMessageLog({id:$scope.mid}, function(messageLogs){
			console.log("i got messageLogs!" + Json.stringify(messageLogs));
			$scope.messageLogs = messageLogs;
		});
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
    	console.log("You clicked send button." + $scope.message);
    	$scope.message = "";
    };
});