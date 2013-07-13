/*
 * 
 */
define([
	"dojo/_base/declare",
	"dojo/_base/lang",
	"dojo/on",
	"dijit/popup",
	"dijit/TooltipDialog"
	],
	function(declare, lang, on, popup, TooltipDialog){
	
	var classRef = declare("app.utils.TooltipDialogController", [], {
		
		initDialog:function(content, button, positionOptions){
			this._button = button;
			var owner = this;

			if(typeof(positionOptions) != "object" || positionOptions == null){
				positionOptions = {around: this._button};
			}

			this.positionOptions = positionOptions;
			this.content = content;
			// create instance of the TooltipDialog
			this._tooltipDialog = new TooltipDialog({
				content: content,
				onMouseEnter:function(){
					owner.onMoreInfoHover();
				},
				onMouseLeave: function(){
					owner.onMoreInfoOut()
				}
			});

			if(typeof(this.content.startup) == "function"){
				this.content.startup();
			}


			// wire mouse events on the "button" to open the tooltip
			this._hoverHandler = on(this._button, 'click', lang.hitch(this, "onMoreInfoHover"));
			this._hoverHandler = on(this._button, 'mouseover', lang.hitch(this, "onMoreInfoHover"));
			this._outHandler = on(this._button, 'mouseout', lang.hitch(this, "onMoreInfoOut"));

		},

		onMoreInfoHover:function(){
			this._hovering = true;
			clearInterval(this._closeInterval)

			if(this._dialogOpened){
				this.popToolTip();
			}else{
				setTimeout(lang.hitch(this, "popToolTip"),500);
			}
		},

		popToolTip:function(){
			if(this._hovering || this._dialogOpened){

				var popupConfigObj = {
					popup: this._tooltipDialog
					//around: this._button
				}

				for(var p in this.positionOptions){
					popupConfigObj[p] = this.positionOptions[p];
				}

				popup.open(popupConfigObj)
				if(typeof(this.content.activate) == "function"){
					this.content.activate();
				}

				this._dialogOpened = true;
			}
		},

		closeTooltip:function(){
			popup.close(this._tooltipDialog);
			if(typeof(this.content.deactivate) == "function"){
				this.content.deactivate();
			}
			this.dialogClosed();
		},

		dialogClosed:function(){
			this._dialogOpened = false;
		},

		onMoreInfoOut:function(){
			this._closeInterval = setInterval(lang.hitch(this, "closeTooltip"), 200);
			this._hovering = false;
		},

		destroy:function(){
			this.inherited(arguments);
			if(typeof(this._hoverHandler) == "object" && this._hoverHandler != null){
				this._hoverHandler.remove();
			}
			if(typeof(this._outHandler) == "object" && this._outHandler != null){
				this._outHandler.remove();
			}
			if(typeof(this._tooltipDialog) == "object" && this._tooltipDialog != null){
				this._tooltipDialog.destroy();
			}
		}		

			
			
	});
	
	return classRef;
});
