//>>built
define("dijit/_editor/plugins/ViewSource",["dojo/_base/array","dojo/_base/declare","dojo/dom-attr","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/_base/event","dojo/i18n","dojo/keys","dojo/_base/lang","dojo/on","dojo/_base/sniff","dojo/_base/window","dojo/window","../../focus","../_Plugin","../../form/ToggleButton","../..","../../registry","dojo/i18n!../nls/commands"],function(o,t,u,h,i,e,p,v,q,d,w,j,l,r,s,m,x,y,z){var n=t("dijit._editor.plugins.ViewSource",m,{stripScripts:!0,stripComments:!0,
stripIFrames:!0,readOnly:!1,_fsPlugin:null,toggle:function(){if(j("webkit"))this._vsFocused=!0;this.button.set("checked",!this.button.get("checked"))},_initButton:function(){var a=v.getLocalization("dijit._editor","commands"),b=this.editor;this.button=new x({label:a.viewSource,dir:b.dir,lang:b.lang,showLabel:!1,iconClass:this.iconClassPrefix+" "+this.iconClassPrefix+"ViewSource",tabIndex:"-1",onChange:d.hitch(this,"_showSource")});if(j("ie")==7)this._ieFixNode=h.create("div",{style:{opacity:"0",zIndex:"-1000",
position:"absolute",top:"-1000px"}},l.body());this.button.set("readOnly",!1)},setEditor:function(a){this.editor=a;this._initButton();this.editor.addKeyHandler(q.F12,!0,!0,d.hitch(this,function(a){this.button.focus();this.toggle();p.stop(a);setTimeout(d.hitch(this,function(){this.editor.focus()}),100)}))},_showSource:function(a){var b=this.editor,g=b._plugins,c;this._sourceShown=a;var f=this;try{this.sourceArea||this._createSourceView();if(a){b._sourceQueryCommandEnabled=b.queryCommandEnabled;b.queryCommandEnabled=
function(a){return a.toLowerCase()==="viewsource"};this.editor.onDisplayChanged();c=b.get("value");c=this._filter(c);b.set("value",c);o.forEach(g,function(a){a instanceof n||a.set("disabled",!0)});if(this._fsPlugin)this._fsPlugin._getAltViewNode=function(){return f.sourceArea};this.sourceArea.value=c;this.sourceArea.style.height=b.iframe.style.height;this.sourceArea.style.width=b.iframe.style.width;e.set(b.iframe,"display","none");e.set(this.sourceArea,{display:"block"});this._resizeHandle=w(window,
"resize",d.hitch(this,function(){var a=r.getBox();if("_prevW"in this&&"_prevH"in this)if(a.w===this._prevW&&a.h===this._prevH)return;else this._prevW=a.w,this._prevH=a.h;else this._prevW=a.w,this._prevH=a.h;this._resizer&&(clearTimeout(this._resizer),delete this._resizer);this._resizer=setTimeout(d.hitch(this,function(){delete this._resizer;this._resize()}),10)}));setTimeout(d.hitch(this,this._resize),100);this.editor.onNormalizedDisplayChanged();this.editor.__oldGetValue=this.editor.getValue;this.editor.getValue=
d.hitch(this,function(){var a=this.sourceArea.value;return a=this._filter(a)})}else{if(!b._sourceQueryCommandEnabled)return;this._resizeHandle.remove();delete this._resizeHandle;if(this.editor.__oldGetValue)this.editor.getValue=this.editor.__oldGetValue,delete this.editor.__oldGetValue;b.queryCommandEnabled=b._sourceQueryCommandEnabled;if(!this._readOnly)c=this.sourceArea.value,c=this._filter(c),b.beginEditing(),b.set("value",c),b.endEditing();o.forEach(g,function(a){a.set("disabled",!1)});e.set(this.sourceArea,
"display","none");e.set(b.iframe,"display","block");delete b._sourceQueryCommandEnabled;this.editor.onDisplayChanged()}setTimeout(d.hitch(this,function(){var a=b.domNode.parentNode;a&&(a=z.getEnclosingWidget(a))&&a.resize&&a.resize();b.resize()}),300)}catch(k){console.log(k)}},updateState:function(){this.button.set("disabled",this.get("disabled"))},_resize:function(){var a=this.editor,b=a.getHeaderHeight(),d=a.getFooterHeight(),c=i.position(a.domNode),f=i.getPadBorderExtents(a.iframe.parentNode),
k=i.getMarginExtents(a.iframe.parentNode),e=i.getPadBorderExtents(a.domNode),c={w:c.w-e.w,h:c.h-(b+e.h+ +d)};if(this._fsPlugin&&this._fsPlugin.isFullscreen){var h=r.getBox();c.w=h.w-e.w;c.h=h.h-(b+e.h+d)}j("ie")&&(c.h-=2);if(this._ieFixNode)b=-this._ieFixNode.offsetTop/1E3,c.w=Math.floor((c.w+0.9)/b),c.h=Math.floor((c.h+0.9)/b);i.setMarginBox(this.sourceArea,{w:c.w-(f.w+k.w),h:c.h-(f.h+k.h)});i.setMarginBox(a.iframe.parentNode,{h:c.h})},_createSourceView:function(){var a=this.editor,b=a._plugins;
this.sourceArea=h.create("textarea");if(this.readOnly)u.set(this.sourceArea,"readOnly",!0),this._readOnly=!0;e.set(this.sourceArea,{padding:"0px",margin:"0px",borderWidth:"0px",borderStyle:"none"});h.place(this.sourceArea,a.iframe,"before");j("ie")&&a.iframe.parentNode.lastChild!==a.iframe&&e.set(a.iframe.parentNode.lastChild,{width:"0px",height:"0px",padding:"0px",margin:"0px",borderWidth:"0px",borderStyle:"none"});a._viewsource_oldFocus=a.focus;var g=this;a.focus=function(){if(g._sourceShown)g.setSourceAreaCaret();
else try{this._vsFocused?(delete this._vsFocused,s.focus(a.editNode)):a._viewsource_oldFocus()}catch(b){console.log(b)}};var c,f;for(c=0;c<b.length;c++)if((f=b[c])&&(f.declaredClass==="dijit._editor.plugins.FullScreen"||f.declaredClass===y._scopeName+"._editor.plugins.FullScreen")){this._fsPlugin=f;break}if(this._fsPlugin)this._fsPlugin._viewsource_getAltViewNode=this._fsPlugin._getAltViewNode,this._fsPlugin._getAltViewNode=function(){return g._sourceShown?g.sourceArea:this._viewsource_getAltViewNode()};
this.connect(this.sourceArea,"onkeydown",d.hitch(this,function(b){this._sourceShown&&b.keyCode==q.F12&&b.ctrlKey&&b.shiftKey&&(this.button.focus(),this.button.set("checked",!1),setTimeout(d.hitch(this,function(){a.focus()}),100),p.stop(b))}))},_stripScripts:function(a){a&&(a=a.replace(/<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>/ig,""),a=a.replace(/<\s*script\b([^<>]|\s)*>?/ig,""),a=a.replace(/<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>/ig,""));return a},_stripComments:function(a){a&&
(a=a.replace(/<\!--(.|\s){1,}?--\>/g,""));return a},_stripIFrames:function(a){a&&(a=a.replace(/<\s*iframe[^>]*>((.|\s)*?)<\\?\/\s*iframe\s*>/ig,""));return a},_filter:function(a){a&&(this.stripScripts&&(a=this._stripScripts(a)),this.stripComments&&(a=this._stripComments(a)),this.stripIFrames&&(a=this._stripIFrames(a)));return a},setSourceAreaCaret:function(){var a=l.global,b=this.sourceArea;s.focus(b);this._sourceShown&&!this.readOnly&&(j("ie")?this.sourceArea.createTextRange&&(a=b.createTextRange(),
a.collapse(!0),a.moveStart("character",-99999),a.moveStart("character",0),a.moveEnd("character",0),a.select()):a.getSelection&&b.setSelectionRange&&b.setSelectionRange(0,0))},destroy:function(){this._ieFixNode&&l.body().removeChild(this._ieFixNode);this._resizer&&(clearTimeout(this._resizer),delete this._resizer);this._resizeHandle&&(this._resizeHandle.remove(),delete this._resizeHandle);this.inherited(arguments)}});m.registry.viewSource=m.registry.viewsource=function(a){return new n({readOnly:"readOnly"in
a?a.readOnly:!1,stripComments:"stripComments"in a?a.stripComments:!0,stripScripts:"stripScripts"in a?a.stripScripts:!0,stripIFrames:"stripIFrames"in a?a.stripIFrames:!0})};return n});