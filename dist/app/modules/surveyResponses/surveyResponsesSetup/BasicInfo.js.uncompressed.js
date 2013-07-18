//>>built
require({cache:{
'url:app/modules/surveyResponses/surveyResponsesSetup/templates/BasicInfo.html':"<div class=\"moduleContainer\" class=\"centerPanel\" data-dojo-type=\"dijit.layout.ContentPane\" data-dojo-props=\"region: 'center'\">\n\t\n\t<form dojoType=\"app.form.Manager\" data-dojo-attach-point=\"surveyResponseBasicInfoForm\" method=\"post\">\n\t\t<table cellpadding=\"0\" cellspacing=\"2\" style=\"width: 100%;\">\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Name*: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"name\" data-dojo-attach-point=\"name\" observer=\"recordChange\" placeholder=\"Acme Lab Inc\" dojoType=\"dijit.form.ValidationTextBox\" missingMessage=\"Ooops!  You forgot the survey Response name\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Age: </td>\n\t\t\t\t<td><input type=\"text\" required=\"true\" name=\"age\" data-dojo-attach-point=\"age\" observer=\"recordChange\" placeholder=\"18\" dojoType=\"dijit.form.ValidationTextBox\" missingMessage=\"Ooops!  You forgot the survey Response age\" /></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Client: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"client\" name=\"client_id\" data-dojo-attach-point=\"clientBox\" store=\"{config:{url:'CLIENT', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Education: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"education\" name=\"education_id\" data-dojo-attach-point=\"educationBox\" store=\"{config:{url:'EDUCATION', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">English Proficiency: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"english_proficiency\" name=\"english_proficiency_id\" data-dojo-attach-point=\"english_proficiencyBox\" store=\"{config:{url:'ENGLISH_PROFICIENCY', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Immigration Status: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"immigration_status\" name=\"immigration_status_id\" data-dojo-attach-point=\"immigration_statusBox\" store=\"{config:{url:'IMMIGRATION_STATUS', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Home Life: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"home_life\" name=\"home_life_id\" data-dojo-attach-point=\"home_lifeBox\" store=\"{config:{url:'HOME_LIFE', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Income: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"income\" name=\"income_id\" data-dojo-attach-point=\"incomeBox\" store=\"{config:{url:'INCOME', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Relationship Status: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"relationship_status\" name=\"relationship_status_id\" data-dojo-attach-point=\"relationship_statusBox\" store=\"{config:{url:'RELATIONSHIP_STATUS', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td  label=\"true\">Gender: </td>\n\t\t\t\t<td><select data-dojo-attach-point=\"gender\" name=\"gender_id\" data-dojo-attach-point=\"genderBox\" store=\"{config:{url:'GENDER', selectFirst:true}}\" observer=\"recordChange, refreshUI\" dojoType=\"app.form.FilteringSelect\" maxHeight=\"200\"></select></td>\n\t\t\t\t<td></td>\n\t\t\t</tr>\n\t\t</table>\n\t</form>\n\t\n\t\n</div>"}});
define("app/modules/surveyResponses/surveyResponsesSetup/BasicInfo", [
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"dojo/text!./templates/BasicInfo.html", // this is what includes the html template
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"dijit/registry",
	"dijit/Dialog",
	
	"dgrid/GridFromHtml", 
	"dojo/store/Memory", 
	"dojo/store/Observable", 
	"dojo/store/Cache", 
	"app/store/JsonRest", 
	"dgrid/Selection", 
	"dojo/parser", 
	"dojo/query", 
	"dijit/form/Button",
	
	"dojox/validate",
	"dojox/validate/web",
	"app/form/Manager",
	"app/mixins/FormManager",	
	"dijit/form/Textarea",
	"dijit/form/TextBox",
	"dijit/form/TimeTextBox",
	"dijit/form/DateTextBox",
	"dijit/form/Select",
	"dijit/form/ComboBox",
	"app/form/FilteringSelect",
	"dijit/form/CheckBox",
	"dijit/form/RadioButton",
	"dijit/form/ValidationTextBox",
	
	"dojox/form/CheckedMultiSelect",
	"dojox/form/BusyButton",
	
	"app/store/UIStores",
	"app/uicomponents/Map"
	
	
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, template, lang, Deferred, registry, Dialog, GridFromHtml, Memory, Observable, Cache, JsonRest, Selection, parser, query, Button,
			Validate, Validate_web, Manager, DCFormManager, Textarea, TextBox, TimeTextBox, DateTextBox, Select, ComboBox, FilteringSelect, CheckBox, RadioButton, ValidationTextBox, CheckedMultiSelect, BusyButton,
			UIStores, Map){
	
	/*
	 * 
	 * *IMPORTANT
	 * 
	 * This component doesn't extend ContentPane because of an inconsisten behaviour in the Dojo framework. 
	 * 
	 *  - instances of Dgrid cannot be access via diji.byId('')
	 *  - when using ContentPane the template is assigned to the content property therefore attach-points are inaccesible and the only way to access components is diji.byId()
	 *  - Not extending ContentPane (or similar) means we are not a true dijit widget? (guess) and so layout widgets don't render properly so whenever we use grids we must be careful
	 * 
	 * TODO: 
	 * 
	 *  - find a way to make components that don't extend ContentPane that can render all layout widgets correctly, Then we'll be able to get the best of both worlds.
	 * 
	 */
	
	return declare("app.modules.surveyResponses.surveyResponseSetup.BasicInfo", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, DCFormManager], {

			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			uiStores: UIStores.getInstance(),
	
			/**
			 * 
			 * startup is called by the framework as part of the livecycle of all widgets, it happens after the children widgets have been created and are ready to be used
			 * Notice we don't use postCreate because the child widgets haven't been created yet, and we need to wait for the dgrid to attach the store to it
			 * 
			 */
			startup:function(){
				this.inherited(arguments);
				
				// get a reference to the form and set the storeURL on it ( the store to which this form would commit data )				
				this.surveyResponseBasicInfoForm = this.getWidget('surveyResponseBasicInfoForm');
				this.surveyResponseBasicInfoForm.set('storeURL', __.urls.PARTICIPANT);
				this.surveyResponseBasicInfoForm.set('refreshUI', lang.hitch(this, "refreshFormUI"));
				
				
				this.configureForm(this.surveyResponseBasicInfoForm);
			},
			
			refreshFormUI:function(value, name, element, event){
			},
			
			onActivate:function(){
				this.inherited(arguments);
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}								
				this.viewInForm(this.getUpdatingEntity(), this.surveyResponseBasicInfoForm);				
			},
			
			onDeactivate:function(){
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},
			
			
			destroy:function(){
    			this.inherited(arguments);	
			}
	});
});
