dojo.addOnLoad(
  function(){
		
	NW.objects = [];
	NW.policyEditMode = false;
	
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
	
	NW.openDiagram = function(diagramId){
		$.ajax({
			url: '/diagrams/show/' + diagramId + '.json',
			dataType: 'json',
			success: function(data){
				console.log(data);
				Joint.resetPaper();
				NW.objects = [];
				Joint.dia.parse(data.diagram.content);
			}
		});
	}
	
	NW.saveDiagram = function(options){
		var diagram = Joint.dia.stringify(Joint.paper()),
			title = options.title;
			
		$.ajax({
			url: '/diagrams/create.json',
			dataType: 'json',
			data: {'diagram[title]':title, 'diagram[content]':diagram, 'diagram[shared]': options.shared},
			type: 'POST',
			success: function(data) {
				console.log(data);
				NW.saveModal.dialog('close');
				NW.shareModal.dialog('close');
			}
		});
	}
	
	NW.diagramLoader = {
		'your-diagrams': function(){
			$('#your-diagrams-list').html('<div class="loading">Loading...<div>');
			$.ajax({
				url: '/diagrams.json',
				dataType: 'json',
				success: function(data) {
					if(data.length > 0){
						var html = '<ul>';
						for(var i = 0; i < data.length; i++){
							html += '<li>';
							html += '<a href="#" onclick="NW.openDiagram(' + data[i].diagram.id + ');return false;">' 
									+ data[i].diagram.title + '</a>';
							html += '</li>';
						}
						html += '</ul>'
						$('#your-diagrams-list').html(html);
					}else{
						$('#your-diagrams-list').html('<div class="loading">None<div>');
					}
				}
			});
		},
		
		'shared-diagrams': function(){
			$('#shared-diagrams-list').html('<div class="loading">Loading...<div>');
			$.ajax({
				url: '/diagrams/shared.json',
				dataType: 'json',
				success: function(data) {
					if(data.length > 0){
						var html = '<ul>';
						for(var i = 0; i < data.length; i++){
							html += '<li>';
							html += '<a href="#" onclick="NW.openDiagram(' + data[i].diagram.id + ');return false;">' 
									+ data[i].diagram.title + '</a>';
							html += '</li>';
						}
						html += '</ul>'
						$('#shared-diagrams-list').html(html);
					}else{
						$('#shared-diagrams-list').html('<div class="loading">None<div>');
					}
				}
			});
		}
		
	}
	
	$('#accordion').accordion({
		autoHeight: false,
		active: 2,
		changestart: function(event, ui) {
			if(NW.diagramLoader[ui.newContent[0].id]){
				NW.diagramLoader[ui.newContent[0].id]();
			}
		}
	});
	
	
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
	
	NW.policiesModalView = {
		init : function(){
			$('#policies-modal').remove();
			
			$('<div id="policies-modal" class="modal">'
			+ '<div class="row clearfix">'
			+ '<div class="header-key">Key</div><div class="header-value">Value</div>'
			+ '</div>'
			+ '<a class="minibutton" href="#" id="btn-policies-save"><span>Done</span></a>'
			+ '<a class="minibutton" href="#" id="btn-policies-cancel"><span>Cancel</span></a>'
			+ '</div>').dialog({
							autoOpen: false,
							closeOnEscape: false,
							title: 'Policies',
							modal: true
						});
						
			var getKeyValueInputs = function(k, v){
				return '<div class="row key-value-pairs clearfix">'
				+ '<input class="input-key" value="' + (k || '') + '" />'
				+ '<input class="input-value" value="' + (v || '') + '" />'
				+ '<a class="minibutton add-key-value-inputs" href="#"><span>+</span></a>'
				+ '</div>';
			}
						
			var data = NW.currentJointElement.properties.data;
			if(data && data.length > 0){
				for(var i = 0; i < data.length; i++){
					var dataKey, dataValue;
					for (var x in data[i]){
						dataKey = x;
						dataValue = data[i][x];
					}
						
					var row = getKeyValueInputs(dataKey, dataValue);
						
					$('#policies-modal').find('div.row:last').after(row);
				}
			}else{
				$('#policies-modal').find('div.row:last').after(getKeyValueInputs());
			}
						
			$('#policies-modal').delegate('.add-key-value-inputs', 'click', function(e){
				$(this).parent('div.row:last').after(getKeyValueInputs());
			});
			
			$('#btn-policies-cancel').click(function(e) {
				$('#policies-modal').dialog('close');
				e.preventDefault();
			});

			$('#btn-policies-save').bind('click', function(e){
				var data = [];
				$('#policies-modal .key-value-pairs').each(function(i,el){
					var key = $(el).find('.input-key').val(),
						value = $(el).find('.input-value').val(),
						kvp = {};
						
					kvp[key + ''] = value;
					data.push(kvp);
				});
				
				NW.currentJointElement.properties.data = data;
				
				$('#policies-modal').dialog('close');
				e.preventDefault();	
			});

			$('#diagram-save-title-input').keypress(function(e) {
				if(e.which === 13){
					$('#btn-save-save').click();
				}
			});
				
		}
	}
				

	
	// Save modal
	NW.saveModal = $('<div id="save-modal" class="modal"><div class="row"><label for="diagram-save-title-input">Title</label><input id="diagram-save-title-input" /></div><a class="minibutton" href="#" id="btn-save-save"><span>Save</span></a><a class="minibutton" href="#" id="btn-save-cancel"><span>Cancel</span></a></div>')
				.dialog({
					autoOpen: false,
					closeOnEscape: false,
					title: 'Save Diagram',
					modal: true
				});
	
	
	$('#btn-save').bind('click', function(e){
		$('#diagram-save-title-input').val('');
		NW.saveModal.dialog('open');
		e.preventDefault();	
	});
	
	$('#btn-save-cancel').click(function(e) {
		NW.saveModal.dialog('close');
		e.preventDefault();
	});
	
	$('#btn-save-save').bind('click', function(e){
		NW.saveDiagram({shared: false, title: $('#diagram-save-title-input').val()});
		e.preventDefault();	
	});
	
	$('#diagram-save-title-input').keypress(function(e) {
		if(e.which === 13){
			$('#btn-save-save').click();
		}
	});
	
	// Share modal
	NW.shareModal = $('<div id="share-modal" class="modal"><div class="row"><label for="diagram-share-title-input">Title</label><input id="diagram-share-title-input" /></div><a class="minibutton" href="#" id="btn-share-share"><span>Share</span></a><a class="minibutton" href="#" id="btn-share-cancel"><span>Cancel</span></a></div>')
				.dialog({
					autoOpen: false,
					closeOnEscape: false,
					title: 'Share Diagram',
					modal: true
				});
	
	
	$('#btn-share').bind('click', function(e){
		$('#diagram-share-title-input').val('');
		NW.shareModal.dialog('open');
		e.preventDefault();	
	});
	
	$('#btn-share-cancel').click(function(e) {
		NW.shareModal.dialog('close');
		e.preventDefault();
	});
	
	$('#btn-share-share').bind('click', function(e){
		NW.saveDiagram({shared: true, title: $('#diagram-share-title-input').val()});
		e.preventDefault();	
	});
	
	$('#diagram-share-title-input').keypress(function(e) {
		if(e.which === 13){
			$('#btn-share-share').click();
		}
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