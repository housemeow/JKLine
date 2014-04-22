var app = angular.module("JKLine", ['ionic']);

app.config( function($stateProvider, $urlRouterProvider) {
	$stateProvider
	    .state('tab', {
	        url: "/tab",
	        abstract: true,
	        templateUrl: "templates/tab.html"
	    })
	    .state('login', {
	    	url: '/login',
	        templateUrl: 'templates/login.html',
	        controller: 'loginController'
	    })
	    .state('signup', {
	    	url: '/signup',
	    	templateUrl: 'templates/signup.html',
			controller: 'signupController'
	    })
	    .state('tab.messageLog', {
	          url: '/messageLog',
	          views: {
	              'tab-messageLog': {
	                   templateUrl: 'templates/messageLog.html',
	                   controller: 'messageLogController'
	              }
	          }
		})
		.state('tab.friendList', {
          url: '/friendList',
          views: {
              'tab-friendList': {
                   templateUrl: 'templates/friendList.html',
                   controller: 'friendListController'
              }
          }
	    })
	    .state('tab.addFriend', {
	          url: '/addFriend',
	          views: {
	              'tab-addFriend': {
	                   templateUrl: 'templates/addFriend.html',
	                   controller: 'addFriendController'
	              }
	          }
	    })
	    .state('tab.setting', {
	          url: '/setting',
	          views: {
	              'tab-setting': {
	                   templateUrl: 'templates/setting.html',
	                   controller: 'settingController'
	              }
	          }
	    })
	    .state('chatRoom', {
	    	url: '/chatRoom',
	    	templateUrl: 'templates/chatRoom.html',
			controller: 'chatRoomController'
	    });
	$urlRouterProvider.otherwise("/login");
});