//>>built
define("dojo/aspect",[],function(){function l(h,b,e,i){var d=h[b],g=b=="around",a;if(g){var m=e(function(){return d.advice(this,arguments)});a={remove:function(){a.cancelled=!0},advice:function(b,c){return a.cancelled?d.advice(b,c):m.apply(b,c)}}}else a={remove:function(){var f=a.previous,c=a.next;if(!c&&!f)delete h[b];else if(f?f.next=c:h[b]=c,c)c.previous=f},id:k++,advice:e,receiveArguments:i};if(d&&!g)if(b=="after"){for(e=d;e;)d=e,e=e.next;d.next=a;a.previous=d}else{if(b=="before")h[b]=a,a.next=
d,d.previous=a}else h[b]=a;return a}function j(h){return function(b,e,i,d){var g=b[e],a;if(!g||g.target!=b){b[e]=a=function(){for(var b=k,f=arguments,c=a.before;c;)f=c.advice.apply(this,f)||f,c=c.next;if(a.around)var d=a.around.advice(this,f);for(c=a.after;c&&c.id<b;)d=c.receiveArguments?c.advice.apply(this,f)||d:c.advice.call(this,d),c=c.next;return d};if(g)a.around={advice:function(a,b){return g.apply(a,b)}};a.target=b}b=l(a||g,h,i,d);i=null;return b}}var k=0;return{before:j("before"),around:j("around"),
after:j("after")}});