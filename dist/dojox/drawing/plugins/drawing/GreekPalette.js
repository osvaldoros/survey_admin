//>>built
define(["dijit","dojo","dojox","dojo/i18n!dojox/editor/plugins/nls/latinEntities","dojo/require!dojox/drawing/library/greek,dijit/focus,dijit/_Widget,dijit/_TemplatedMixin,dijit/_PaletteMixin,dojo/i18n"],function(c,b,l){b.provide("dojox.drawing.plugins.drawing.GreekPalette");b.require("dojox.drawing.library.greek");b.require("dijit.focus");b.require("dijit._Widget");b.require("dijit._TemplatedMixin");b.require("dijit._PaletteMixin");b.require("dojo.i18n");b.requireLocalization("dojox.editor.plugins",
"latinEntities");b.declare("dojox.drawing.plugins.drawing.GreekPalette",[c._Widget,c._TemplatedMixin,c._PaletteMixin],{postMixInProperties:function(){var a=l.drawing.library.greek,b=0,c;for(c in a)b++;var b=Math.floor(Math.sqrt(b)),h=0,e=[],f=[];for(c in a)h++,f.push(c),h%b===0&&(e.push(f),f=[]);f.length>0&&e.push(f);this._palette=e},show:function(a){b.mixin(a,{popup:this});c.popup.open(a)},onChange:function(a){var b=this._textBlock;c.popup.hide(this);b.insertText(this._pushChangeTo,a);b._dropMode=
!1},onCancel:function(){c.popup.hide(this);this._textBlock._dropMode=!1},templateString:'<div class="dojoxEntityPalette">\n\t<table>\n\t\t<tbody>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<table class="dijitPaletteTable">\n\t\t\t\t\t\t<tbody dojoAttachPoint="gridNode"></tbody>\n\t\t\t\t   </table>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<table dojoAttachPoint="previewPane" class="dojoxEntityPalettePreviewTable">\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td class="dojoxEntityPalettePreviewDetailEntity">Type: <span class="dojoxEntityPalettePreviewDetail" dojoAttachPoint="previewNode"></span></td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n</div>',
baseClass:"dojoxEntityPalette",showPreview:!0,dyeClass:"dojox.drawing.plugins.Greeks",paletteClass:"editorLatinEntityPalette",cellClass:"dojoxEntityPaletteCell",buildRendering:function(){this.inherited(arguments);this._preparePalette(this._palette,b.i18n.getLocalization("dojox.editor.plugins","latinEntities"));var a=b.query(".dojoxEntityPaletteCell",this.gridNode);b.forEach(a,function(a){this.connect(a,"onmouseenter","_onCellMouseEnter")},this)},_onCellMouseEnter:function(a){this.showPreview&&this._displayDetails(a.target)},
_onCellClick:function(a){var g=a.type=="click"?a.currentTarget:this._currentFocus,i=this._getDye(g).getValue();this._setCurrent(g);setTimeout(b.hitch(this,function(){c.focus(g);this._setValueAttr(i,!0)}));b.removeClass(g,"dijitPaletteCellHover");b.stopEvent(a)},postCreate:function(){this.inherited(arguments);this.showPreview||b.style(this.previewNode,"display","none");c.popup.moveOffScreen(this)},_setCurrent:function(a){"_currentFocus"in this&&(b.attr(this._currentFocus,"tabIndex","-1"),b.removeClass(this._currentFocus,
"dojoxEntityPaletteCellHover"));if(this._currentFocus=a)b.attr(a,"tabIndex",this.tabIndex),b.addClass(this._currentFocus,"dojoxEntityPaletteCellHover");this.showPreview&&this._displayDetails(a)},_displayDetails:function(a){(a=this._getDye(a))?this.previewNode.innerHTML=a.getValue():(this.previewNode.innerHTML="",this.descNode.innerHTML="")},_preparePalette:function(a,c){this._cells=[];for(var i=this._blankGif,h=b.getObject(this.dyeClass),e=0;e<a.length;e++)for(var f=b.create("tr",{tabIndex:"-1"},
this.gridNode),j=0;j<a[e].length;j++){var d=a[e][j];if(d){var k=new h(d),d=b.create("td",{"class":this.cellClass,tabIndex:"-1",title:c[d]});k.fillCell(d,i);this.connect(d,"ondijitclick","_onCellClick");this._trackMouseState(d,this.cellClass);b.place(d,f);d.index=this._cells.length;this._cells.push({node:d,dye:k})}}this._xDim=a[0].length;this._yDim=a.length},_navigateByArrow:function(a){a=this._currentFocus.index+{38:-this._xDim,40:this._xDim,39:this.isLeftToRight()?1:-1,37:this.isLeftToRight()?-1:
1}[a.keyCode];a<this._cells.length&&a>-1&&this._setCurrent(this._cells[a].node)}});b.declare("dojox.drawing.plugins.Greeks",null,{constructor:function(a){this._alias=a},getValue:function(){return this._alias},fillCell:function(a){a.innerHTML="&"+this._alias+";"}})});