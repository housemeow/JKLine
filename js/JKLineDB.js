app.factory('JKLineDB', function($window, PhoneGap) {
	var db = null;
    PhoneGap.ready(function() {
        db = $window.sqlitePlugin.openDatabase({name: "JKLineDB"});
        db.transaction(function(tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS Preference(mid INTEGER, id TEXT, name TEXT, state TEXT)", []);
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

	                tx.executeSql("INSERT INTO Preference(mid, name, state) VALUES (?, ?, ?)",
	                		[member.mid, member.name, member.state],
	                    function(tx, res) {
	                			console.log("insert"+res);
	                        (onSuccess || angular.noop)();
	                    }, function (e) {
	                        console.log('新增朋友失敗，原因: ' + e.message);
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
        				function(tx, res)
        				{
    						var member = res.rows.item(0);
        					console.log("member=" + JSON.stringify(member));
                        	(onSuccess || angular.noop)(member);
        				},
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
        
        updateInvitations : function (response,onSuccess, onError)
        {
			PhoneGap.ready(function() {
	            db.transaction(function(tx) {
	                tx.executeSql("DELETE FROM Invitations WHERE 1");
	                for (var i = 0; i < response.length; i++) 
					{
		                tx.executeSql("INSERT INTO Invitations(mid, name) VALUES (?, ?)",
		                		[response[i].mid, response[i].name],
		                    onSucces, 
		                    onError
		                );
					};
                });
    		});
        },

        updateFriends: function (response, onSucces, onError) {
			PhoneGap.ready(function() {
	            db.transaction(function(tx) {
	                tx.executeSql("DELETE FROM Friends WHERE 1");
	                for (var i = 0; i < response.length; i++) 
					{
		                tx.executeSql("INSERT INTO Friends(mid, name, state) VALUES (?, ?, ?)",
		                		[response[i].mid, response[i].name, response[i].state],
		                    onSucces, 
		                    onError
		                );
					}
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
        },
        
        getTheLatestMessageLog: function (friend, onSuccess, onError) {
        	PhoneGap.ready(function() {
        		db.transaction(function(tx) {
        			tx.executeSql("SELECT * FROM MessageLog,Friends where (MessageLog.timeStamp = (select max(timeStamp) as latestTime from MessageLog where mid = ?)) and (friend.mid = MessageLog.mid)", [friend.mid],
	        			onSuccess,
        				onError
    				);
            	});
            });
        },
        
        getMessageLog: function (friend, onSuccess, onError) {
        	PhoneGap.ready(function() {
        		db.transaction(function(tx) {
        			tx.executeSql("SELECT * FROM MessageLog, Friends WHERE MessageLog.mid = ? and Friends.mid=MessageLog.mid and Friends.mid=? order by timeStamp asc", [friend.mid, friend.mid],
    					function(tx, res)
        				{
        					console.log("friend.mid" + friend.mid);
    						messageLogs = [];
    						for (var i = 0, max = res.rows.length; i < max; i++) {
    							messageLogs.push(res.rows.item(i));
    						}
    						
        					console.log("sqlitedb messageLogs=" + JSON.stringify(messageLogs));
                        	onSuccess (messageLogs);
        				},
        				onError
    				);
            	});
            });
        },
        
        saveMessage: function (messageLog, onSuccess, onError) {
        	PhoneGap.ready(function() {
        		console.log("svaeMessage messageLog=" + JSON.stringify(messageLog));
        		db.transaction(function(tx) {
        			tx.executeSql(
	                		"INSERT INTO MessageLog(mid, message, timeStamp, messageState) VALUES (?, ?, ?, ?)",
	                		[messageLog.smid, messageLog.message, '2007-01-01 10:00:00'
, messageLog.messageState],
        				onSuccess,
        				onError
    				);
            	});
            });
        }
    };
});
