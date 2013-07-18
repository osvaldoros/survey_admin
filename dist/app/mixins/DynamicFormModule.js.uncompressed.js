//>>built
define("app/mixins/DynamicFormModule", [
	"dojo/_base/declare",
	"dojo/on",
	"app/mixins/StatefulModule",
	"dojo/_base/lang",
	"dijit/registry",
	"dijit/Dialog",
	"app/form/Manager",
	"app/form/DynamicForm",
	"app/mixins/FormManager",	
	"app/store/UIStores",
	"dojo/parser", 
	"dojo/query", 
	
	"dojox/validate",
	"dojox/validate/web",
	"dijit/form/Textarea",
	"dijit/form/TextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/DateTextBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	"dijit/form/Button",
	"app/meta/Schema",
	"app/utils/ChangeTracker"
	
	
	],
	function(declare, on, StatefulModule, lang, registry, Dialog, Manager, DynamicForm, DCFormManager, UIStores, parser, query,
			Validate, ValidateWeb, Textarea, TextBox, TimeTextBox, DateTextBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, Button, Schema, ChangeTracker
			){

	
	return declare("app.mixins.DynamicFormModule", [StatefulModule, DCFormManager, DynamicForm], {
			uiStores:UIStores.getInstance(),
			changeTracker:ChangeTracker.getInstance(),
			columns:2,
			showSubheadings:false,
			labelPlacement:"left",

			_loadingMeta:false,

			constructor: function(args){
	        	declare.safeMixin(this,args || {});
	        	this.formStyle = {
	        		"overflow": "auto",
					"height":"475px", 
					"margin-bottom": "5px",
					"background": "#FFFFFF"
	        	}
	        },


			startup:function(){
				this.inherited(arguments);
			},

			onActivate:function(){
    			this.inherited(arguments);	
    			this.loadMeta();
			},

			loadMeta:function(){
    			var currentEntity = this.getUpdatingEntity(); // the entity to populate the form with

    			// if this module has been injected formMeta via its parent use that meta to build the form
    			if(lang.isArray(this.formMeta)){
    				this.generateForm(this.formMeta, currentEntity);

    			// otherwise try to get the modelName either from the ref of the entity or from the storeURL and get our own meta that way
    			}else{
	    			
	    			var model;
	    			if(currentEntity != null ){
	    				model = currentEntity.$ref;	
	    			}else if(typeof(this.defaultModelName) == "string" && this.defaultModelName != ""){
	    				model = this.defaultModelName;
	    			}else if(typeof(this.storeURL) == "string" && this.storeURL != ""){
	    				model = Schema.getModelNameFromStoreURL(this.storeURL);
	    			}

	    			if(typeof(model) != "undefined"){
	    				this._loadingMeta = true;
						Schema.getModelAsDynamicForm(model, lang.hitch(this, "testMetaLoaded"));
	    			}
    			}
			},

			testMetaLoaded:function(formMeta){
				this.formMeta = formMeta; // store meta here so that the next time this module is activated we don't have to fetch it again
				this._loadingMeta = false;
				this.generateForm(formMeta, this.getUpdatingEntity())
			},

			isMetaLoading:function(){
				return  this._loadingMeta;
			},

			hasMeta:function(){
				return (typeof(this.formMeta) != "undefined" && this.formMeta != null);
			},

			generateForm:function(formMeta, entity){
				var formConfig = {
					columns: this.columns,
					showSubheadings: this.showSubheadings,
					labelPlacement: this.labelPlacement,
					style:this.formStyle
				}

				var changesObject;
				if(typeof(this.storeURL) == "string" && this.storeURL != ""){
					changesObject = this.changeTracker.getChangesObject(this.storeURL); // this is to populate the form always with the most up-to-date data ( if it has been modified and we switched forms or recreated the form )
				}

				this.generateMetaForm(formMeta, entity, changesObject, formConfig);
			},
			
			onDeactivate:function(){
				this.inherited(arguments);				
			}
			
	});
});
