//>>built
require({cache:{"url:dijit/form/templates/DropDownButton.html":'<span class="dijit dijitReset dijitInline"\n\t><span class=\'dijitReset dijitInline dijitButtonNode\'\n\t\tdata-dojo-attach-event="ondijitclick:_onClick" data-dojo-attach-point="_buttonNode"\n\t\t><span class="dijitReset dijitStretch dijitButtonContents"\n\t\t\tdata-dojo-attach-point="focusNode,titleNode,_arrowWrapperNode"\n\t\t\trole="button" aria-haspopup="true" aria-labelledby="${id}_label"\n\t\t\t><span class="dijitReset dijitInline dijitIcon"\n\t\t\t\tdata-dojo-attach-point="iconNode"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitButtonText"\n\t\t\t\tdata-dojo-attach-point="containerNode,_popupStateNode"\n\t\t\t\tid="${id}_label"\n\t\t\t></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonInner"></span\n\t\t\t><span class="dijitReset dijitInline dijitArrowButtonChar">&#9660;</span\n\t\t></span\n\t></span\n\t><input ${!nameAttrSetting} type="${type}" value="${value}" class="dijitOffScreen" tabIndex="-1"\n\t\tdata-dojo-attach-point="valueNode"\n/></span>\n'}});
define("app/form/ArrowButton",["dojo/_base/declare","dijit/form/Button","dojo/dom-class","dojo/text!dijit/form/templates/DropDownButton.html"],function(a,b,c,d){return a("app.form.ArrowButton",b,{baseClass:"dijitDropDownButton",templateString:d,pointsTo:["after"],buildRendering:function(){this.inherited(arguments);this._buttonNode=this._buttonNode||this.focusNode||this.domNode;var a={after:this.isLeftToRight()?"Right":"Left",before:this.isLeftToRight()?"Left":"Right",above:"Up",below:"Down",left:"Left",
right:"Right"}[this.pointsTo[0]]||this.pointsTo[0]||"Down";c.add(this._arrowWrapperNode||this._buttonNode,"dijit"+a+"ArrowButton")}})});