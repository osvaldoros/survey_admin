//>>built
define("dojo/store/Cache",["../_base/lang","../_base/Deferred"],function(h,f){var i=h.getObject("dojo.store",!0);i.Cache=function(e,d,g){g=g||{};return h.delegate(e,{query:function(a,b){var c=e.query(a,b);c.forEach(function(a){(!g.isLoaded||g.isLoaded(a))&&d.put(a)});return c},queryEngine:e.queryEngine||d.queryEngine,get:function(a,b){return f.when(d.get(a),function(c){return c||f.when(e.get(a,b),function(b){b&&d.put(b,{id:a});return b})})},add:function(a,b){return f.when(e.add(a,b),function(c){return d.add(typeof c==
"object"?c:a,b)})},put:function(a,b){d.remove(b&&b.id||this.getIdentity(a));return f.when(e.put(a,b),function(c){return d.put(typeof c=="object"?c:a,b)})},remove:function(a,b){return f.when(e.remove(a,b),function(){return d.remove(a,b)})},evict:function(a){return d.remove(a)}})};return i.Cache});