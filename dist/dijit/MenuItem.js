//>>built
require({cache:{"url:dijit/templates/MenuItem.html":'<tr class="dijitReset dijitMenuItem" data-dojo-attach-point="focusNode" role="menuitem" tabIndex="-1"\n\t\tdata-dojo-attach-event="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick">\n\t<td class="dijitReset dijitMenuItemIconCell" role="presentation">\n\t\t<img src="${_blankGif}" alt="" class="dijitIcon dijitMenuItemIcon" data-dojo-attach-point="iconNode"/>\n\t</td>\n\t<td class="dijitReset dijitMenuItemLabel" colspan="2" data-dojo-attach-point="containerNode"></td>\n\t<td class="dijitReset dijitMenuItemAccelKey" style="display: none" data-dojo-attach-point="accelKeyNode"></td>\n\t<td class="dijitReset dijitMenuArrowCell" role="presentation">\n\t\t<div data-dojo-attach-point="arrowWrapper" style="visibility: hidden">\n\t\t\t<img src="${_blankGif}" alt="" class="dijitMenuExpand"/>\n\t\t\t<span class="dijitMenuExpandA11y">+</span>\n\t\t</div>\n\t</td>\n</tr>\n'}});
define("dijit/MenuItem",["dojo/_base/declare","dojo/dom","dojo/dom-attr","dojo/dom-class","dojo/_base/event","dojo/_base/kernel","dojo/_base/sniff","./_Widget","./_TemplatedMixin","./_Contained","./_CssStateMixin","dojo/text!./templates/MenuItem.html"],function(d,e,b,f,g,c,h,i,j,k,l,m){return d("dijit.MenuItem",[i,j,k,l],{templateString:m,baseClass:"dijitMenuItem",label:"",_setLabelAttr:{node:"containerNode",type:"innerHTML"},iconClass:"dijitNoIcon",_setIconClassAttr:{node:"iconNode",type:"class"},
accelKey:"",disabled:!1,_fillContent:function(a){a&&!("label"in this.params)&&this.set("label",a.innerHTML)},buildRendering:function(){this.inherited(arguments);var a=this.id+"_text";b.set(this.containerNode,"id",a);this.accelKeyNode&&(b.set(this.accelKeyNode,"id",this.id+"_accel"),a+=" "+this.id+"_accel");this.domNode.setAttribute("aria-labelledby",a);e.setSelectable(this.domNode,!1)},_onHover:function(){this.getParent().onItemHover(this)},_onUnhover:function(){this.getParent().onItemUnhover(this);
this._set("hovering",!1)},_onClick:function(a){this.getParent().onItemClick(this,a);g.stop(a)},onClick:function(){},focus:function(){try{h("ie")==8&&this.containerNode.focus(),this.focusNode.focus()}catch(a){}},_onFocus:function(){this._setSelected(!0);this.getParent()._onItemFocus(this);this.inherited(arguments)},_setSelected:function(a){f.toggle(this.domNode,"dijitMenuItemSelected",a)},setLabel:function(a){c.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.","",
"2.0");this.set("label",a)},setDisabled:function(a){c.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.","","2.0");this.set("disabled",a)},_setDisabledAttr:function(a){this.focusNode.setAttribute("aria-disabled",a?"true":"false");this._set("disabled",a)},_setAccelKeyAttr:function(a){this.accelKeyNode.style.display=a?"":"none";this.accelKeyNode.innerHTML=a;b.set(this.containerNode,"colSpan",a?"1":"2");this._set("accelKey",a)}})});