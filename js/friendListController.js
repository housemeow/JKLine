app.controller('friendListController',function($scope){
	var friendInvitations = [
	    {
			mid:4,
			name:"FriendInvitation1"
		},
		{
			mid:5,
			name:"FriendInvitation2"
		},
	];
	$scope.friendInvitations = friendInvitations;
	
	var friends = [
		 {
			mid:1,
			name:"Friend1"
		 },
		 {
			mid:2,
			name:"Friend2"
		 },
		 {
			mid:3,
			name:"Friend3"
		 }
	];
	
	$scope.friends = friends;
	
});