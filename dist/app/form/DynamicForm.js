//>>built
require({cache:{"url:app/form/templates/DynamicForm.html":'<div class="module_container, secondayColoredBackground">\n\t<form dojoType="app.form.Manager" data-dojo-attach-point="_form" method="post" style="padding-top: 10px;">\n\t\t<table data-dojo-attach-point="_table" cellpadding="0" cellspacing="0">\n\t\t</table>\n\t</form>\n</div>\n'}});
define("app/form/DynamicForm",["dojo/_base/declare","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on","dojo/topic","dojo/_base/lang","dojo/text!./templates/DynamicForm.html","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","app/mixins/StatefulModule","dijit/form/ToggleButton","dijit/form/Button","app/store/UIStores","app/utils/HashManager","app/utils/ChangeTracker","dojox/validate","dojox/validate/web","app/utils/ArrayUtils","app/form/Manager","app/mixins/FormManager",
"dijit/form/Textarea","dijit/form/TextBox","dijit/form/TimeTextBox","dijit/form/DateTextBox","dijit/form/Select","dijit/form/ComboBox","app/form/FilteringSelect","dijit/form/CheckBox","dijit/form/RadioButton","dijit/form/ValidationTextBox","app/uicomponents/LookupField"],function(w,I,d,v,p,x,k,y,z,A,B,C,J,K,D,E,F,L,M,N,O,G,P,Q,R,S,T,U,V,H,W,X,t){return w("app.form.DynamicForm",[z,A,B,C,G],{widgetsInTemplate:!0,templateString:y,hashManager:E.getInstance(),uiStores:D.getInstance(),changeTracker:F.getInstance(),
paddingLeft:"5px",startup:function(){this.inherited(arguments);this._form=this.getWidget("_form");this._form.set("refreshUI",k.hitch(this,"refreshMetaFormUI"));this._table=this.getWidget("_table");typeof this.storeURL!="undefined"&&this.set("storeURL",this.storeURL)},_setStoreURLAttr:function(c){this._form.set("storeURL",c)},resize:function(){},generateMetaForm:function(c,l,a,e){typeof e=="undefined"&&(e={});if(!e.hasOwnProperty("columns"))e.columns=1;if(!e.hasOwnProperty("labelPlacement"))e.labelPlacement=
"top";if(!e.hasOwnProperty("showSubheadings"))e.showSubheadings=!0;if(!e.hasOwnProperty("validSubheadings"))e.validSubheadings=null;typeof e.style!="undefined"?v.set(this._form.domNode,e.style):v.set(this._form.domNode,{overflow:void 0,height:void 0,"margin-bottom":void 0,background:void 0});if(typeof this._table.id=="undefined"||this._table.id=="")this._table.id=this.id+"__table";if(typeof a!="object"||a==null)a={};this.removeFormListeners();this._form.clearWidgets();d.empty(this._table.id);this.keyDependencies=
{};this.fieldMap={};for(var g=!1,b=0;b<c.length;b++){var i=c[b];if(e.validFieldSets==null||e.validFieldSets.hasOwnProperty(i.title)&&e.validFieldSets[i.title]==!0)this.buildFieldsFromArray(i.fields,i.title,g,e),g=!0}b=k.clone(l);a=k.mixin(b,a);if(k.isArray(a.links))for(b=a.links.length-1;b>=0;b--)c=a.links[b],typeof c.id!="undefined"&&(a[c.link_id]=c);this.viewInForm(a,this._form)},buildFieldsFromArray:function(c,l,a,e){var g=this;if(k.isArray(c)&&c.length>0){var b;a===!0&&e.columns==1&&(a=d.toDom("<tr></tr>"),
b=d.toDom("<td><hr/></td>"),d.place(a,this._table),d.place(b,a));a=d.toDom("<tr></tr>");d.place(a,this._table);typeof l!="undefined"&&l!=null&&e.showSubheadings===!0&&(b=d.toDom('<td style="padding-left: '+this.paddingLeft+'; font-weight:bold;">'+l+"</td>"),d.place(b,a));for(var l=0,i,q,a=c.length-1;a>=0;a--){b=c[a];var r,m=void 0,n=void 0;l++;var f;f=typeof b.fieldOptions=="object"&&b.fieldOptions!=null?k.clone(b.fieldOptions):{};if(typeof i=="undefined"||l>=e.columns)i=d.toDom("<tr></tr>"),l=0;
e.labelPlacement=="top"?(q=d.toDom('<td style="padding-left: '+this.paddingLeft+'"></td>'),r=d.toDom('<div style="float:left; ">'+b.label+"</div>")):e.labelPlacement=="left"&&(q=d.toDom('<td label="true" style="padding-left: '+this.paddingLeft+'";></td>'),r=d.toDom('<div " style="padding-bottom:15px;">'+b.label+"</div>"));d.place(r,q);typeof b.link!="undefined"?(openLinkNode=d.toDom('<span><a style="margin-left:5px;" href="'+b.link+'" target="_blank">open</a></span>'),removeLinkNode=d.toDom('<span><span class="XwBorder" style="margin-left:3px;">x</span></span>')):
(openLinkNode=d.toDom("<span></span>"),removeLinkNode=d.toDom("<span></span>"));d.place(openLinkNode,r,"last");d.place(removeLinkNode,r,"last");var o=__.urls.model.modules.editor.hasOwnProperty(b.basicName)||typeof f.newHandler=="function",h=!f.hasOwnProperty("disableNew")||f.disableNew==!1;o&&h&&(m=d.toDom('<span><span class="XwBorder" style="margin-left:3px;">new</span></span>'),n=d.toDom('<span><span class="XwBorder" style="margin-left:3px;">edit</span></span>'),o=d.toDom('<div style="float:right;"></div>'),
d.place(n,o),d.place(m,o),d.place(o,q));b.openLinkNode=openLinkNode;b.removeLinkNode=removeLinkNode;d.place(i,this._table);d.place(q,i);if(typeof b.fieldType!="undefined"){var s;e.labelPlacement=="top"?s=d.toDom("<tr></tr>"):e.labelPlacement=="left"&&(s=i);var o=d.toDom('<td style="padding-left: '+this.paddingLeft+'; padding-bottom:15px;"></td>'),h=k.getObject(b.fieldType),j=null,u=null;if(typeof f.storeFunction=="function")f.store=[];else if(k.isArray(f.store))j=f.store,f.store=[];else if(typeof f.storeURL==
"string")f.store=[],u=f.storeURL;f.name=b.name;f.required=!1;f.observer="recordChange, refreshUI";if(typeof b.ref!="undefined")f.$ref=b.ref;h=new h(f);h.isInstanceOf&&h.isInstanceOf(H)&&h.set("value",!0);(h.name.toLowerCase()=="keys.company"||h.name.toLowerCase()=="keys.donor")&&h.set("hasToolTip",!0);b.widget=h;typeof f.removeLinkFunction=="function"&&g.formEventHandlers.push(p(removeLinkNode,"click",function(a,b,c){return function(){f.removeLinkFunction(a,b,c)}}(b,openLinkNode,removeLinkNode)));
if(h.isInstanceOf&&h.isInstanceOf(t)){if(typeof m!="undefined")m.style.display="none",n.style.display="none";if(typeof f.findFunction=="function"&&typeof f.entitySelectedTopicEvent!="undefined")h.findClicked=function(a){return function(){return f.findFunction(a)}}(b),this.formEventHandlers.push(x.subscribe(f.entitySelectedTopicEvent,function(a){return function(b){var c=!1;typeof b.link!="undefined"?b.link.link_id==a.link_id&&(c=!0):c=!0;c&&a.widget.entitySelected(b.entity)}}(b,openLinkNode,removeLinkNode)));
h.set("link_id",b.link_id);h.set("storeURL",f.storeURL);h.set("edit_store",f.edit_store);h.set("base_query",f.base_query);h.set("columns",f.columns);h.set("entityLabel",f.entityLabel);h.startup()}else typeof f.storeFunction=="function"?this.uiStores.populateCombo(h,f.storeFunction):k.isArray(j)?this.uiStores.populateComboArray(h,j):u!=null&&this.uiStores.populateComboDynamicREST(h,u,f.base_query);typeof m!="undefined"&&(typeof f.newHandler=="function"?this.formEventHandlers.push(p(m,"click",function(a,
b){return function(){a.newHandler(b,g.getDependentValues(b))}}(f,b))):(j=__.urls.model.modules.editor[b.basicName],m={title:"New "+b.basicName,dialogWidth:j.width,dialogHeight:j.height,dialogReady:function(a,b){return function(c){var e=function(){g.metaNewButtonClicked(b,c)};b.widget.isInstanceOf&&b.widget.isInstanceOf(t)?b.widget.set("newButtonHandler",e):g.formEventHandlers.push(p(a,"click",e))}}(m,b),callBacks:{entityCreated:function(a,b){return function(c){g.metaEntityCreated(a,b,c)}}(h,b)}},
__.workspaceManager.getDialogFromModuleURL(j.url,m)));typeof n!="undefined"&&(typeof f.editHandler=="function"?this.formEventHandlers.push(p(n,"click",function(a,b){return function(){a.editHandler(b,g.getDependentValues(b))}}(f,b))):(j=__.urls.model.modules.editor[b.basicName],n={title:"Edit "+b.basicName,dialogWidth:j.width,dialogHeight:j.height,dialogReady:function(b,a){return function(c){var e=function(){g.metaEditButtonClicked(a,c)};a.widget.isInstanceOf&&a.widget.isInstanceOf(t)?a.widget.set("editButtonHandler",
e):g.formEventHandlers.push(p(b,"click",e))}}(n,b),callBacks:{entitySaved:function(a,b){return function(c){g.metaEntitySaved(a,b,c)}}(h,b)}},__.workspaceManager.getDialogFromModuleURL(j.url,n)));h.placeAt(o,"first");d.place(s,this._table);d.place(o,s);this._form.registerWidget(h)}this.fieldMap[b.name]=b;b.hasOwnProperty("dependsOn")&&(this.keyDependencies["keys."+b.dependsOn]=b)}}},setWidgetByFieldName:function(){},getWidget:function(c){if(typeof this.fieldMap=="object"&&this.fieldMap!=null&&this.fieldMap.hasOwnProperty(c))return this.fieldMap[c].widget;
return this.inherited(arguments)},refreshMetaFormUI:function(c,d){var a=this.fieldMap[d],e=a.fieldOptions||{};typeof e.LinkChangeFunction=="function"&&e.LinkChangeFunction(a,a.openLinkNode,a.removeLinkNode);if(this.keyDependencies.hasOwnProperty(d)){var g=this.keyDependencies[d],b=g.fieldOptions||{};this.uiStores.populateComboDynamicREST(g.widget,b.storeURL,b.base_query);b=g.widget.item;typeof b=="object"&&b!=null&&b.hasOwnProperty(g.dependsOn)&&b[g.dependsOn].id!=c&&g.widget.set("value","")}for(var i in this.keyDependencies)a==
this.keyDependencies[i]&&(g=this.fieldMap[i],typeof a.widget.item=="object"&&a.widget.item!=null&&a.widget.item.hasOwnProperty(a.dependsOn)&&typeof a.widget.item[a.dependsOn]=="object"&&a.widget.item[a.dependsOn]!=null&&g.widget.set("value",a.widget.item[a.dependsOn].id));typeof e.changeFunction=="function"&&e.changeFunction(c,d,a)},metaNewButtonClicked:function(c,d){var a=!1;if(typeof c.dependsOn!="undefined")a=c.dependsOn;var e=this.getDependentValues(c),g;for(g in e)d.set(g,e[g],!0),a!=!1&&a==
g&&(a=!1);a?(__.alert.set("message","Please choose a "+a+" first"),__.alert.show()):(d.setUpdatingEntity(null,!0),d.show())},metaEditButtonClicked:function(c,d){var a=!1;if(typeof c.dependsOn!="undefined")a=c.dependsOn;var e=this.getDependentValues(c),g;for(g in e)d.set(g,e[g],!0),a!=!1&&a==g&&(a=!1);a?(__.alert.set("message","Please choose a "+a+" first"),__.alert.show()):(d.setUpdatingEntity(null,!0),d.show())},getDependentValues:function(c){var d={},c=c.fieldOptions||{};if(typeof c.base_query==
"function"){var c=c.base_query(),a;for(a in c){var e=a.split(".")[0];d[e]={$ref:e,id:c[a]}}}return d},metaEntityCreated:function(c,d,a){c.set("value",a.id)},metaEntitySaved:function(c,d,a){c.set("value",a.id)},onActivate:function(){this.inherited(arguments);if(typeof this.formEventHandlers=="undefined")this.formEventHandlers=[]},onDeactivate:function(){this.inherited(arguments);this.removeFormListeners()},removeFormListeners:function(){for(var c=0;c<this.formEventHandlers.length;c++){var d=this.formEventHandlers[c];
typeof d!="undefined"&&d.remove()}}})});