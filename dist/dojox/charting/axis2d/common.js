//>>built
define("dojox/charting/axis2d/common",["dojo/_base/lang","dojo/_base/html","dojo/_base/window","dojo/dom-geometry","dojox/gfx"],function(j,m,h,p,n){var m=j.getObject("dojox.charting.axis2d.common",!0),o=function(a){a.marginLeft="0px";a.marginTop="0px";a.marginRight="0px";a.marginBottom="0px";a.paddingLeft="0px";a.paddingTop="0px";a.paddingRight="0px";a.paddingBottom="0px";a.borderLeftWidth="0px";a.borderTopWidth="0px";a.borderRightWidth="0px";a.borderBottomWidth="0px"};return j.mixin(m,{createText:{gfx:function(a,
d,c,f,h,i,k,l){return d.createText({x:c,y:f,text:i,align:h}).setFont(k).setFill(l)},html:function(a,d,c,f,j,i,k,l,g){var d=h.doc.createElement("div"),b=d.style,e;if(a.getTextDir)d.dir=a.getTextDir(i);o(b);b.font=k;d.innerHTML=String(i).replace(/\s/g,"&nbsp;");b.color=l;b.position="absolute";b.left="-10000px";h.body().appendChild(d);i=n.normalizedLength(n.splitFontString(k).size);if(!g)d.getBoundingClientRect?(e=d.getBoundingClientRect(),e=e.width||e.right-e.left):e=p.getMarginBox(d).w;d.dir=="rtl"&&
(c+=g?g:e);h.body().removeChild(d);b.position="relative";if(g)switch(b.width=g+"px",j){case "middle":b.textAlign="center";b.left=c-g/2+"px";break;case "end":b.textAlign="right";b.left=c-g+"px";break;default:b.left=c+"px",b.textAlign="left"}else switch(j){case "middle":b.left=Math.floor(c-e/2)+"px";break;case "end":b.left=Math.floor(c-e)+"px";break;default:b.left=Math.floor(c)+"px"}b.top=Math.floor(f-i)+"px";b.whiteSpace="nowrap";c=h.doc.createElement("div");f=c.style;o(f);f.width="0px";f.height="0px";
c.appendChild(d);a.node.insertBefore(c,a.node.firstChild);return c}}})});