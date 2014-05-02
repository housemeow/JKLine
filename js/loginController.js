app.controller('loginController',function($scope, JKLineDB, SettingManager, $location, $http){
	$scope.init = function() {
	};

	$scope.member = {};
	$scope.error = {};
	
	
	JKLineDB.getPreference(function(member){
		if(member!=undefined){
			$location.path('/tab/friendList');
		}
		console.log(member);
	});
	
	
	$scope.onLoginClick = function(){
		console.log("You clicked login button.");
		var id = $scope.member.id;
		var password = $scope.member.password;
		console.log("id=" +id);
		console.log("password=" +password);
		JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";
		var id = $scope.member.id;
		
		
		
		var send = $http({
            method: 'POST',
            url: JKLineRegisterUrl + "Login",
            data: {
                id: id,
                password: password,
            }
        });
		
		send.success(function(response, status, headers, config){
			console.log(response);
			
			if(response=="success"){
				console.log("登入成功");
				
				var send = $http({
		            method: 'POST',
		            url: JKLineRegisterUrl + "LoginGetMember",
		            data: {
		                id: id,
		                password: password
		            }
		        });
				
				send.success(function(response, status, headers, config){
					console.log(response);
					console.log("登入");
					$scope.error.member = JSON.stringify(response);
					JKLineDB.updatePreference(response, function(){$scope.error.text = "success";}, 
							function(){
						$scope.error.text = "error";
					});
					JKLineDB.getPreference(function(member){
						console.log("getmember="+ JSON.stringify(member));
					});
					var mid = response.mid;
					var host = SettingManager.getHost();
					var pushToken = host.token;
					var send = $http({
			            method: 'POST',
			            url: JKLineRegisterUrl + "UpdatePushToken",
			            data: {
			                mid: mid,
			                pushToken: pushToken,
			            }
			        });
					send.success(function(response, status, headers, config){});
					send.error(function(response, status, headers, config) {});
					
					
					$location.path("/tab/friendList");
				});
				
				send.error(function(response, status, headers, config) {
				    console.log("登入失敗，原因:"+response);
				    $scope.error.message = response;
				});
			}else
			{
			    $scope.error.message = response;
			}
		});
		
		send.error(function(response, status, headers, config) {
		    console.log("註冊失敗，原因:"+response);
		    $scope.error.message = response;
		});
	};
	
	$scope.onSignupClick = function(){
		console.log("You clicked register button.");
		$location.path('/signup');
	};
});