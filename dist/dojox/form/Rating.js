//>>built
define("dojox/form/Rating",["dojo/_base/declare","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dojo/string","dojo/query","dijit/form/_FormWidget"],function(g,h,c,d,f,i,j){return g("dojox.form.Rating",j,{templateString:null,numStars:3,value:0,constructor:function(a){h.mixin(this,a);for(var a="",b=0;b<this.numStars;b++)a+=f.substitute('<li class="dojoxRatingStar dijitInline" dojoAttachEvent="onclick:onStarClick,onmouseover:_onMouse,onmouseout:_onMouse" value="${value}"></li>',{value:b+1});this.templateString=
f.substitute('<div dojoAttachPoint="domNode" class="dojoxRating dijitInline"><input type="hidden" value="0" dojoAttachPoint="focusNode" /><ul>${stars}</ul></div>',{stars:a})},postCreate:function(){this.inherited(arguments);this._renderStars(this.value)},_onMouse:function(a){if(this.hovering){var b=+c.get(a.target,"value");this.onMouseOver(a,b);this._renderStars(b,!0)}else this._renderStars(this.value)},_renderStars:function(a,b){i(".dojoxRatingStar",this.domNode).forEach(function(e,c){c+1>a?(d.remove(e,
"dojoxRatingStarHover"),d.remove(e,"dojoxRatingStarChecked")):(d.remove(e,"dojoxRatingStar"+(b?"Checked":"Hover")),d.add(e,"dojoxRatingStar"+(b?"Hover":"Checked")))})},onStarClick:function(a){a=+c.get(a.target,"value");this.setAttribute("value",a==this.value?0:a);this._renderStars(this.value);this.onChange(this.value)},onMouseOver:function(){},setAttribute:function(a,b){this.set(a,b);a=="value"&&(this._renderStars(this.value),this.onChange(this.value))}})});