//>>built
define("dijit/tree/ForestStoreModel",["dojo/_base/array","dojo/_base/declare","dojo/_base/lang","dojo/_base/window","./TreeStoreModel"],function(c,g,e,h,i){return g("dijit.tree.ForestStoreModel",i,{rootId:"$root$",rootLabel:"ROOT",query:null,constructor:function(a){this.root={store:this,root:!0,id:a.rootId,label:a.rootLabel,children:a.rootChildren}},mayHaveChildren:function(a){return a===this.root||this.inherited(arguments)},getChildren:function(a,b,d){a===this.root?this.root.children?b(this.root.children):
this.store.fetch({query:this.query,onComplete:e.hitch(this,function(a){this.root.children=a;b(a)}),onError:d}):this.inherited(arguments)},isItem:function(a){return a===this.root?!0:this.inherited(arguments)},fetchItemByIdentity:function(a){if(a.identity==this.root.id){var b=a.scope?a.scope:h.global;a.onItem&&a.onItem.call(b,this.root)}else this.inherited(arguments)},getIdentity:function(a){return a===this.root?this.root.id:this.inherited(arguments)},getLabel:function(a){return a===this.root?this.root.label:
this.inherited(arguments)},newItem:function(a,b){return b===this.root?(this.onNewRootItem(a),this.store.newItem(a)):this.inherited(arguments)},onNewRootItem:function(){},pasteItem:function(a,b,d,f,c){if(b===this.root&&!f)this.onLeaveRoot(a);this.inherited(arguments,[a,b===this.root?null:b,d===this.root?null:d,f,c]);if(d===this.root)this.onAddToRoot(a)},onAddToRoot:function(a){console.log(this,": item ",a," added to root")},onLeaveRoot:function(a){console.log(this,": item ",a," removed from root")},
_requeryTop:function(){var a=this.root.children||[];this.store.fetch({query:this.query,onComplete:e.hitch(this,function(b){this.root.children=b;if(a.length!=b.length||c.some(a,function(a,c){return b[c]!=a}))this.onChildrenChange(this.root,b)})})},onNewItem:function(){this._requeryTop();this.inherited(arguments)},onDeleteItem:function(a){c.indexOf(this.root.children,a)!=-1&&this._requeryTop();this.inherited(arguments)},onSetItem:function(){this._requeryTop();this.inherited(arguments)}})});