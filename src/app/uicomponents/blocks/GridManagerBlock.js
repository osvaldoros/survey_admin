define([
	"dojo/_base/declare",
	"dojo/on",
	"dijit/_WidgetBase", 
	"dijit/_TemplatedMixin", 
	"dijit/_WidgetsInTemplateMixin",
	"app/mixins/StatefulModule",
	"app/mixins/GridManager",	
	"app/utils/HashManager",
	"dojo/text!./templates/GridManagerBlock.html", // this is what includes the html template
	"dojo/_base/lang",
	"dijit/form/Button",
	"dojo/dom-style"
	],
	function(declare, on, WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, GridManager, HashManager, template, lang, Button, domStyle){
	
	return declare("app.uicomponents.blocks.GridManagerBlock", [WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, StatefulModule, GridManager], {
			
			widgetsInTemplate: true, // To let the parser know that our template has nested widgets ( default is false to speed up parsing )
			templateString: template, // Our template - important!
			hashManager: HashManager.getInstance(),
			
			_firstActivation:true,
			_store:undefined,
			_rowRenderer:undefined,
			_edit_store:undefined,
			_columns:undefined,
			_updateStateHash:"dialogSetup",
			_base_query:undefined,
			_entityLabel:undefined,

			_showTotal:true,
			_showTitle:true,
			_showAddBtn:true,
			_showEditBtn:true,
			_showDeleteBtn:true,
			_showSearchFld:true,
			_requiredPermissions:null,

			startup:function(){
				this.inherited(arguments);
				
				this._grid = this.getWidget("_grid");
				this._searchFld = this.getWidget("_searchFld");
				this._addBtn = this.getWidget("_addBtn");
				this._editBtn = this.getWidget("_editBtn");
				this._deleteBtn = this.getWidget("_deleteBtn");
				this._total_node = this.getWidget("total_node");
				this._searchFldDiv = this.getWidget("_searchFldDiv");

				this.showOrHideStuff();
				
				if(typeof(this._entityLabel) == "string"){
					this._addBtn.set("label", this._addBtn.label + " " + this._entityLabel);
					this._editBtn.set("label", this._editBtn.label + " " + this._entityLabel);
					this._deleteBtn.set("label", this._deleteBtn.label + " " + this._entityLabel);
				}

				if(typeof(this._addBtnLabel) == "string"){
					this._addBtn.set("label", this._addBtnLabel);
				}				
				if(typeof(this._editBtnLabel) == "string"){
					this._editBtn.set("label", this._editBtnLabel);
				}				
				if(typeof(this._deleteBtnLabel) == "string"){
					this._deleteBtn.set("label", this._deleteBtnLabel);
				}
				
				var configObject ={
					grid:this._grid,
					addButton: this._addBtn,
					editButton: this._editBtn,
					deleteButton:this._deleteBtn,
					rowRenderer:this._rowRenderer,
					searchFld: this._searchFld
				}
				
				configObject.gridSelectionChangeCallBack = lang.hitch(this, "gridSelectionChangeCallBackStub");

				if(typeof(this._requiredPermissions) == "object" && this._requiredPermissions != null){
					configObject.requiredPermissions = this._requiredPermissions;
				}				
				if(typeof(this._selectionMode) != "undefined"){
					configObject.selectionMode = this._selectionMode;
				}
				if(typeof(this._store) != "undefined"){
					configObject.store = this._store;
				}				
				if(typeof(this._edit_store) != "undefined"){
					configObject.edit_store = this._edit_store;
				}
				if(typeof(this._columns) != "undefined"){
					configObject.columns = this._columns;
				}
				if(typeof(this._base_query) != "undefined"){
					configObject.base_query = this._base_query;
				}
				
				if(typeof(this.title) == "string"){
					this.title_node.innerHTML = this.title;
				}
				
				var styleObj = null;
				if(typeof(this.gridHeight) != "undefined"){
					if(styleObj == null) styleObj = {};
					styleObj.height = this.gridHeight;
				}

				var searchDivStyleObj = null;

				if(typeof(this.gridMarginTop) != "undefined"){
					if(styleObj == null) styleObj = {};
					styleObj["margin-top"] = this.gridMarginTop;
				}

				if(typeof(this.searchMarginTop) != "undefined"){
					if(searchDivStyleObj == null) searchDivStyleObj = {};
					searchDivStyleObj["margin-top"] = this.searchMarginTop;
				}

				if(styleObj != null){
					domStyle.set(this._grid.domNode, styleObj);
				}

				if(searchDivStyleObj != null){
					domStyle.set(this._searchFldDiv, searchDivStyleObj);
				}
				
				// setup the GridManager mixin
				this.configureGrid(configObject)
				
			},
			
			onActivate:function(){
				this.inherited(arguments);

				
				if(typeof(this.eventHandlers) == "undefined"){
					this.eventHandlers = [];
				}	
				
				// buttons and Grid events handled by GridManager

				if(!this._firstActivation){
					this.refresh();
				}


				this._firstActivation = false;
			},
			
			_setStoreOptionsAttr:function(value, /*Boolean?*/ priorityChange, /*String?*/ formattedValue){
				this.setStore(value); // value should be a configObject that can contain a store and columns
			},

			gridSelectionChangeCallBackStub:function(data){
				if(typeof(this.gridSelectionChangeCallBack) == "function"){
					this.gridSelectionChangeCallBack(data);
				}
			},
			
			onDeactivate:function(){
				this.inherited(arguments);
				//remove event handlers
				for (var i=0; i < this.eventHandlers.length; i++) {
					var thisHandler = this.eventHandlers[i];
					if(typeof(thisHandler) != 'undefined'){
						thisHandler.remove();
					}
				};
				
				this.eventHandlers = []				
			},

			showOrHideStuff:function(){

				if(this._showAddBtn == true){
					this._addBtn.domNode.style.display = "";
				}else{
					this._addBtn.domNode.style.display = "none";
				}

				if(this._showEditBtn == true){
					this._editBtn.domNode.style.display = "";
				}else{
					this._editBtn.domNode.style.display = "none";
				}

				if(this._showDeleteBtn == true){
					this._deleteBtn.domNode.style.display = "";
				}else{
					this._deleteBtn.domNode.style.display = "none";
				}

				if(this._showSearchFld == true){
					this._searchFld.domNode.style.display = "";
				}else{
					this._searchFld.domNode.style.display = "none";
				}

				if(this._showTitle == true){
					this.title_node.style.display = "";
				}else{
					this.title_node.style.display = "none";
				}

				if(this._showTotal == true){
					this._total_node.style.display = "";
				}else{
					this._total_node.style.display = "none";
				}

			},

			storeDataLoaded:function(data){
				this.inherited(arguments);
				var displayTotal = data.total;
				if(displayTotal == null) displayTotal = 0;

				var pluralString = (displayTotal > 1 || displayTotal == 0) ? "s" : "";

				this._total_node.innerHTML = displayTotal + " record" + pluralString;
			},
			
			destroy:function(){
				this._grid.destroy();
				this.inherited(arguments);
			},
			
			resize : function(){
				this.inherited(arguments);
				this._grid.resize();
			}
			
	});
});
