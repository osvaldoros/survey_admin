//>>built
require({cache:{"url:dijit/templates/MenuBarItem.html":'<div class="dijitReset dijitInline dijitMenuItem dijitMenuItemLabel" data-dojo-attach-point="focusNode" role="menuitem" tabIndex="-1"\n\t\tdata-dojo-attach-event="onmouseenter:_onHover,onmouseleave:_onUnhover,ondijitclick:_onClick">\n\t<span data-dojo-attach-point="containerNode"></span>\n</div>\n'}});
define("dijit/MenuBarItem",["dojo/_base/declare","./MenuItem","dojo/text!./templates/MenuBarItem.html"],function(a,c,b){b=a("dijit._MenuBarItemMixin",null,{templateString:b,_setIconClassAttr:null});a=a("dijit.MenuBarItem",[c,b],{});a._MenuBarItemMixin=b;return a});