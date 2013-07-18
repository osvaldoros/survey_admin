//>>built
require({cache:{"url:dijit/templates/ProgressBar.html":'<div class="dijitProgressBar dijitProgressBarEmpty" role="progressbar"\n\t><div  data-dojo-attach-point="internalProgress" class="dijitProgressBarFull"\n\t\t><div class="dijitProgressBarTile" role="presentation"></div\n\t\t><span style="visibility:hidden">&#160;</span\n\t></div\n\t><div data-dojo-attach-point="labelNode" class="dijitProgressBarLabel" id="${id}_label"></div\n\t><img data-dojo-attach-point="indeterminateHighContrastImage" class="dijitProgressBarIndeterminateHighContrastImage" alt=""\n/></div>\n'}});
define("dijit/ProgressBar",["require","dojo/_base/declare","dojo/dom-class","dojo/_base/lang","dojo/number","./_Widget","./_TemplatedMixin","dojo/text!./templates/ProgressBar.html"],function(d,e,f,g,h,i,j,k){return e("dijit.ProgressBar",[i,j],{progress:"0",value:"",maximum:100,places:0,indeterminate:!1,label:"",name:"",templateString:k,_indeterminateHighContrastImagePath:d.toUrl("./themes/a11y/indeterminate_progress.gif"),postMixInProperties:function(){this.inherited(arguments);if(!("value"in this.params))this.value=
this.indeterminate?Infinity:this.progress},buildRendering:function(){this.inherited(arguments);this.indeterminateHighContrastImage.setAttribute("src",this._indeterminateHighContrastImagePath.toString());this.update()},update:function(a){g.mixin(this,a||{});var a=this.internalProgress,b=this.domNode,c=1;this.indeterminate?(b.removeAttribute("aria-valuenow"),b.removeAttribute("aria-valuemin"),b.removeAttribute("aria-valuemax")):(String(this.progress).indexOf("%")!=-1?(c=Math.min(parseFloat(this.progress)/
100,1),this.progress=c*this.maximum):(this.progress=Math.min(this.progress,this.maximum),c=this.maximum?this.progress/this.maximum:0),b.setAttribute("aria-describedby",this.labelNode.id),b.setAttribute("aria-valuenow",this.progress),b.setAttribute("aria-valuemin",0),b.setAttribute("aria-valuemax",this.maximum));this.labelNode.innerHTML=this.report(c);f.toggle(this.domNode,"dijitProgressBarIndeterminate",this.indeterminate);a.style.width=c*100+"%";this.onChange()},_setValueAttr:function(a){this._set("value",
a);a==Infinity?this.update({indeterminate:!0}):this.update({indeterminate:!1,progress:a})},_setLabelAttr:function(a){this._set("label",a);this.update()},_setIndeterminateAttr:function(a){this.indeterminate=a;this.update()},report:function(a){return this.label?this.label:this.indeterminate?"&#160;":h.format(a,{type:"percent",places:this.places,locale:this.lang})},onChange:function(){}})});