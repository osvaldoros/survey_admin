//>>built
define("app/uicomponents/ToolTipRenderer",["dojo/_base/declare","dojo/on","dojo/dom-class","dojo/_base/lang","./MoreInfoRenderer","app/utils/HashManager"],function(e,h,i,g,j,f){e=e("app.uicomponents.ToolTipRenderer",[],{});g.mixin(app.uicomponents.ToolTipRenderer,{hashManager:f.getInstance(),userTooltipFunction:function(a){var c="";if(a!=void 0){c+="<div class='moreInfo'>";c+="<h2>"+a.name+"</h2>";c+="<ul>";for(var b in a)if(!this.excludeProperties[b]){var d=null;if(typeof a[b]=="string")d=a[b];else if(typeof a[b]==
"object"&&a[b]!=null&&a[b].hasOwnProperty("name"))d=a[b].name;if(d!=null)if(d.length>30&&(d=d.substring(0,30)+"..."),b!="role")c+="<li><strong>"+b+"</strong> : "+d+"</li>";else{a.hasLink=!0;var e=f.getInstance().addAuthToken(f.getInstance().addIdToURL(__.urls.model.links.editor[a[b].$ref],a[b].id));c+="<li><strong>"+b+"</strong> : <a href="+e+' target="_blank"> '+d+"</a> </li>"}}c+="</ul>";c+="</div>"}return c}});return e});