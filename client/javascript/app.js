dojo.addOnLoad(
  function(){
	
	NW.objects = [];
	NW.baseURL = 'http://radiant-wind-119.heroku.com/';
	//NW.baseURL = 'http://localhost:3000/';
	
	NW.registerJoints = function(){
		var joints = Joint.dia.registeredJoints();
		for(var i = 0; i < joints.length; i++){
			var joint = joints[i];
			joint.register(NW.objects);
		}
	}
	
	NW.createCloud = function(label, position){
		var cloud = network.cloud.create({
		  position: position,
		  label: label
		});
		
		NW.objects.push(cloud);
		
		NW.registerJoints();
	}
	
	$(document).keypress(function(e) {
	    if(NW.currentJointElement && e.which === 8){
			if(NW.currentJointElement){
				for(var i = 0; i < NW.objects.length; i++){
					if(NW.objects[i] === NW.currentJointElement){
						NW.objects.remove(i);
					}
				}
				NW.currentJointElement.remove();
				NW.currentJointElement = null;
			}
			e.preventDefault();
		}
	});
	
	
	
	$('#btn-save').bind('click', function(e){
		var diagram = Joint.dia.stringify(Joint.paper());
		console.log('start jsonp call');
		$.ajax({
			url: NW.baseURL + 'diagrams/create.json',
			dataType: 'jsonp',
			data: {'diagram[title]':'this is a title','diagram[content]':diagram, 'diagram[cookie]':'this is the cookie that allows a user to see this diagram 123jf398j4f198j23f8'},
			success: function(data) {
				console.log(data);
				alert("saved with id: " + data.diagram.id);
			}
		});
		
		console.log('end jsonp call.');
		
		e.preventDefault();	
	});
	
	NW.openModal = $('<div id="open-modal"><div class="row"><label for="diagram-id">Diagram id</label><input id="diagram-id" /></div><a class="minibutton" href="#" id="btn-open-open"><span>Open</span></a><a class="minibutton" href="#" id="btn-open-cancel"><span>Cancel</span></a></div>')
				.dialog({
					autoOpen: false,
					closeOnEscape: false,
					title: 'Open a diagram',
					modal: true
				});
				
	$('#diagram-id').keypress(function(e) {
		if(e.which === 13){
			$('#btn-open-open').click();
		}
	});
	
	$('#btn-open').click(function(e) {
		NW.openModal.dialog('open');
		e.preventDefault();
	});
	
	$('#btn-open-cancel').click(function(e) {
		NW.openModal.dialog('close');
	});
	
	$('#btn-open-open').click(function(e) {
		var diagramId = $('#diagram-id').val();
		$.ajax({
			url: NW.baseURL + 'diagrams/show/' + diagramId + '.json',
			dataType: 'jsonp',
			success: function(data){
				console.log(data);
				Joint.resetPaper();
				NW.objects = [];
				Joint.dia.parse(data.diagram.content);
				// todo create a function to loop over all of the objects on the page and add them to NW.objects
				NW.registerJoints();
				NW.openModal.dialog('close');
			}
		});
		
		e.preventDefault();
	});

	
	$('#btn-clear').bind('click', function(e){
		var shouldClear = confirm("Clear the current diagram?");
		if(shouldClear){
			Joint.resetPaper();
		}
		e.preventDefault();	
	});
	
	
	$("#obj-internet").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 30;
			NW.createCloud("Internet", {x: newX, y: newY});
		}
	});
	
	$("#obj-vpn").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 100;
			NW.createCloud("VPN", {x: newX, y: newY});
		}
	});
	
	$("#obj-security").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 180;
			var security = network.security.create({
			  position: {x: newX, y: newY},
			  label: "Security"
			});

			NW.objects.push(security);

			NW.registerJoints();
		}
	});
	
	$("#obj-multi").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 255;
			var multi = network.multi.create({
			  position: {x: newX, y: newY}
			});

			NW.objects.push(multi);

			NW.registerJoints();
		}
	});
	
	$("#obj-server").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 340;
			var server = network.server.create({
			  position: {x: newX, y: newY}
			});

			NW.objects.push(server);

			NW.registerJoints();
		}
	});
	
	$("#obj-multi-server").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 425;
			var multiServer = network.multiServer.create({
			  position: {x: newX, y: newY}
			});

			NW.objects.push(multiServer);

			NW.registerJoints();
		}
	});
	
	
	$("#obj-line").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left + 20;
			var newY = ui.position.top - $('#diagram').offset().top + 545;
			
			var newJoint = Joint({x: newX, y: newY}, {x: newX + 50, y: newY - 50}, NW.line).register(NW.objects);
			Joint.dia.registerJoint(newJoint);
		}
	});
	
	$("#obj-circle").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left + 40;
			var newY = ui.position.top - $('#diagram').offset().top + 610;
			var circle = network.circle.create({
			  position: {x: newX, y: newY}
			});

			NW.objects.push(circle);

			NW.registerJoints();
		}
	});
	
	var network = Joint.dia.network;
	Joint.paper("diagram", '100%', 600);

});