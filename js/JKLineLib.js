app.factory('SettingManager', function($window) {
	if (!$window.localStorage['host'])
		$window.localStorage['host'] = "{}";
	return {
		setHost: function(host) {
			$window.localStorage['host'] = JSON.stringify(host);
		},
		getHost: function() {
			return JSON.parse($window.localStorage['host']);
		}
	};
});