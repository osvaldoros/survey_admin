//>>built
define("app/uicomponents/moreInfoRenderers/TestMoreInfoRenderer",["dojo/_base/declare","dojo/on","dojo/dom-class","dojo/_base/lang","app/uicomponents/MoreInfoRenderer","app/store/UIStores","app/utils/HashManager"],function(d,g,b,h,e,f,c){return d("app.uicomponents.moreInfoRenderers.TestMoreInfoRenderer",[e],{uiStores:f.getInstance(),hashManager:c.getInstance(),getName:function(){var a=[];this._data&&(typeof this._data.service=="object"&&this._data.service!=null&&a.push(this._data.service.name),typeof this._data.battery==
"object"&&this._data.battery!=null&&a.push(this._data.battery.name),typeof this._data.subtest_type=="object"&&this._data.subtest_type!=null&&a.push(this._data.subtest_type.name),typeof this._data.sample_type=="object"&&this._data.sample_type!=null&&a.push(this._data.sample_type.name),typeof this._data.collection_type=="object"&&this._data.collection_type!=null&&a.push(this._data.collection_type.name));return a.join(", ")},evaluateProperty:function(a,b){var d=this.inherited(arguments);if(a=="order_id")return"<li><strong>order</strong> : <a href="+
c.getInstance().addAuthToken(c.getInstance().addIdToURL(__.urls.model.links.editor.order,b))+' target="_blank"> '+b+"</a> </li>";return d},renderItem:function(){var a=this.isTest();this.name.innerHTML=a&&this.useLink?'<a href="'+c.getInstance().addAuthToken(c.getInstance().addIdToURL(__.urls.model.links.editor.test,this._data.id))+'" target="_blank">'+this.getName()+"</a>":this.getName();this._data&&((this._data.fixed==!0||this._data.fixed=="true")&&b.add(this.name,"lockedRow"),a&&!this._data.hasOwnProperty("perform_date")&&
!this._data.hasOwnProperty("status")&&b.add(this.name,"greenHighliteRow"))},isTest:function(){if(this._data&&this._data.hasOwnProperty("$ref")&&this._data.hasOwnProperty("service")&&typeof this._data.service=="object"&&this._data.service!=null&&this.uiStores.getPreloadedById("getServices",this._data.service.id)!=null)return!0;return!1}})});