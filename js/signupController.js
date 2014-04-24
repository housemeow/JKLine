app.controller('signupController',function($scope, $location, $http){

	$scope.member = {};
	$scope.error = {};
	
	$scope.onSignupClick = function(){
		JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";
		var id = $scope.member.id;
		var name = $scope.member.name;
		var phone = $scope.member.phone;
		var password = $scope.member.password;
		var checkPassword = $scope.member.checkPassword;
		
		
		
		var send = $http({
            method: 'POST',
            url: JKLineRegisterUrl + "Register",
            data: {
                id: id,
                name: name,
                phone: phone,
                password: password,
                checkPassword: checkPassword
            }
        });
		
		send.success(function(response, status, headers, config){
			console.log(response);
			
			if(response=="success"){
				console.log("註冊成功");
				
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
					$location.path("/tab/friendList");
				});
				
				send.error(function(response, status, headers, config) {
				    console.log("登入失敗，原因:"+response);
				});
			}else
			{
				$scope.error.message = response;
			}
		});
		
		send.error(function(response, status, headers, config) {
		    console.log("註冊失敗，原因:"+response);
		});
	};
});