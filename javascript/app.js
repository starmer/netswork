dojo.addOnLoad(
  function(){
	var palette = Raphael("palette", 200, 200);
	var cloud = palette.path("M 410.67959,194.3815 C 392.37515,189.47681 373.85117,195.08975 361.06312,207.28351 C 354.38189,199.25271 345.33513,193.05458 334.48394,190.1472 C 306.55725,182.66441 277.78779,199.27435 270.3048,227.20111 C 269.75493,229.25318 269.61017,231.31674 269.31528,233.36915 C 244.16592,230.75487 220.10196,246.49902 213.35064,271.69554 C 206.66103,296.6615 219.28468,322.19 241.97368,332.68633 C 240.74035,335.36078 239.59041,338.11603 238.80258,341.05587 C 231.31972,368.98263 247.94629,397.69032 275.87305,405.17311 C 289.55164,408.83877 303.37499,406.6863 314.85002,400.29682 C 321.17421,413.82629 332.96537,424.71545 348.50905,428.8801 C 370.68656,434.82265 393.19111,425.40916 405.34082,407.36649 C 410.26235,410.85061 415.73285,413.73264 421.89508,415.3841 C 449.82177,422.86689 478.52936,406.24005 486.01235,378.31329 C 489.77522,364.2703 487.44688,350.05895 480.65432,338.41184 C 487.37673,332.00174 492.63872,323.88203 495.21692,314.25995 C 502.69988,286.33286 486.07327,257.62517 458.14659,250.14238 C 455.20678,249.35502 452.26201,248.91147 449.32995,248.64237 C 451.06775,224.11827 435.30606,200.98024 410.67959,194.3815 z").attr("fill", "#FFFFFF");
	var c = palette.circle(100, 100, 50).attr({
	    fill: "hsb(.8, 1, 1)",
	    stroke: "none",
	    opacity: .5
	});
	

	
	cloud.translate(-210,-150);
	cloud.scale(.25,.25);
	
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

	var myJoint = Joint({x: 100, y: 100}, {x: 200, y: 200}, NW.line).registerForever(all);

	console.log(Joint.dia.registeredJoints().length);

	console.log(Joint.dia.stringify(Joint.paper())); 
});