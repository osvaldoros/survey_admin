//>>built
/**
 * This class extends TabContainer to make it play nice in our activation framework
 * 
 */
define("app/layout/FloatingPane", [ 
	'dojo/_base/declare', 
	'dojo/_base/lang',
	'dojox/layout/FloatingPane',
	'app/mixins/WidgetMap',
	"dojo/dnd/Moveable"
	], 
	function (declare, lang, FloatingPane, WidgetMap, Moveable) {
    return declare('app.layout.FloatingPane', [FloatingPane, WidgetMap], {
    	__isShowing:false,

		hide: function(/* Function? */ callback){
			this.inherited(arguments);
			this.__isShowing = false;
			this.deactivateChildren(this.getChildren())
		},

		postCreate:function(){
			this.inherited(arguments);
			this.moveable = new Moveable(this.domNode,{ handle: this.focusNode });
			this.moveable.onMoved = lang.hitch(this, "onMoved");

			this.__x = 10;
			this.__y = 10;
		},
	
		show: function(/* Function? */callback){
			this.inherited(arguments);
			this.__isShowing = true;
			this.activateChildren(this.getChildren())
			this.position(this.__x,this.__y);
		},

		onMoved:function(mover, leftTop){
			this.__x = leftTop.l;
			this.__y = leftTop.t;
		},

		activateChildren:function(children){
			for (var i = children.length - 1; i >= 0; i--){
				var domChild = children[i];
				var child = this.getWidget(domChild.id);
				
				if(typeof(child) != 'undefined' && typeof(child.activate) != 'undefined'){
					child.activate();
				}
			};
		},

		position:function(x, y){
			if(typeof(this.domNode) != "undefined"){
				var style = this.domNode.style;
				style.left = x + "px";
				style.top = y + "px";
			}
		},

		deactivateChildren:function(children){
			for (var i = children.length - 1; i >= 0; i--){
				var domChild = children[i];
				var child = this.getWidget(domChild.id);
				if(typeof(child) != 'undefined' && typeof(child.deactivate) != 'undefined'){
					child.deactivate();
				}
			};
		}		

	});
});
