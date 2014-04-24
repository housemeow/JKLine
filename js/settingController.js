app.controller('settingController',function($scope, $http, JKLineDB){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	$scope.backupPrefernce = {};

	$scope.preference = {};
	
	var updatePreference = function(){
		JKLineDB.getPreference(function(member){
			console.log("hello i'm in friend controller ="+ JSON.stringify(member));
			$scope.preference = member;
			$scope.backupPrefernce = member;
		});
	};
	updatePreference();
	
	
	$scope.error = {};
	$scope.clickEdit = function()
	{
		var name = $scope.member.name;
		var state = $scope.member.state;
		console.log("name=" + name);
		console.log("state=" + state);
		console.log("You clicked edit button.");
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "EditMember",
	        data: {
	            mid:$scope.preference.mid,
	            name:$scope.member.name,
	            state:$scope.member.state
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			if(response=="success"){
				updatePreference();
			}else
			{
				$scope.error.message = response;
			}
		});
	};
	$scope.clickRecovery = function()
	{
		var name = $scope.member.name;
		var state = $scope.member.state;
		
		console.log("name=" + name);
		console.log("state=" + state);
		console.log("You clicked edit button.");
		console.log("You clicked recovery button.");
		$scope.preference = $scope.backupPrefernce;
	};
});