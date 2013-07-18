//>>built
require({cache:{"url:dijit/form/templates/DropDownBox.html":'<div class="dijit dijitReset dijitInline dijitLeft"\n\tid="widget_${id}"\n\trole="combobox"\n\t><div class=\'dijitReset dijitRight dijitButtonNode dijitArrowButton dijitDownArrowButton dijitArrowButtonContainer\'\n\t\tdata-dojo-attach-point="_buttonNode, _popupStateNode" role="presentation"\n\t\t><input class="dijitReset dijitInputField dijitArrowButtonInner" value="&#9660; " type="text" tabIndex="-1" readonly="readonly" role="presentation"\n\t\t\t${_buttonInputDisabled}\n\t/></div\n\t><div class=\'dijitReset dijitValidationContainer\'\n\t\t><input class="dijitReset dijitInputField dijitValidationIcon dijitValidationInner" value="&#935; " type="text" tabIndex="-1" readonly="readonly" role="presentation"\n\t/></div\n\t><div class="dijitReset dijitInputField dijitInputContainer"\n\t\t><input class=\'dijitReset dijitInputInner\' ${!nameAttrSetting} type="text" autocomplete="off"\n\t\t\tdata-dojo-attach-point="textbox,focusNode" role="textbox" aria-haspopup="true"\n\t/></div\n></div>\n'}});
define("dijit/form/_DateTimeTextBox",["dojo/date","dojo/date/locale","dojo/date/stamp","dojo/_base/declare","dojo/_base/lang","./RangeBoundTextBox","../_HasDropDown","dojo/text!./templates/DropDownBox.html"],function(f,h,e,i,d,j,k,l){return i("dijit.form._DateTimeTextBox",[j,k],{templateString:l,hasDownArrow:!0,openOnClick:!0,regExpGen:h.regexp,datePackage:f,postMixInProperties:function(){this.inherited(arguments);this._set("type","text")},compare:function(a,b){var c=this._isInvalidDate(a),g=this._isInvalidDate(b);
return c?g?0:-1:g?1:f.compare(a,b,this._selector)},forceWidth:!0,format:function(a,b){if(!a)return"";return this.dateLocaleModule.format(a,b)},parse:function(a,b){return this.dateLocaleModule.parse(a,b)||(this._isEmpty(a)?null:void 0)},serialize:function(a,b){a.toGregorian&&(a=a.toGregorian());return e.toISOString(a,b)},dropDownDefaultValue:new Date,value:new Date(""),_blankValue:null,popupClass:"",_selector:"",constructor:function(a){this.datePackage=a.datePackage||this.datePackage;this.dateFuncObj=
typeof this.datePackage=="string"?d.getObject(this.datePackage,!1):this.datePackage;this.dateClassObj=this.dateFuncObj.Date||Date;this.dateLocaleModule=d.getObject("locale",!1,this.dateFuncObj);this.regExpGen=this.dateLocaleModule.regexp;this._invalidDate=this.constructor.prototype.value.toString()},buildRendering:function(){this.inherited(arguments);if(!this.hasDownArrow)this._buttonNode.style.display="none";if(this.openOnClick||!this.hasDownArrow)this._buttonNode=this.domNode,this.baseClass+=" dijitComboBoxOpenOnClick"},
_setConstraintsAttr:function(a){a.selector=this._selector;a.fullYear=!0;var b=e.fromISOString;if(typeof a.min=="string")a.min=b(a.min);if(typeof a.max=="string")a.max=b(a.max);this.inherited(arguments)},_isInvalidDate:function(a){return!a||isNaN(a)||typeof a!="object"||a.toString()==this._invalidDate},_setValueAttr:function(a){a!==void 0&&(typeof a=="string"&&(a=e.fromISOString(a)),this._isInvalidDate(a)&&(a=null),a instanceof Date&&!(this.dateClassObj instanceof Date)&&(a=new this.dateClassObj(a)));
this.inherited(arguments);if(this.value instanceof Date)this.filterString="";this.dropDown&&this.dropDown.set("value",a,!1)},_set:function(a,b){a=="value"&&this.value instanceof Date&&this.compare(b,this.value)==0||this.inherited(arguments)},_setDropDownDefaultValueAttr:function(a){this._isInvalidDate(a)&&(a=new this.dateClassObj);this.dropDownDefaultValue=a},openDropDown:function(){this.dropDown&&this.dropDown.destroy();var a=d.isString(this.popupClass)?d.getObject(this.popupClass,!1):this.popupClass,
b=this,c=this.get("value");this.dropDown=new a({onChange:function(a){b.set("value",a,!0)},id:this.id+"_popup",dir:b.dir,lang:b.lang,value:c,currentFocus:!this._isInvalidDate(c)?c:this.dropDownDefaultValue,constraints:b.constraints,filterString:b.filterString,datePackage:b.datePackage,isDisabledDate:function(a){return!b.rangeCheck(a,b.constraints)}});this.inherited(arguments)},_getDisplayedValueAttr:function(){return this.textbox.value},_setDisplayedValueAttr:function(a,b){this._setValueAttr(this.parse(a,
this.constraints),b,a)}})});