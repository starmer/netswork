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
		console.log(Joint.dia.stringify(Joint.paper()));
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
	
	
	$("#obj-line").draggable({
		revert: true,
		revertDuration: 0,
		stop: function(event, ui) {
			console.log("offset: ", $('#diagram').offset(), ' event: ', event, 'ui: ', ui);
			var newX = ui.position.left - $('#diagram').offset().left + 30;
			var newY = ui.position.top - $('#diagram').offset().top + 330;
			
			var newJoint = Joint({x: newX, y: newY}, {x: newX + 50, y: newY - 50}, NW.line).register(NW.objects);
			Joint.dia.registerJoint(newJoint);
		}
	});
	
	var network = Joint.dia.network;
	Joint.paper("diagram", '100%', 600);

/*
	var s1 = network.cloud.create({
	  position: {x: 120, y: 70},
	  label: "Internet"
	});
	
	var s2 = network.cloud.create({
	  position: {x: 250, y: 100},
	  label: "Internet"
	});
	
	var s3 = network.cloud.create({
	  position: {x: 275, y: 175},
	  label: "Internet"
	});

	NW.objects.push(s1, s2, s3);

	s1.joint(s2, NW.line).register(NW.objects);
	
	s3.joint({x:300,y:300}, NW.line).register(NW.objects);
*/

});