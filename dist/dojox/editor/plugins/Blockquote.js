//>>built
define("dojox/editor/plugins/Blockquote",["dojo","dijit","dojox","dijit/_editor/range","dijit/_editor/selection","dijit/_editor/_Plugin","dijit/form/ToggleButton","dojo/_base/connect","dojo/_base/declare","dojo/i18n","dojo/i18n!dojox/editor/plugins/nls/Blockquote"],function(c,g,o){c.declare("dojox.editor.plugins.Blockquote",g._editor._Plugin,{iconClassPrefix:"dijitAdditionalEditorIcon",_initButton:function(){this._nlsResources=c.i18n.getLocalization("dojox.editor.plugins","Blockquote");this.button=
new g.form.ToggleButton({label:this._nlsResources.blockquote,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"Blockquote",tabIndex:"-1",onClick:c.hitch(this,"_toggleQuote")})},setEditor:function(a){this.editor=a;this._initButton();this.connect(this.editor,"onNormalizedDisplayChanged","updateState");a.customUndo=!0},_toggleQuote:function(){try{var a=this.editor;a.focus();var l=this.button.get("checked"),k=g.range.getSelection(a.window),e,i,b,h;k&&k.rangeCount>0&&(e=k.getRangeAt(0));
if(e){a.beginEditing();if(l){var d,m;if(e.startContainer===e.endContainer){if(this._isRootInline(e.startContainer)){for(b=e.startContainer;b&&b.parentNode!==a.editNode;)b=b.parentNode;for(;b&&b.previousSibling&&(this._isTextElement(b)||b.nodeType===1&&this._isInlineFormat(this._getTagName(b)));)b=b.previousSibling;if(b&&b.nodeType===1&&!this._isInlineFormat(this._getTagName(b)))b=b.nextSibling;if(b){d=a.document.createElement("blockquote");c.place(d,b,"after");d.appendChild(b);for(h=d.nextSibling;h&&
(this._isTextElement(h)||h.nodeType===1&&this._isInlineFormat(this._getTagName(h)));)d.appendChild(h),h=d.nextSibling}}else{for(var j=e.startContainer;(this._isTextElement(j)||this._isInlineFormat(this._getTagName(j))||this._getTagName(j)==="li")&&j!==a.editNode&&j!==a.document.body;)j=j.parentNode;j!==a.editNode&&j!==j.ownerDocument.documentElement&&(d=a.document.createElement("blockquote"),c.place(d,j,"after"),d.appendChild(j))}d&&(c.withGlobal(a.window,"selectElementChildren",g._editor.selection,
[d]),c.withGlobal(a.window,"collapse",g._editor.selection,[!0]))}else{var f;b=e.startContainer;for(h=e.endContainer;b&&this._isTextElement(b)&&b.parentNode!==a.editNode;)b=b.parentNode;for(f=b;f.nextSibling&&c.withGlobal(a.window,"inSelection",g._editor.selection,[f]);)f=f.nextSibling;h=f;if(h===a.editNode||h===a.document.body){d=a.document.createElement("blockquote");c.place(d,b,"after");m=this._getTagName(b);if(this._isTextElement(b)||this._isInlineFormat(m))for(a=b;a&&(this._isTextElement(a)||
a.nodeType===1&&this._isInlineFormat(this._getTagName(a)));)d.appendChild(a),a=d.nextSibling;else d.appendChild(b);return}h=h.nextSibling;for(f=b;f&&f!==h;){if(f.nodeType===1){if(m=this._getTagName(f),m!=="br"){if(!window.getSelection&&m==="p"&&this._isEmpty(f)){f=f.nextSibling;continue}this._isInlineFormat(m)?d||(d=a.document.createElement("blockquote"),c.place(d,f,"after")):(d&&this._isEmpty(d)&&d.parentNode.removeChild(d),d=a.document.createElement("blockquote"),c.place(d,f,"after"));d.appendChild(f);
f=d}}else this._isTextElement(f)&&(d||(d=a.document.createElement("blockquote"),c.place(d,f,"after")),d.appendChild(f),f=d);f=f.nextSibling}d&&(this._isEmpty(d)?d.parentNode.removeChild(d):(c.withGlobal(a.window,"selectElementChildren",g._editor.selection,[d]),c.withGlobal(a.window,"collapse",g._editor.selection,[!0])))}}else if(d=!1,e.startContainer===e.endContainer){for(i=e.endContainer;i&&i!==a.editNode&&i!==a.document.body;){if((i.tagName?i.tagName.toLowerCase():"")==="blockquote"){d=!0;break}i=
i.parentNode}if(d){for(var p;i.firstChild;)p=i.firstChild,c.place(p,i,"before");i.parentNode.removeChild(i);p&&(c.withGlobal(a.window,"selectElementChildren",g._editor.selection,[p]),c.withGlobal(a.window,"collapse",g._editor.selection,[!0]))}}else{for(b=e.startContainer;b&&this._isTextElement(b)&&b.parentNode!==a.editNode;)b=b.parentNode;for(e=[];b&&b.nextSibling&&c.withGlobal(a.window,"inSelection",g._editor.selection,[b]);){if(b.parentNode&&this._getTagName(b.parentNode)==="blockquote")b=b.parentNode;
e.push(b);b=b.nextSibling}for(var o=this._findBlockQuotes(e);o.length;){var n=o.pop();if(n.parentNode){for(;n.firstChild;)c.place(n.firstChild,n,"before");n.parentNode.removeChild(n)}}}a.endEditing()}a.onNormalizedDisplayChanged()}catch(q){}},updateState:function(){var a=this.editor,l=this.get("disabled");if(a&&a.isLoaded&&this.button&&(this.button.set("disabled",l),!l)){var c,l=!1,e=g.range.getSelection(a.window);if(e&&e.rangeCount>0&&(e=e.getRangeAt(0)))c=e.endContainer;for(;c&&c!==a.editNode&&
c!==a.document;){if((c.tagName?c.tagName.toLowerCase():"")==="blockquote"){l=!0;break}c=c.parentNode}this.button.set("checked",l)}},_findBlockQuotes:function(a){var c=[];if(a){var g;for(g=0;g<a.length;g++){var e=a[g];e.nodeType===1&&(this._getTagName(e)==="blockquote"&&c.push(e),e.childNodes&&e.childNodes.length>0&&(c=c.concat(this._findBlockQuotes(e.childNodes))))}}return c},_getTagName:function(a){var c="";a&&a.nodeType===1&&(c=a.tagName?a.tagName.toLowerCase():"");return c},_isRootInline:function(a){var c=
this.editor;if(this._isTextElement(a)&&a.parentNode===c.editNode)return!0;else if(a.nodeType===1&&this._isInlineFormat(a)&&a.parentNode===c.editNode)return!0;else if(this._isTextElement(a)&&this._isInlineFormat(this._getTagName(a.parentNode))){for(a=a.parentNode;a&&a!==c.editNode&&this._isInlineFormat(this._getTagName(a));)a=a.parentNode;if(a===c.editNode)return!0}return!1},_isTextElement:function(a){if(a&&a.nodeType===3||a.nodeType===4)return!0;return!1},_isEmpty:function(a){if(a.childNodes){var g=
!0,k;for(k=0;k<a.childNodes.length;k++){var e=a.childNodes[k];if(e.nodeType===1){if(this._getTagName(e)!=="p"||c.trim(e.innerHTML)){g=!1;break}}else if(this._isTextElement(e)){if((e=c.trim(e.nodeValue))&&e!=="&nbsp;"&&e!=="\u00a0"){g=!1;break}}else{g=!1;break}}return g}else return!0},_isInlineFormat:function(a){switch(a){case "a":case "b":case "strong":case "s":case "strike":case "i":case "u":case "em":case "sup":case "sub":case "span":case "font":case "big":case "cite":case "q":case "img":case "small":return!0;
default:return!1}}});c.subscribe(g._scopeName+".Editor.getPlugin",null,function(a){if(!a.plugin&&a.args.name.toLowerCase()==="blockquote")a.plugin=new o.editor.plugins.Blockquote({})});return o.editor.plugins.Blockquote});