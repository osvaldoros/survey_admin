//>>built
define("dojox/app/module/history",["dojo/_base/kernel","dojo/_base/lang","dojo/_base/declare","dojo/on"],function(c,g,f,d){return f(null,{postCreate:function(){this.inherited(arguments);var a=window.location.hash;this._startView=(a&&a.charAt(0)=="#"?a.substr(1):a)||this.defaultView;d(this.domNode,"startTransition",c.hitch(this,"onStartTransition"));d(window,"popstate",c.hitch(this,"onPopState"))},startup:function(){this.inherited(arguments)},onStartTransition:function(a){console.log("onStartTransition",
a.detail.href,history.state);a.preventDefault&&a.preventDefault();var b=a.detail.target,e=/#(.+)/;!b&&e.test(a.detail.href)&&(b=a.detail.href.match(e)[1]);a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation();c.when(this.transition(b,c.mixin({reverse:!1},a.detail)),c.hitch(this,function(){history.pushState(a.detail,a.detail.href,a.detail.url)}))},onPopState:function(a){if(this.getStatus()===this.lifecycle.STARTED){var b=a.state;b||(b=!this._startView&&window.location.hash?{target:location.hash&&
location.hash.charAt(0)=="#"?location.hash.substr(1):location.hash,url:location.hash}:{});var e=b.target||this._startView||this.defaultView;if(this._startView)this._startView=null;var d=b.title||null,f=b.url||null;a._sim&&history.replaceState(b,d,f);this.transition(e,c.mixin({reverse:!0},b))}}})});