//>>built
define("app/modules/programs/ProgramGrid",["dojo/_base/declare","dojo/on","dojo/_base/lang","app/uicomponents/blocks/GridManagerBlock"],function(c,d,e,b){return c("app.modules.programs.ProgramGrid",[b],{title:"Programs",_store:__.urls.PROGRAM,_entityLabel:"Program",constructor:function(a){c.safeMixin(this,a||{});var b=this;this._baseColumns=[{label:"Name",field:"name",sortable:!0},{label:"Created",field:"created"}];this._columns=this._baseColumns.slice(0);this._base_query=function(){return b.getFilters()}},
_setClientFilterAttr:function(a){this._clientFilter=a;this._grid.refresh()},getFilters:function(){var a=!1;if(typeof this._clientFilter!="undefined"&&this._clientFilter!=null&&this._clientFilter!="ALL")a||(a={}),a.client_id=this._clientFilter;return a}})});