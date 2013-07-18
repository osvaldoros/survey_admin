//>>built
require({cache:{"url:dijit/layout/templates/ScrollingTabController.html":'<div class="dijitTabListContainer-${tabPosition}" style="visibility:hidden">\n\t<div data-dojo-type="dijit.layout._ScrollingTabControllerMenuButton"\n\t\t\tclass="tabStripButton-${tabPosition}"\n\t\t\tid="${id}_menuBtn"\n\t\t\tdata-dojo-props="containerId: \'${containerId}\', iconClass: \'dijitTabStripMenuIcon\',\n\t\t\t\t\tdropDownPosition: [\'below-alt\', \'above-alt\']"\n\t\t\tdata-dojo-attach-point="_menuBtn" showLabel="false" title="">&#9660;</div>\n\t<div data-dojo-type="dijit.layout._ScrollingTabControllerButton"\n\t\t\tclass="tabStripButton-${tabPosition}"\n\t\t\tid="${id}_leftBtn"\n\t\t\tdata-dojo-props="iconClass:\'dijitTabStripSlideLeftIcon\', showLabel:false, title:\'\'"\n\t\t\tdata-dojo-attach-point="_leftBtn" data-dojo-attach-event="onClick: doSlideLeft">&#9664;</div>\n\t<div data-dojo-type="dijit.layout._ScrollingTabControllerButton"\n\t\t\tclass="tabStripButton-${tabPosition}"\n\t\t\tid="${id}_rightBtn"\n\t\t\tdata-dojo-props="iconClass:\'dijitTabStripSlideRightIcon\', showLabel:false, title:\'\'"\n\t\t\tdata-dojo-attach-point="_rightBtn" data-dojo-attach-event="onClick: doSlideRight">&#9654;</div>\n\t<div class=\'dijitTabListWrapper\' data-dojo-attach-point=\'tablistWrapper\'>\n\t\t<div role=\'tablist\' data-dojo-attach-event=\'onkeypress:onkeypress\'\n\t\t\t\tdata-dojo-attach-point=\'containerNode\' class=\'nowrapTabStrip\'></div>\n\t</div>\n</div>',
"url:dijit/layout/templates/_ScrollingTabControllerButton.html":'<div data-dojo-attach-event="onclick:_onClick">\n\t<div role="presentation" class="dijitTabInnerDiv" data-dojo-attach-point="innerDiv,focusNode">\n\t\t<div role="presentation" class="dijitTabContent dijitButtonContents" data-dojo-attach-point="tabContent">\n\t\t\t<img role="presentation" alt="" src="${_blankGif}" class="dijitTabStripIcon" data-dojo-attach-point="iconNode"/>\n\t\t\t<span data-dojo-attach-point="containerNode,titleNode" class="dijitButtonText"></span>\n\t\t</div>\n\t</div>\n</div>'}});
define("dijit/layout/ScrollingTabController",["dojo/_base/array","dojo/_base/declare","dojo/dom-class","dojo/dom-geometry","dojo/dom-style","dojo/_base/fx","dojo/_base/lang","dojo/query","dojo/_base/sniff","../registry","dojo/text!./templates/ScrollingTabController.html","dojo/text!./templates/_ScrollingTabControllerButton.html","./TabController","./utils","../_WidgetsInTemplateMixin","../Menu","../MenuItem","../form/Button","../_HasDropDown","dojo/NodeList-dom"],function(j,f,g,k,c,l,o,p,d,q,i,h,
r,m,s,t,u,n,v){i=f("dijit.layout.ScrollingTabController",[r,s],{baseClass:"dijitTabController dijitScrollingTabController",templateString:i,useMenu:!0,useSlider:!0,tabStripClass:"",widgetsInTemplate:!0,_minScroll:5,_setClassAttr:{node:"containerNode",type:"class"},buildRendering:function(){this.inherited(arguments);var a=this.domNode;this.scrollNode=this.tablistWrapper;this._initButtons();if(!this.tabStripClass)this.tabStripClass="dijitTabContainer"+this.tabPosition.charAt(0).toUpperCase()+this.tabPosition.substr(1).replace(/-.*/,
"")+"None",g.add(a,"tabStrip-disabled");g.add(this.tablistWrapper,this.tabStripClass)},onStartup:function(){this.inherited(arguments);c.set(this.domNode,"visibility","");this._postStartup=!0},onAddChild:function(a){this.inherited(arguments);j.forEach(["label","iconClass"],function(b){this.pane2watches[a.id].push(this.pane2button[a.id].watch(b,o.hitch(this,function(){this._postStartup&&this._dim&&this.resize(this._dim)})))},this);c.set(this.containerNode,"width",c.get(this.containerNode,"width")+200+
"px")},onRemoveChild:function(a){if(this._selectedTab===this.pane2button[a.id].domNode)this._selectedTab=null;this.inherited(arguments)},_initButtons:function(){this._btnWidth=0;this._buttons=p("> .tabStripButton",this.domNode).filter(function(a){return this.useMenu&&a==this._menuBtn.domNode||this.useSlider&&(a==this._rightBtn.domNode||a==this._leftBtn.domNode)?(this._btnWidth+=k.getMarginSize(a).w,!0):(c.set(a,"display","none"),!1)},this)},_getTabsWidth:function(){var a=this.getChildren();if(a.length){var b=
a[this.isLeftToRight()?0:a.length-1].domNode,a=a[this.isLeftToRight()?a.length-1:0].domNode;return a.offsetLeft+c.get(a,"width")-b.offsetLeft}else return 0},_enableBtn:function(a){var b=this._getTabsWidth(),a=a||c.get(this.scrollNode,"width");return b>0&&a<b},resize:function(a){this._dim=a;this.scrollNode.style.height="auto";var b=this._contentBox=m.marginBox2contentBox(this.domNode,{h:0,w:a.w});b.h=this.scrollNode.offsetHeight;k.setContentSize(this.domNode,b);this._buttons.style("display",this._enableBtn(this._contentBox.w)?
"":"none");this._leftBtn.layoutAlign="left";this._rightBtn.layoutAlign="right";this._menuBtn.layoutAlign=this.isLeftToRight()?"right":"left";m.layoutChildren(this.domNode,this._contentBox,[this._menuBtn,this._leftBtn,this._rightBtn,{domNode:this.scrollNode,layoutAlign:"client"}]);if(this._selectedTab)this._anim&&this._anim.status()=="playing"&&this._anim.stop(),this.scrollNode.scrollLeft=this._convertToScrollLeft(this._getScrollForSelectedTab());this._setButtonClass(this._getScroll());this._postResize=
!0;return{h:this._contentBox.h,w:a.w}},_getScroll:function(){return this.isLeftToRight()||d("ie")<8||d("ie")&&d("quirks")||d("webkit")?this.scrollNode.scrollLeft:c.get(this.containerNode,"width")-c.get(this.scrollNode,"width")+(d("ie")==8?-1:1)*this.scrollNode.scrollLeft},_convertToScrollLeft:function(a){if(this.isLeftToRight()||d("ie")<8||d("ie")&&d("quirks")||d("webkit"))return a;else{var b=c.get(this.containerNode,"width")-c.get(this.scrollNode,"width");return(d("ie")==8?-1:1)*(a-b)}},onSelectChild:function(a){var b=
this.pane2button[a.id];if(b&&a){b=b.domNode;if(b!=this._selectedTab&&(this._selectedTab=b,this._postResize)){var e=this._getScroll();(e>b.offsetLeft||e+c.get(this.scrollNode,"width")<b.offsetLeft+c.get(b,"width"))&&this.createSmoothScroll().play()}this.inherited(arguments)}},_getScrollBounds:function(){var a=this.getChildren(),b=c.get(this.scrollNode,"width"),e=c.get(this.containerNode,"width")-b,d=this._getTabsWidth();return a.length&&d>b?{min:this.isLeftToRight()?0:a[a.length-1].domNode.offsetLeft,
max:this.isLeftToRight()?a[a.length-1].domNode.offsetLeft+c.get(a[a.length-1].domNode,"width")-b:e}:(a=this.isLeftToRight()?0:e,{min:a,max:a})},_getScrollForSelectedTab:function(){var a=this._selectedTab,b=c.get(this.scrollNode,"width"),e=this._getScrollBounds(),a=a.offsetLeft+c.get(a,"width")/2-b/2;return a=Math.min(Math.max(a,e.min),e.max)},createSmoothScroll:function(a){if(arguments.length>0)var b=this._getScrollBounds(),a=Math.min(Math.max(a,b.min),b.max);else a=this._getScrollForSelectedTab();
this._anim&&this._anim.status()=="playing"&&this._anim.stop();var e=this,c=this.scrollNode,d=new l.Animation({beforeBegin:function(){this.curve&&delete this.curve;var b=c.scrollLeft,f=e._convertToScrollLeft(a);d.curve=new l._Line(b,f)},onAnimate:function(a){c.scrollLeft=a}});this._anim=d;this._setButtonClass(a);return d},_getBtnNode:function(a){for(a=a.target;a&&!g.contains(a,"tabStripButton");)a=a.parentNode;return a},doSlideRight:function(a){this.doSlide(1,this._getBtnNode(a))},doSlideLeft:function(a){this.doSlide(-1,
this._getBtnNode(a))},doSlide:function(a,b){if(!b||!g.contains(b,"dijitTabDisabled")){var e=c.get(this.scrollNode,"width")*0.75*a,e=this._getScroll()+e;this._setButtonClass(e);this.createSmoothScroll(e).play()}},_setButtonClass:function(a){var b=this._getScrollBounds();this._leftBtn.set("disabled",a<=b.min);this._rightBtn.set("disabled",a>=b.max)}});h=f("dijit.layout._ScrollingTabControllerButtonMixin",null,{baseClass:"dijitTab tabStripButton",templateString:h,tabIndex:"",isFocusable:function(){return!1}});
f("dijit.layout._ScrollingTabControllerButton",[n,h]);f("dijit.layout._ScrollingTabControllerMenuButton",[n,v,h],{containerId:"",tabIndex:"-1",isLoaded:function(){return!1},loadDropDown:function(a){this.dropDown=new t({id:this.containerId+"_menu",dir:this.dir,lang:this.lang,textDir:this.textDir});var b=q.byId(this.containerId);j.forEach(b.getChildren(),function(a){this.dropDown.addChild(new u({id:a.id+"_stcMi",label:a.title,iconClass:a.iconClass,dir:a.dir,lang:a.lang,textDir:a.textDir,onClick:function(){b.selectChild(a)}}))},
this);a()},closeDropDown:function(){this.inherited(arguments);this.dropDown&&(this.dropDown.destroyRecursive(),delete this.dropDown)}});return i});