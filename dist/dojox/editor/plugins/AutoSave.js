//>>built
define("dojox/editor/plugins/AutoSave",["dojo","dijit","dojox","dijit/_base/manager","dijit/_base/popup","dijit/_Widget","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/Dialog","dijit/MenuItem","dijit/Menu","dijit/form/Button","dijit/form/ComboButton","dijit/form/ComboBox","dijit/form/_TextBoxMixin","dijit/form/TextBox","dijit/TooltipDialog","dijit/_editor/_Plugin","dojo/_base/connect","dojo/_base/declare","dojo/date/locale","dojo/i18n","dojo/string","dojox/editor/plugins/Save","dojo/i18n!dojox/editor/plugins/nls/AutoSave"],
function(b,c,d){b.experimental("dojox.editor.plugins.AutoSave");b.declare("dojox.editor.plugins._AutoSaveSettingDialog",[c._Widget,c._TemplatedMixin,c._WidgetsInTemplateMixin],{dialogTitle:"",dialogDescription:"",paramName:"",paramLabel:"",btnOk:"",btnCancel:"",widgetsInTemplate:!0,templateString:"<span id='${dialogId}' class='dijit dijitReset dijitInline' tabindex='-1'><div dojoType='dijit.Dialog' title='${dialogTitle}' dojoAttachPoint='dialog' class='dijitEditorAutoSaveSettingDialog'><div tabindex='-1'>${dialogDescription}</div><div tabindex='-1' class='dijitEditorAutoSaveSettingInputArea'>${paramName}</div><div class='dijitEditorAutoSaveSettingInputArea' tabindex='-1'><input class='textBox' dojoType='dijit.form.TextBox' id='${textBoxId}' required='false' intermediateChanges='true' selectOnClick='true' required='true' dojoAttachPoint='intBox' dojoAttachEvent='onKeyDown: _onKeyDown, onChange: _onChange'/><label class='dijitLeft dijitInline boxLabel' for='${textBoxId}' tabindex='-1'>${paramLabel}</label></div><div class='dijitEditorAutoSaveSettingButtonArea' tabindex='-1'><button dojoType='dijit.form.Button' dojoAttachEvent='onClick: onOk'>${btnOk}</button><button dojoType='dijit.form.Button' dojoAttachEvent='onClick: onCancel'>${btnCancel}</button></div></div></span>",
postMixInProperties:function(){this.id=c.getUniqueId(this.declaredClass.replace(/\./g,"_"));this.dialogId=this.id+"_dialog";this.textBoxId=this.id+"_textBox"},show:function(){this._value==""?(this._value=0,this.intBox.set("value",0)):this.intBox.set("value",this._value);this.dialog.show();c.selectInputText(this.intBox.focusNode)},hide:function(){this.dialog.hide()},onOk:function(){this.dialog.hide()},onCancel:function(){this.dialog.hide()},_onKeyDown:function(a){if(a.keyCode==b.keys.ENTER)this.onOk()},
_onChange:function(a){this._isValidValue(a)?this._value=a:this.intBox.set("value",this._value)},_setValueAttr:function(a){if(this._isValidValue(a))this._value=a},_getValueAttr:function(){return this._value},_isValidValue:function(a){var b=/^\d{0,3}$/,a=String(a);return Boolean(a.match?a.match(b):"")}});b.declare("dojox.editor.plugins.AutoSave",d.editor.plugins.Save,{url:"",logResults:!0,interval:0,_iconClassPrefix:"dijitEditorIconAutoSave",_MIN:6E4,_setIntervalAttr:function(a){this.interval=a},_getIntervalAttr:function(){return this._interval},
setEditor:function(a){this.editor=a;this._strings=b.i18n.getLocalization("dojox.editor.plugins","AutoSave");this._initButton();this._saveSettingDialog=new d.editor.plugins._AutoSaveSettingDialog({dialogTitle:this._strings.saveSettingdialogTitle,dialogDescription:this._strings.saveSettingdialogDescription,paramName:this._strings.saveSettingdialogParamName,paramLabel:this._strings.saveSettingdialogParamLabel,btnOk:this._strings.saveSettingdialogButtonOk,btnCancel:this._strings.saveSettingdialogButtonCancel});
this.connect(this._saveSettingDialog,"onOk","_onDialogOk");a=this._promDialog=new c.TooltipDialog;a.startup();a.set("content","")},_initButton:function(){var a=new c.Menu({style:"display: none"}),d=new c.MenuItem({iconClass:this._iconClassPrefix+"Default "+this._iconClassPrefix,label:this._strings.saveLabel}),e=this._menuItemAutoSave=new c.MenuItem({iconClass:this._iconClassPrefix+"Setting "+this._iconClassPrefix,label:this._strings.saveSettingLabelOn});a.addChild(d);a.addChild(e);this.button=new c.form.ComboButton({label:this._strings.saveLabel,
iconClass:this._iconClassPrefix+"Default "+this._iconClassPrefix,showLabel:!1,dropDown:a});this.connect(this.button,"onClick","_save");this.connect(d,"onClick","_save");this._menuItemAutoSaveClickHandler=b.connect(e,"onClick",this,"_showAutSaveSettingDialog")},_showAutSaveSettingDialog:function(){var a=this._saveSettingDialog;a.set("value",this.interval);a.show()},_onDialogOk:function(){var a=this.interval=this._saveSettingDialog.get("value")*this._MIN;if(a>0)this._setSaveInterval(a),b.disconnect(this._menuItemAutoSaveClickHandler),
this._menuItemAutoSave.set("label",this._strings.saveSettingLabelOff),this._menuItemAutoSaveClickHandler=b.connect(this._menuItemAutoSave,"onClick",this,"_onStopClick"),this.button.set("iconClass",this._iconClassPrefix+"Setting "+this._iconClassPrefix)},_onStopClick:function(){this._clearSaveInterval();b.disconnect(this._menuItemAutoSaveClickHandler);this._menuItemAutoSave.set("label",this._strings.saveSettingLabelOn);this._menuItemAutoSaveClickHandler=b.connect(this._menuItemAutoSave,"onClick",this,
"_showAutSaveSettingDialog");this.button.set("iconClass",this._iconClassPrefix+"Default "+this._iconClassPrefix)},_setSaveInterval:function(a){if(!(a<=0))this._clearSaveInterval(),this._intervalHandler=setInterval(b.hitch(this,function(){if(!this._isWorking&&!this.get("disabled"))this._isWorking=!0,this._save()}),a)},_clearSaveInterval:function(){if(this._intervalHandler)clearInterval(this._intervalHandler),this._intervalHandler=null},onSuccess:function(a){this.button.set("disabled",!1);this._promDialog.set("content",
b.string.substitute(this._strings.saveMessageSuccess,{0:b.date.locale.format(new Date,{selector:"time"})}));c.popup.open({popup:this._promDialog,around:this.button.domNode});this._promDialogTimeout=setTimeout(b.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;c.popup.close(this._promDialog)}),3E3);this._isWorking=!1;this.logResults&&console.log(a)},onError:function(a){this.button.set("disabled",!1);this._promDialog.set("content",b.string.substitute(this._strings.saveMessageFail,
{0:b.date.locale.format(new Date,{selector:"time"})}));c.popup.open({popup:this._promDialog,around:this.button.domNode});this._promDialogTimeout=setTimeout(b.hitch(this,function(){clearTimeout(this._promDialogTimeout);this._promDialogTimeout=null;c.popup.close(this._promDialog)}),3E3);this._isWorking=!1;this.logResults&&console.log(a)},destroy:function(){this.inherited(arguments);this._menuItemAutoSave=null;if(this._promDialogTimeout)clearTimeout(this._promDialogTimeout),this._promDialogTimeout=null,
c.popup.close(this._promDialog);this._clearSaveInterval();if(this._saveSettingDialog)this._saveSettingDialog.destroyRecursive(),this._destroyRecursive=null;if(this._menuItemAutoSaveClickHandler)b.disconnect(this._menuItemAutoSaveClickHandler),this._menuItemAutoSaveClickHandler=null}});b.subscribe(c._scopeName+".Editor.getPlugin",null,function(a){if(!a.plugin&&a.args.name.toLowerCase()=="autosave")a.plugin=new d.editor.plugins.AutoSave({url:"url"in a.args?a.args.url:"",logResults:"logResults"in a.args?
a.args.logResults:!0,interval:"interval"in a.args?a.args.interval:5})});return d.editor.plugins.AutoSave});