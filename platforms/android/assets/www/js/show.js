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
	    this.onDeviceReady();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("uid:" + common.QueryString.id);
        app.getContent();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    },
	
	getContent: function(){
		var uid 		= common.QueryString.id;
    	var cntColumn  	= ['uid','number','regno','owner','telno','telno2','job','worship','type','key','car','memo'];
    	var app			= Built.App(common.bltappid());
    	var ParkClass	= app.Class('Park');
    	//var query		= new Built.Query('Park');
    	var query		= ParkClass.Query();
    	query			= query.where('uid', uid);
    	query			= query.only(cntColumn);
    	
        query.exec()
        	.then(function(park){
        		console.log("Car:" + park[0].get("regno"));
        		//$('#regno').val(park[0].get("number"));
        		$('#car_id').html(
        			"(" + common.nullCheck(park[0].get("regno")) + ") " + common.nullCheck(park[0].get("number"))
        		);
        		$('#owner_job').html(park[0].get("owner") + common.checkJob(park[0].get("job")));
        		$('#telno').html(common.telFormat(park[0].get("telno")));
        		$('#worship').html(common.checkWorship(park[0].get('worship')));
        		$('#keyImg').attr('src', 'data:image/jpeg;base64,' + park[0].get('key'));
        		$('#popKeyImg').attr('src', 'data:image/jpeg;base64,' + park[0].get('key'));
        		$('#carImg').attr('src', 'data:image/jpeg;base64,' + park[0].get('car'));
        		$('#popCarImg').attr('src', 'data:image/jpeg;base64,' + park[0].get('car'));
        		
        		$('#more_owner_job').html(park[0].get("owner") + common.checkJob(park[0].get("job")));
        		$('#more_telno').html($('#telno').html());
        		$('#more_telno2').html(common.telFormat(park[0].get("telno2")));
        		$('#more_cartype').html(park[0].get("type"));
        		$('#more_memo').html(park[0].get("memo"));
        		
        		$("#e_regno").val(park[0].get("regno"));
        		$("#e_number").val(park[0].get("number"));
        		$("#e_owner").val(park[0].get("owner"));
        		$("#e_select-job").val(park[0].get("job"));
        		$("#e_select-worship").val(park[0].get("worship"));
        		$("#e_telno").val(park[0].get("telno"));
        		$("#e_telno2").val(park[0].get("telno2"));
        		$("#e_type").val(park[0].get("type"));
        		$("#e_memo").val(park[0].get("memo"));
        		
        	}, function(error){
        		conole.log("ERROR" + error);
        	});
    },
   
   delete: function(){
   		var yn 		= confirm('삭제하시겠습니까?');
   		var uid 	= common.QueryString.id;
		if(yn){
			var App = Built.App(common.bltappid());
			var Park = App.setMasterKey(common.masterid()).Class('Park').Object;
			var park = Park(uid);
			
			park.delete()
				.then(function(){
					console.log("delete");
					window.location = "index.html";
				},function(error){
					
				});
		}
  },
  
  update: function(){
		try{
			var uid = common.QueryString.id;
			var App = Built.App(common.bltappid()).setMasterKey(common.masterid());
			var Park = App.Class('Park').Object;
			var park = Park(uid);

			park = park.set('regno',  $("#e_regno").val());
			park = park.set('number', $("#e_number").val());
			park = park.set('owner',  $("#e_owner").val());
			park = park.set('job', 	  $("#e_select-job").val());
			park = park.set('worship', $("#e_select-worship").val());
			park = park.set('telno',  $("#e_telno").val());
			park = park.set('telno2', $("#e_telno2").val());
			park = park.set('type',   $("#e_type").val());
			park = park.set('memo',   $("#e_memo").val());
			
			park.save()
				.then(function(draft){
					console.log("Update:OK");
					$('#frmEdit').submit();
				}, function(error){
					console.log("Error");
					alert(error);
				});
			
		}catch(e){
			console.log(e);
		}
		
	},
	
	takePic : function(){
		navigator.camera.getPicture(app.onSuccess, app.onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URI });
	},
	
	onSuccess : function(imageData){
		$('#testImg').attr("src","data:image/jpeg;base64," + imageData);
	},
	
	onFail : function(message){
		alert('message');
	}
   
};

app.initialize();



