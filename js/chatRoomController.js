app.controller('chatRoomController',function($scope, $location, JKLineDB, $http){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/message/";

	$scope.messageLogs = [];
    $scope.mid = ($location.search()).mid;
    $scope.name = ($location.search()).name;
    
    $scope.preference = {};
    $scope.message = {};

    $scope.timer = {};

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
				if(messageLog.message!=""){
					JKLineDB.saveMessage(
							messageLog,
							function(){
								console.log("hello i'm in chat room controller save message");
							}, 
							function (e) {
			                    console.log('add message fail: ' + e.message);
	                });
					$scope.messageLogs.push(messageLog);
					//傳送以讀訊息
					 $http({
					        method: 'POST',
					        url: JKLineRegisterUrl + "sendMessage",
					        data: {
					            smid:$scope.preference.mid,
					            rmid:$scope.mid,
					            message:""
					        }
					 });
				}else
				{
					//對方已經看過我的訊息
					JKLineDB.readAllMessageLog();
					var i;
					for(i=0;i<$scope.messageLogs.length;i++){
						if($scope.messageLogs[i].messageState==1){
							$scope.messageLogs[i].messageState=2;
						}
					}
				}
			    console.log("messageLog from server response[index]=" + JSON.stringify(response[index]));
			}

			for(i=0;i<$scope.messageLogs.length;i++){
				if($scope.messageLogs[i].messageState==1){
					$scope.messageLogs[i].name = $scope.preference.name;
				}
				if($scope.messageLogs[i].messageState==2){
					$scope.messageLogs[i].hasBeenRead="已讀";
					$scope.messageLogs[i].name = $scope.preference.name;
				}
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
		

	    $scope.timer = window.setInterval(updateMessageLog,1000);
	};
	updatePreference();

	$scope.$on('$locationChangeStart', function(next, current) { 
		window.clearInterval($scope.timer);
		console.log("locationchant timer!!!!!");
	 });
	$scope.$on('$destroy', function(next, current) { 
		window.clearInterval($scope.timer);
		console.log("destroy timer!!!!!");
	 });

	
    
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
    		 messageLog.messageState = 1;
    		 messageLog.name = $scope.name;
    		 messageLog.timeStamp = response;
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