dojo.addOnLoad(
  function(){
	
	NW.objects = [];
	//NW.baseURL = 'http://radiant-wind-119.heroku.com/';
	NW.baseURL = 'http://localhost:3000/';
	
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
	
	$( "#accordion" ).accordion({autoHeight: false});
	
	
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
	
	$('#btn-list').bind('click', function(e){
		var diagram = Joint.dia.stringify(Joint.paper());
		console.log('start jsonp call');
		$.ajax({
			url: NW.baseURL + 'diagrams.json',
			dataType: 'jsonp',
			success: function(data) {
				console.log(data);
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
		helper: function(){
			return $('<div id="proxy" class="obj cloud"><div>Internet</div></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.cloud.create({position: {x: newX, y: newY}, label: "Internet"});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	$("#obj-vpn").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj cloud"><div>VPN</div></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.cloud.create({position: {x: newX, y: newY}, label: "VPN"});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	$("#obj-security").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj security"><div><span>Security<span></div></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.security.create({position: {x: newX, y: newY}, label: "Security"});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});

	$("#obj-multi").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj multi"></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.multi.create({position: {x: newX, y: newY}});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	$("#obj-server").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj server"></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.server.create({position: {x: newX, y: newY}});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	$("#obj-multi-server").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj multi-server"></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left,
				newY = ui.position.top - diagram.offset().top,
				networkObj = network.multiServer.create({position: {x: newX, y: newY}});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	
	$("#obj-line").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj line"></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left + 20,
				newY = ui.position.top - diagram.offset().top + 75;
				newJoint = Joint({x: newX, y: newY}, {x: newX + 50, y: newY - 50}, NW.line).register(NW.objects);
			
			Joint.dia.registerJoint(newJoint);
		}
	});
	
	$("#obj-circle").draggable({
		revert: true,
		revertDuration: 0,
		helper: function(){
			return $('<div id="proxy" class="obj circle"></div>');
		},
		appendTo: 'body',
		stop: function(event, ui) {
			var diagram = $('#diagram'),
				newX = ui.position.left - diagram.offset().left + 45,
				newY = ui.position.top - diagram.offset().top + 45,
				networkObj = network.circle.create({position: {x: newX, y: newY}});

			NW.objects.push(networkObj);

			NW.registerJoints();
		}
	});
	
	var network = Joint.dia.network;
	Joint.paper("diagram", '100%', 600);

});