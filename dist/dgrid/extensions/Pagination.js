//>>built
define("dgrid/extensions/Pagination",["../_StoreMixin","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on","dojo/query","dojo/string","dojo/has","put-selector/put","dojo/i18n!./nls/pagination","dojo/_base/sniff","xstyle/css!../css/extensions/Pagination.css"],function(r,s,t,o,j,k,p,m,c,q){return s([r],{rowsPerPage:10,pagingTextBox:!1,previousNextArrows:!0,firstLastArrows:!1,pagingLinks:2,pageSizeOptions:[],showFooter:!0,_currentPage:1,_total:0,buildRendering:function(){var e=this;
this.inherited(arguments);var b=this.paginationNode=c(this.footerNode,"div.dgrid-pagination"),a=this.paginationStatusNode=c(b,"div.dgrid-status"),g=this.pageSizeOptions;if(g.length){for(var d=c(b,"select.dgrid-page-size"),f=0;f<g.length;f++)c(d,"option",g[f],{value:g[f]});j(d,"change",function(){e.rowsPerPage=+d.value;e.gotoPage(1)})}a.innerHTML=p.substitute(q.status,{start:1,end:1,total:0});b=b=this.paginationNavigationNode=c(b,"div.dgrid-navigation");this.firstLastArrows&&c(b,"a[href=javascript:].dgrid-first",
"\u00ab");this.previousNextArrows&&c(b,"a[href=javascript:].dgrid-previous","\u2039");e=this;this.paginationLinksNode=c(b,"span.dgrid-pagination-links");this.previousNextArrows&&c(b,"a[href=javascript:].dgrid-next","\u203a");this.firstLastArrows&&c(b,"a[href=javascript:].dgrid-last","\u00bb");j(b,"a:click",function(){var a=this.className,c,b;if(!(e._isLoading||a.indexOf("dgrid-page-disabled")>-1))c=e._currentPage,b=Math.ceil(e._total/e.rowsPerPage),a=="dgrid-page-link"&&e.gotoPage(+this.innerHTML,
!0),a=="dgrid-first"?e.gotoPage(1):a=="dgrid-previous"?c>1&&e.gotoPage(c-1):a=="dgrid-next"?c<b&&e.gotoPage(c+1):a=="dgrid-last"&&e.gotoPage(b)})},_updateNavigation:function(e){function b(b){var f;a.pagingTextBox&&b==d?(f=c(g,"input.dgrid-page-input[type=text][value=$]",d),a._pagingTextBoxHandle=j(f,"change",function(){var b=+this.value;!isNaN(b)&&b>0&&b<=i&&a.gotoPage(+this.value,!0)})):f=c(g,"a[href=javascript:]"+(b==d?".dgrid-page-disabled":"")+".dgrid-page-link",b);b==d&&e&&f.focus()}var a=this,
g=this.paginationLinksNode,d=this._currentPage,f=this.pagingLinks,h=this.paginationNavigationNode,i=Math.ceil(this._total/this.rowsPerPage),l=this._pagingTextBoxHandle;l&&l.remove();g.innerHTML="";k(".dgrid-first, .dgrid-previous",h).forEach(function(a){c(a,(d==1?".":"!")+"dgrid-page-disabled")});k(".dgrid-last, .dgrid-next",h).forEach(function(a){c(a,(d==i?".":"!")+"dgrid-page-disabled")});if(f){b(1);h=d-f;for(h>2?c(g,"span.dgrid-page-skip","..."):h=2;h<Math.min(d+f+1,i);h++)b(h);d+f+1<i&&c(g,"span.dgrid-page-skip",
"...");b(i)}else a.pagingTextBox&&b(d)},refresh:function(){if(!this.store)throw Error("Pagination requires a store to operate.");this.inherited(arguments);this.gotoPage(1)},gotoPage:function(e,b){var a=this;this._trackError(function(){var g=a.rowsPerPage,d=(e-1)*g,f=t.mixin(a.get("queryOptions"),{start:d,count:g}),h,i=a.contentNode,l=a._rowIdToObject,j=5+a.id.length,k,n;for(k in l)a.row(k.substr(j)).remove();a._rowIdToObject={};i.innerHTML="";n=c(i,"div.dgrid-loading",a.loadingMessage);a._isLoading=
!0;h=a.store.query(a.query,f);return o.when(a.renderArray(h,n,f),function(){c(n,"!");delete a._isLoading;a.bodyNode.scrollTop=0;o.when(h.total,function(c){a.paginationStatusNode.innerHTML=p.substitute(q.status,{start:d+1,end:Math.min(c,d+g),total:c});a._total=c;a._currentPage=e;a._updateNavigation(b)});(m("ie")<7||m("ie")&&m("quirks"))&&a.resize()},function(b){delete a._isLoading;throw b;})})}})});