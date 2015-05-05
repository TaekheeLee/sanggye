var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	        document.addEventListener("deviceready", this.onDeviceReady, false);
	    } else {
	        this.onDeviceReady();
	    }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        this.getList();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    },
    
    getList: function(){
    	alert("getList");
    	var listColumn      = ['uid','thumbnail','number','regno','owner','job','worship','type'];
      	var lstQuery    = new Built.Query('Park');
        lstQuery        = lstQuery.skip(0);
        lstQuery        = lstQuery.limit(20);
        lstQuery        = lstQuery.descending('updated_at');
        lstQuery        = lstQuery.only(listColumn);
        lstQuery.exec().
            onSuccess(function(parks) {
                alert(parks.length);
        });
    }
    
};

app.initialize();

