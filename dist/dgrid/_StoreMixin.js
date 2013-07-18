//>>built
define("dgrid/_StoreMixin",["dojo/_base/kernel","dojo/_base/declare","dojo/_base/lang","dojo/_base/Deferred","dojo/on"],function(g,l,d,k,m){function i(a){m.emit(this.domNode,"dgrid-error",{error:a,cancelable:!0,bubbles:!0})&&console.error(a)}return l(null,{store:null,query:null,queryOptions:null,getBeforePut:!0,noDataMessage:"",loadingMessage:"",constructor:function(){this.query={};this.queryOptions={};this.dirty={};this._updating={}},_configColumn:function(a){if(a.set){if(!this._columnsWithSet)this._columnsWithSet=
{};this._columnsWithSet[a.field]=a}},_configColumns:function(){this._columnsWithSet=null;return this.inherited(arguments)},_setStore:function(a,b,c){this.store=a;this.dirty={};this.set("query",b,c)},_setQuery:function(a,b){var c=b&&b.sort;this.query=a!==void 0?a:this.query;this.queryOptions=b||this.queryOptions;c?this.sort(c):this.refresh()},setStore:function(a,b,c){g.deprecated("setStore(...)",'use set("store", ...) instead',"dgrid 1.0");this.set("store",a,b,c)},setQuery:function(a,b){g.deprecated("setQuery(...)",
'use set("query", ...) instead',"dgrid 1.0");this.set("query",a,b)},_getQueryOptions:function(){var a=d.delegate(this.queryOptions,{});if(this._sort.length)a.sort=this._sort;return a},_getQuery:function(){var a=this.query;return typeof a=="object"&&a!=null?d.delegate(a,{}):a},_setSort:function(){if(this.store)this._lastCollection=null;this.inherited(arguments)},insertRow:function(a){var b=this.store,c=this.dirty,b=b&&b.getIdentity(a),f;b in c&&!(b in this._updating)&&(f=c[b]);f&&(a=d.delegate(a,f));
return this.inherited(arguments)},updateDirty:function(a,b,c){var f=this.dirty,e=f[a];e||(e=f[a]={});e[b]=c},setDirty:function(a,b,c){g.deprecated("setDirty(...)","use updateDirty() instead","dgrid 1.0");this.updateDirty(a,b,c)},save:function(){function a(a,d){return function(e){var g=b._columnsWithSet,i=b._updating,j,h;for(j in d)e[j]=d[j];if(g)for(j in g)h=g[j].set(e),h!==void 0&&(e[j]=h);i[a]=!0;return k.when(c.put(e),function(){delete f[a];delete i[a]})}}var b=this,c=this.store,f=this.dirty,e=
new k,d=e.promise,g=function(a){var d;return b.getBeforePut||!(d=b.row(a).data)?function(){return c.get(a)}:function(){return d}},h;for(h in f)var i=a(h,f[h]),d=d.then(g(h)).then(i);e.resolve();return d},revert:function(){this.dirty={};this.refresh()},_trackError:function(a){var b;typeof a=="string"&&(a=d.hitch(this,a));try{b=a()}catch(c){i.call(this,c)}return k.when(b,null,d.hitch(this,i))}})});