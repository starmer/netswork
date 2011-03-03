dojo.addOnLoad(
  function(){
	
	NW.objects = [];
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
	
	$('#btn-save').bind('click', function(e){
		alert(Joint.dia.stringify(Joint.paper()));
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