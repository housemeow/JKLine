var app = angular.module("JKLine", [ 'ionic' , 'PhoneGap']);

app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('tab', {
		url : "/tab",
		abstract : true,
		templateUrl : "templates/tab.html"
	}).state('login', {
		url : '/login',
		templateUrl : 'templates/login.html',
		controller : 'loginController'
	}).state('signup', {
		url : '/signup',
		templateUrl : 'templates/signup.html',
		controller : 'signupController'
	}).state('tab.messageLog', {
		url : '/messageLog',
		views : {
			'tab-messageLog' : {
				templateUrl : 'templates/messageLog.html',
				controller : 'messageLogController'
			}
		}
	}).state('tab.friendList', {
		url : '/friendList',
		views : {
			'tab-friendList' : {
				templateUrl : 'templates/friendList.html',
				controller : 'friendListController'
			}
		}
	}).state('tab.addFriend', {
		url : '/addFriend',
		views : {
			'tab-addFriend' : {
				templateUrl : 'templates/addFriend.html',
				controller : 'addFriendController'
			}
		}
	}).state('tab.setting', {
		url : '/setting',
		views : {
			'tab-setting' : {
				templateUrl : 'templates/setting.html',
				controller : 'settingController'
			}
		}
	}).state('chatRoom', {
		url : '/chatRoom',
		templateUrl : 'templates/chatRoom.html',
		controller : 'chatRoomController'
	});
	$urlRouterProvider.otherwise("/login");
});

app.run(function(SettingManager, PushNotificationsFactory) {
	var GCMSENDERID = '229215888121';
	PushNotificationsFactory(GCMSENDERID, function(token, type) 
	{
		console.log("i'm in PushNotificationFactory registered callback.");
		var host = SettingManager.getHost();
		host.token = token;
		if (type == "GCM")
			host.type = 0;
		else if (type == "APNS")
			host.type = 1;
		SettingManager.setHost(host);
	});
});