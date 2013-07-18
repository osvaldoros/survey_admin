//>>built
define(["dijit","dojo","dojox","dojo/require!dijit/_Templated,dijit/_Widget"],function(b,a){a.provide("dojox.data.demos.widgets.FileView");a.require("dijit._Templated");a.require("dijit._Widget");a.declare("dojox.data.demos.widgets.FileView",[b._Widget,b._Templated],{templateString:a.cache("dojox","data/demos/widgets/templates/FileView.html",'<div class="fileView">\n\t<div class="fileViewTitle">File Details:</div>\n\t<table class="fileViewTable">\n\t\t<tbody>\n\t\t\t<tr class="fileName">\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tName:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td dojoAttachPoint="nameNode">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tPath:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td dojoAttachPoint="pathNode">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tSize:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<span dojoAttachPoint="sizeNode"></span>&nbsp;bytes.\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tIs Directory:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td dojoAttachPoint="directoryNode">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tParent Directory:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td dojoAttachPoint="parentDirNode">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\t<b>\n\t\t\t\t\t\tChildren:\n\t\t\t\t\t</b>\n\t\t\t\t</td>\n\t\t\t\t<td dojoAttachPoint="childrenNode">\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</tbody>\n\t</table>\n</div>\n'),
titleNode:null,descriptionNode:null,imageNode:null,authorNode:null,name:"",path:"",size:0,directory:!1,parentDir:"",children:[],postCreate:function(){this.nameNode.appendChild(document.createTextNode(this.name));this.pathNode.appendChild(document.createTextNode(this.path));this.sizeNode.appendChild(document.createTextNode(this.size));this.directoryNode.appendChild(document.createTextNode(this.directory));this.parentDirNode.appendChild(document.createTextNode(this.parentDir));if(this.children&&this.children.length>
0){var a;for(a=0;a<this.children.length;a++)this.childrenNode.appendChild(document.createTextNode(this.children[a])),a<this.children.length-1&&this.childrenNode.appendChild(document.createElement("br"))}}})});