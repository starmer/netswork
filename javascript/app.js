dojo.addOnLoad(
  function(){
	
	NW.objects = [];
	
	$('#btn-line').bind('click', function(e){
		var newJoint = Joint({x: 50, y: 100}, {x: 100, y: 50}, NW.line).register(NW.objects);
		Joint.dia.registerJoint(newJoint);
		e.preventDefault();
	});
	
	$('#btn-save').bind('click', function(e){
		alert(Joint.dia.stringify(Joint.paper()));
		console.log(Joint.dia.stringify(Joint.paper()));
		e.preventDefault();	
	});
	
	$("#obj-cloud").draggable({
		revert: true,
		revertDuration: 100,
		stop: function(event, ui) {
			var newX = ui.position.left - $('#diagram').offset().left;
			var newY = ui.position.top - $('#diagram').offset().top + 30;
			
			var cloud = network.cloud.create({
			  position: {x: newX, y:newY},
			  label: "Internet"
			});
			
			NW.objects.push(cloud);
			
			var joints = Joint.dia.registeredJoints();
			for(var i = 0; i < joints.length; i++){
				var joint = joints[i];
				joint.register(NW.objects);
			}
		}
	});
	
	var network = Joint.dia.network;
	Joint.paper("diagram", '100%', 600);

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


});