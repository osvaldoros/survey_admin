//>>built
define(["dijit","dojo","dojox","dojo/require!dojo/parser,dijit/_Widget,dijit/_Templated"],function(a,b){b.provide("dojox.wire.demos.TableContainer");b.require("dojo.parser");b.require("dijit._Widget");b.require("dijit._Templated");b.declare("dojox.wire.demos.TableContainer",[a._Widget,a._Templated,a._Container],{templateString:"<table class='tablecontainer'><tbody dojoAttachPoint='tableContainer'></tbody></table>",rowCount:0,headers:"",addRow:function(e){try{var c=document.createElement("tr");this.rowCount%
2===0&&b.addClass(c,"alternate");this.rowCount++;for(var f in e){var d=document.createElement("td"),a=document.createTextNode(e[f]);d.appendChild(a);c.appendChild(d)}this.tableContainer.appendChild(c)}catch(g){console.debug(g)}},clearTable:function(){for(;this.tableContainer.firstChild.nextSibling;)this.tableContainer.removeChild(this.tableContainer.firstChild.nextSibling);this.rowCount=0},postCreate:function(){var b=this.headers.split(","),c=document.createElement("tr");for(i in b){var a=b[i],d=
document.createElement("th"),a=document.createTextNode(a);d.appendChild(a);c.appendChild(d)}this.tableContainer.appendChild(c)}})});