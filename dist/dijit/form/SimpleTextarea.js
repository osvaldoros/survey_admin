//>>built
define("dijit/form/SimpleTextarea",["dojo/_base/declare","dojo/dom-class","dojo/_base/sniff","dojo/_base/window","./TextBox"],function(h,i,f,g,j){return h("dijit.form.SimpleTextarea",j,{baseClass:"dijitTextBox dijitTextArea",rows:"3",cols:"20",templateString:"<textarea ${!nameAttrSetting} data-dojo-attach-point='focusNode,containerNode,textbox' autocomplete='off'></textarea>",postMixInProperties:function(){if(!this.value&&this.srcNodeRef)this.value=this.srcNodeRef.value;this.inherited(arguments)},
buildRendering:function(){this.inherited(arguments);f("ie")&&this.cols&&i.add(this.textbox,"dijitTextAreaCols")},filter:function(a){a&&(a=a.replace(/\r/g,""));return this.inherited(arguments)},_onInput:function(){if(this.maxLength){var a=parseInt(this.maxLength),b=this.textbox.value.replace(/\r/g,""),a=b.length-a;if(a>0){var d=this.textbox;if(d.selectionStart){var c=d.selectionStart,e=0;if(f("opera"))e=(this.textbox.value.substring(0,c).match(/\r/g)||[]).length;this.textbox.value=b.substring(0,c-
a-e)+b.substring(c-e);d.setSelectionRange(c-a,c-a)}else if(g.doc.selection)d.focus(),b=g.doc.selection.createRange(),b.moveStart("character",-a),b.text="",b.select()}}this.inherited(arguments)}})});