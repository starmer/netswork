(function(global){	// BEGIN CLOSURE

var Joint = global.Joint,
     Element = Joint.dia.Element,
     point = Joint.point;

NW.dia = NW.dia || {};
var network = NW.dia.network = {};

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
		// options
		var p = Joint.DeepSupplement(this.properties, properties, {
	            position: point(0,0),
	            radius: 30,
	            label: 'cloud',
	            labelOffsetX: 30/2,
	            labelOffsetY: 30/2 + 8,
	            attrs: { fill: 'red' }
	        });
		// wrapper
		this.setWrapper(this.paper.circle(p.position.x, p.position.y, p.radius).attr(p.attrs));
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
