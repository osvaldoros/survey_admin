//>>built
require({cache:{"url:dijit/templates/Menu.html":'<table class="dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable" role="menu" tabIndex="${tabIndex}" data-dojo-attach-event="onkeypress:_onKeyPress" cellspacing="0">\n\t<tbody class="dijitReset" data-dojo-attach-point="containerNode"></tbody>\n</table>\n'}});
define("dijit/DropDownMenu",["dojo/_base/declare","dojo/_base/event","dojo/keys","dojo/text!./templates/Menu.html","./_OnDijitClickMixin","./_MenuBase"],function(d,c,b,e,f,g){return d("dijit.DropDownMenu",[g,f],{templateString:e,baseClass:"dijitMenu",postCreate:function(){var a=this.isLeftToRight();this._openSubMenuKey=a?b.RIGHT_ARROW:b.LEFT_ARROW;this._closeSubMenuKey=a?b.LEFT_ARROW:b.RIGHT_ARROW;this.connectKeyNavHandlers([b.UP_ARROW],[b.DOWN_ARROW])},_onKeyPress:function(a){if(!a.ctrlKey&&!a.altKey)switch(a.charOrCode){case this._openSubMenuKey:this._moveToPopup(a);
c.stop(a);break;case this._closeSubMenuKey:if(this.parentMenu)if(this.parentMenu._isMenuBar)this.parentMenu.focusPrev();else this.onCancel(!1);else c.stop(a)}}})});