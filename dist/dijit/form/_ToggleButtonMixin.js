//>>built
define("dijit/form/_ToggleButtonMixin",["dojo/_base/declare","dojo/dom-attr"],function(c,d){return c("dijit.form._ToggleButtonMixin",null,{checked:!1,_aria_attr:"aria-pressed",_onClick:function(){var a=this.checked;this._set("checked",!a);var b=this.inherited(arguments);this.set("checked",b?this.checked:a);return b},_setCheckedAttr:function(a,b){this._set("checked",a);d.set(this.focusNode||this.domNode,"checked",a);(this.focusNode||this.domNode).setAttribute(this._aria_attr,a?"true":"false");this._handleOnChange(a,
b)},reset:function(){this._hasBeenBlurred=!1;this.set("checked",this.params.checked||!1)}})});