app.controller('loginController',function($scope, JKLineDB, $location, $http){
	$scope.init = function() {
	};

	$scope.member = {};
	$scope.error = {};
	
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
					var idIndexedFriends = {};
					
					JKLineDB.getPreference(function(tx, res) {
						for (var i = 0, max = res.rows.length; i < max; i++) {
							idIndexedFriends[res.rows.item(i).id] = res.rows.item(i);
						}
						console.log(JSON.stringify(idIndexedFriends));
						$scope.error.message = JSON.stringify(idIndexedFriends);
						console.log("hahahah");
					});
					
					//$location.path("/tab/friendList");
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