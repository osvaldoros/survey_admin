//>>built
define("app/loader/ModuleLoader",["dojo/_base/declare","dojo/_base/xhr","dijit/layout/ContentPane","require","dojo/_base/lang","dojo/dom-class","app/mixins/SelfActivates"],function(f,i,g,c,d,e,h){return f("app.loader.ModuleLoader",[g,h],{_pendingActivation:!1,usedLoader:!1,postMixInProperties:function(){this.inherited(arguments);if(typeof this.moduleURL!=="undefined")this.def=this.set("href",c.toUrl("app/loader/LoadingModule.html"))},postCreate:function(){this.inherited(arguments);typeof this.cssClass!=
"undefined"?this.cssClass!=null&&e.add(this.domNode,this.cssClass):e.add(this.domNode,"moduleLoader")},onLoad:function(){var b=this;this.inherited(arguments);typeof b.module=="undefined"&&typeof this.moduleURL!=="undefined"&&c([this.moduleURL],function(a){b.instantiateModule(a)})},instantiateModule:function(b){var a={usedLoader:!0};if(typeof this.parentStoreURL!="undefined")a.parentStoreURL=this.parentStoreURL;a.topModule=typeof this.topModule!="undefined";if(typeof this.hash!="undefined")a.hashId=
this.hash;if(typeof this.parentStack!="undefined")a.parentStack=this.parentStack;if(typeof this.parentWizard!="undefined")a.parentWizard=this.parentWizard;if(typeof this.stateHashFunction!="undefined")a.stateHashFunction=this.stateHashFunction;if(typeof this.onActivateCallBack!="undefined")a.onActivateCallBack=this.onActivateCallBack;if(typeof this.callBacks!="undefined")a.callBacks=this.callBacks;if(typeof this.callbacks!="undefined")a.callbacks=this.callbacks;if(typeof this.storeURL!="undefined")a.storeURL=
this.storeURL;if(typeof this.formMeta!="undefined")a.formMeta=this.formMeta;if(typeof this.setupDialog!="undefined")a.setupDialog=this.setupDialog;this.module=new b(a);this.set("content",this.module);if(this._pendingActivation)this.__activate(),this._pendingActivation=!1;if(d.isArray(this._pendingSets)&&this._pendingSets.length>0){for(b=0;b<this._pendingSets.length;b++)a=this._pendingSets[b],this.set(a.name,a.value,a.passDown);this._pendingSets=null}},__activate:function(){typeof this.module!="undefined"&&
typeof this.module.activate!="undefined"&&!this.module.isActive()?this.module.activate():this._pendingActivation=!0},prepareForSave:function(){if(typeof this.module!="undefined"&&typeof this.module.prepareForSave=="function")return this.module.prepareForSave();return!0},onReloadEntity:function(b){if(typeof this.module!="undefined"&&typeof this.module.onReloadEntity=="function")return this.module.onReloadEntity(b);return!0},executeAfterNavigate:function(){if(typeof this.module!="undefined"&&typeof this.module.executeAfterNavigate==
"function")return this.module.executeAfterNavigate()},gatherFormValues:function(){if(typeof this.module!="undefined"&&typeof this.module.gatherFormValues=="function")return this.module.gatherFormValues();return null},__deactivate:function(){typeof this.module!="undefined"&&typeof this.module.deactivate!="undefined"&&this.module.isActive()&&this.module.deactivate()},activate:function(){this.__activate()},deactivate:function(){this.__deactivate()},set:function(b,a,c){if(c===!0)if(this.inherited(arguments),
typeof this.module=="object"&&this.module!=null)typeof this.module.set=="function"&&this.module.set(b,a);else{if(!d.isArray(this._pendingSets))this._pendingSets=[];this._pendingSets.push({name:b,value:a,passDown:c})}else this.inherited(arguments)},setCurrentState:function(b){typeof this.module!="undefined"&&typeof this.module.setCurrentState!="undefined"&&this.module.setCurrentState(b)},getCurrentState:function(){if(typeof this.module!="undefined"&&typeof this.module.getCurrentState!="undefined")return this.module.getCurrentState();
return""}})});