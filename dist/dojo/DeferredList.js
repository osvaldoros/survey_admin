//>>built
define("dojo/DeferredList",["./_base/kernel","./_base/Deferred","./_base/array"],function(b,c,d){b.DeferredList=function(a,b,i,j){var f=[];c.call(this);var e=this;a.length===0&&!b&&this.resolve([0,[]]);var g=0;d.forEach(a,function(c,d){function h(b,c){f[d]=[b,c];g++;g===a.length&&e.resolve(f)}c.then(function(a){b?e.resolve([d,a]):h(!0,a)},function(a){i?e.reject(a):h(!1,a);if(j)return null;throw a;})})};b.DeferredList.prototype=new c;b.DeferredList.prototype.gatherResults=function(a){a=new b.DeferredList(a,
!1,!0,!1);a.addCallback(function(a){var b=[];d.forEach(a,function(a){b.push(a[1])});return b});return a};return b.DeferredList});