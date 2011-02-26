(function(global){	// BEGIN CLOSURE

var Joint = global.Joint,
     Element = Joint.dia.Element,
     point = Joint.point;

var network = NW.dia.network = {};

netswork.arrow = {
    startArrow: {type: "none"},
    endArrow: {type: "none"},
    attrs: {"stroke-dasharray": "none"}
};

/**
 * Finite state machine state.
 * @name State.create
 * @methodOf Joint.dia.fsa
 * @param {Object} properties
 * @param {Object} properties.position Position of the State (e.g. {x: 50, y: 100}).
 * @param {Number} [properties.radius] Radius of the circle of the state.
 * @param {String} [properties.label] The name of the state.
 * @param {Number} [properties.labelOffsetX] Offset in x-axis of the label from the state circle origin.
 * @param {Number} [properties.labelOffsetY] Offset in y-axis of the label from the state circle origin.
 * @param {Object} [properties.attrs] SVG attributes of the appearance of the state.
 * @example
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
fsa.cloud = Element.extend({
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
            attrs: { fill: 'white' }
        });
	// wrapper
	this.setWrapper(this.paper.circle(p.position.x, p.position.y, p.radius).attr(p.attrs));
	// inner
	this.addInner(this.getLabelElement());
    },
    getLabelElement: function(){
	var
	p = this.properties,
	bb = this.wrapper.getBBox(),
	t = this.paper.text(bb.x, bb.y, p.label),
	tbb = t.getBBox();
	t.translate(bb.x - tbb.x + p.labelOffsetX,
		    bb.y - tbb.y + p.labelOffsetY);
	return t;
    }
});

})(this);	// END CLOSURE
