app.factory('JKLineDB', function($window, PhoneGap) {
	var db = null;
    PhoneGap.ready(function() {
        db = $window.sqlitePlugin.openDatabase({name: "JKLineDB"});
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Preference(id INTEGER, name TEXT, state TEXT)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS Friends(mid INTEGER, name TEXT, state TEXT)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS Invitations(mid INTEGER, name TEXT)", []);
            tx.executeSql("CREATE TABLE IF NOT EXISTS MessageLog(mid INTEGER, message TEXT, timeStamp DATETIME, messageState INTEGER )", []);
        });
    });
    
    return {
    	updatePreference: function (member, onSuccess, onError){
    		PhoneGap.ready(function() {
	            db.transaction(function(tx) {
	                tx.executeSql("DELETE FROM Preference WHERE 1");
	                tx.executeSql("INSERT INTO Preference(id, name, state) VALUES (?, ?, ?)",
	                [member.id, member.name, member.state],
	                    function(tx, res) {
	                		friend.id = res.insertId;
	                        (onSuccess || angular.noop)();
	                    }, function (e) {
	                        console.log('更新Preference，原因: ' + e.message);
	    	            	console.log(JSON.stringify(friend));
	                        (onError || angular.noop)(e);
	                    }
	                );
	            });
    		});
    	},
    	
    	getPreference: function (onSuccess, onError){
        	PhoneGap.ready(function() {
        		db.transaction(function(tx) {
        			tx.executeSql("SELECT * FROM Preference", [],
	        			onSuccess,
        				onError
    				);
            	});
            });
    	},
        
        getFriends: function (onSuccess, onError) {
        	PhoneGap.ready(function() {
        		db.transaction(function(tx) {
        			tx.executeSql("SELECT * FROM Friends", [],
	        			onSuccess,
        				onError
    				);
            	});
            });
        },
        
        getInvitations: function (onSuccess, onError) {
        	PhoneGap.ready(function() {
        		db.transaction(function(tx) {
        			tx.executeSql("SELECT * FROM Invitations", [],
	        			onSuccess,
        				onError
    				);
            	});
            });
        }
    };
});
