var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	console.log("QueryString Exec," + window.location.search.substring(1) + "," + window.location.pathname + "," );
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [ query_string[pair[0]], pair[1] ];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	} 
	return query_string;
} ();
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
        console.log("uid:" + QueryString.id);
        app.getContent();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    },
    
	
	getContent: function(){
		var uid 		= QueryString.id;
    	var cntColumn  	= ['uid','thumbnail','number','regno','owner','telno','job','worship','type'];
    	var query		= new Built.Query('Park');
    	query			= query.where('uid', uid);
    	query			= query.only(cntColumn);
    	
        query.exec()
        	.then(function(park){
        		console.log("Car:" + park[0].get("regno"));
        		$('#regno').val(park[0].get("number"));
        		$('#car_id').html(
        			"(" + app.nullCheck(park[0].get("regno")) + ") " + app.nullCheck(park[0].get("number"))
        		);
        		$('#owner_job').html(park[0].get("owner") + app.checkJob(park[0].get("job")));
        		$('#telno').html(app.telFormat(park[0].get("telno")));
        		$('worship').html(app.checkWorship(park[0].get('worship')));
        	}, function(error){
        		conole.log("ERROR" + error);
        	});
    },
    
    nullCheck: function(obj){
    	return (typeof obj == "undefined")?"":obj;
    },
    
    telFormat: function(tel){
    	if(tel.length < 10) return tel;
    	if(tel.indexOf("-") > 0) return tel;
    	return tel.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, '$1-$2-$3');
    },
    
    checkJob: function(job){
    	var txt;
    	var iJob;
    	iJob = (this.nullCheck(job)==null)?0:parseInt(job);
    	switch(iJob){
    		case 1: txt ="성도님"; break;
    		case 2: txt ="집사님"; break;
    		case 3: txt ="권사님"; break;
    		case 4: txt ="장로님"; break;
    		case 5: txt ="전도사님"; break;
    		case 6: txt ="사모님"; break;
    		case 7: txt ="목사님"; break;
    		default: txt="님";	
    	}
    	return " " + txt;
    },
    
    checkWorship: function(worship){
    	var txt;
    	switch(worship){
    		case "1": txt ="1부(7시)"; break;
    		case "2": txt ="2부(8시)"; break;
    		case "3": txt ="3부(10시)"; break;
    		case "4": txt ="4부(12시)"; break;
    		case "5": txt ="5부(14시30분)"; break;
    		default: txt="";	
    	}
    	return txt;
    }
      
};

app.initialize();



