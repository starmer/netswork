dojo.addOnLoad(
  function(){
	
	NW.objects = []
	
	$('#btn-line').bind('click', function(e){
		var newJoint = Joint({x: 50, y: 100}, {x: 100, y: 50}, NW.line).register(all);
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
			  label: "object 3"
			});
		}
	});
	
	
	
	var network = Joint.dia.network;
	Joint.paper("diagram", '100%', 600);
	console.log(Joint.dia.registeredJoints().length);

	var s1 = network.cloud.create({
	  position: {x: 120, y: 70},
	  label: "object 1"
	});
	
	console.log(Joint.dia.registeredJoints().length);
	
	var s2 = network.cloud.create({
	  position: {x: 250, y: 100},
	  label: "object 2"
	});
	
	console.log(Joint.dia.registeredJoints().length);
	
	var s3 = network.cloud.create({
	  position: {x: 275, y: 175},
	  label: "object 3"
	});

	console.log(Joint.dia.registeredJoints().length);

	var all = [s1, s2, s3];

	s1.joint(s2, NW.line).register(all);
	
	s3.joint({x:300,y:300}, NW.line).register(all);

	console.log(Joint.dia.registeredJoints().length);

});