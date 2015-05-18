/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var curPage		= 1,
	itemPerPage	= 20;
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
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
	        // document.addEventListener("deviceready", this.onDeviceReady, false);
	    // } else {
	        // this.onDeviceReady();
	    // }
	    
	    //document.addEventListener("deviceready", this.onDeviceReady, false);
	    this.onDeviceReady();
	    
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.getList();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    },
    
	
	getList: function(){
    	var listColumn      = ['uid','thumbnail','number','regno','owner','job','worship','type'];
      	var lstQuery    = new Built.Query('Park');
        lstQuery        = lstQuery.skip((curPage-1)*itemPerPage);
        lstQuery        = lstQuery.limit(itemPerPage);
        lstQuery        = lstQuery.descending('updated_at');
        lstQuery        = lstQuery.only(listColumn);
        lstQuery.exec().
            onSuccess(function(parks) {
            	console.log("count:" + parks.length);
                var output = '';
                $.each(parks, function(index, value){
			        output += "<li><a href='show.html?id=" + value.get('uid') + "' data-ajax='false'>";
			        output += "<img src='data:image/jpeg;base64," + value.get('thumbnail') + "'>";
			        output += "<h2>" + value.get('number') + "</h2>";
			        output += "<p>" + value.get('owner') + value.get('job') + "/" + value.get('worship') + "<br>" + value.get('type') + "&nbsp;</p>";
			        output += "</a></li>";
			    });
			    
			    $('#car-data').append(output).listview('refresh');
        });
    }
      
};

app.initialize();



