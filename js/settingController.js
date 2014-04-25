app.controller('settingController',function($scope, $http, $location, JKLineDB){
	var JKLineRegisterUrl = "http://iweb.csie.ntut.edu.tw:10080/apps36/member/";

	var backupPrefernce = {};

	$scope.preference = {};
	
	var updatePreference = function(){
		JKLineDB.getPreference(function(member){
			console.log("hello i'm in friend controller ="+ JSON.stringify(member));
			$scope.preference = member;
			backupPrefernce.name = member.name;
			backupPrefernce.state = member.state;
		});
	};
	updatePreference();
	
	
	$scope.error = {};
	$scope.clickEdit = function()
	{
		console.log("You clicked edit button.");
		backupPrefernce.name = $scope.preference.name;
		backupPrefernce.state = $scope.preference.state;
		$http({
	        method: 'POST',
	        url: JKLineRegisterUrl + "EditMember",
	        data: {
	            mid:$scope.preference.mid,
	            name:$scope.preference.name,
	            state:$scope.preference.state
	        }
	    }).success(function(response, status, headers, config){
			console.log(response);
			if(response=="success"){
				JKLineDB.updatePreference($scope.preference);
			}else
			{
				$scope.error.message = response;
			}
		});
	};
	$scope.clickRecovery = function()
	{
		console.log("You clicked recovery button.");
		$scope.preference.name = backupPrefernce.name;
		$scope.preference.state = backupPrefernce.state;
		console.log("")
	};
	$scope.clickLogOut = function(){
		JKLineDB.logout();
		$location.path("/login");
	}
});