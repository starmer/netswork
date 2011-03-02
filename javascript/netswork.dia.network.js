(function(global){	// BEGIN CLOSURE

var Joint = global.Joint,
     Element = Joint.dia.Element,
     point = Joint.point;

	var network = Joint.dia.network = {};

network.arrow = {
    startArrow: {type: "none"},
    endArrow: {type: "none"},
    attrs: {"stroke-dasharray": "none"}
};

/**
var s1 = NW.dia.network.cloud.create({
  position: {x: 120, y: 70},
  label: "state 1",
  radius: 40,
  attrs: {
    stroke: "blue",
    fill: "yellow"
  }
});
 */
network.cloud = Element.extend({
    object: "cloud",
    module: "network",
    init: function(properties){
		var x = properties.position.x || 0;
		var y = properties.position.y || 0;
	
		// options
		var p = Joint.DeepSupplement(this.properties, properties, {
	            position: point(0,0),
	            radius: 30,
	            label: 'cloud',
	            labelOffsetX: 30/2 + 15,
	            labelOffsetY: 30/2 + 10,
	            attrs: { fill: 'white' }
	        });
		var pathString = "M70.332,18.985c-6.212-0.506-12.163,1.689-16.009,5.333c-2.465-1.782-5.655-2.998-9.337-3.297c-9.478-0.772-18.471,4.656-20.063,12.11c-0.117,0.548-0.099,1.082-0.132,1.619c-8.404,0.36-15.868,5.375-17.304,12.099c-1.423,6.664,3.562,12.68,11.402,14.438c-0.323,0.735-0.617,1.487-0.784,2.272c-1.592,7.454,4.818,14.12,14.295,14.892c4.642,0.378,9.148-0.739,12.743-2.844c2.521,3.204,6.768,5.508,12.042,5.938c7.526,0.613,14.674-2.717,18.123-7.833c1.739,0.69,3.641,1.204,5.732,1.375c9.477,0.772,18.45-4.659,20.042-12.112c0.801-3.748-0.42-7.29-3.036-9.993c2.021-1.916,3.505-4.209,4.054-6.777c1.592-7.453-4.819-14.12-14.295-14.892c-0.998-0.082-1.986-0.075-2.965-0.023C84.637,24.942,78.689,19.667,70.332,18.985z";
			this.setWrapper(this.paper.path(pathString).attr(p.attrs).translate(x,y));
		
		// inner
		this.addInner(this.getLabelElement());
    },
    getLabelElement: function(){
		var p = this.properties,
		bb = this.wrapper.getBBox(),
		t = this.paper.text(bb.x, bb.y, p.label),
		tbb = t.getBBox();
		t.translate(bb.x - tbb.x + p.labelOffsetX, bb.y - tbb.y + p.labelOffsetY);
		return t;
    }
});

/**
var s1 = NW.dia.network.cloud.create({
  position: {x: 120, y: 70},
  label: "state 1",
  radius: 40,
  attrs: {
    stroke: "blue",
    fill: "yellow"
  }
});
 */
network.security = Element.extend({
    object: "security",
    module: "network",
    init: function(properties){
		var x = properties.position.x || 0;
		var y = properties.position.y || 0;
	
		// options
		var p = Joint.DeepSupplement(this.properties, properties, {
	            position: point(0,0),
	            radius: 30,
	            label: 'firewall',
	            labelOffsetX: 30/2 + 15,
	            labelOffsetY: 30/2 + 10
	        });

			this.setWrapper(this.paper.image("images/wall.png", 0, 0, 100, 100).attr(p.attrs).translate(x,y));
		
		// inner
		this.addInner(this.getLabelElement());
    },
    getLabelElement: function(){
		var p = this.properties,
		bb = this.wrapper.getBBox(),
		t = this.paper.text(bb.x, bb.y, p.label),
		tbb = t.getBBox();
		t.translate(bb.x - tbb.x + p.labelOffsetX, bb.y - tbb.y + p.labelOffsetY);
		return t;
    }
});

})(this);	// END CLOSURE
