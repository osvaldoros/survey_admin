//>>built
define("app/utils/ArrayUtils",["dojo/_base/declare","dojo/_base/lang","./MathUtils"],function(c,h,i){c=c("app.utils.ArrayUtils",[],{});h.mixin(app.utils.ArrayUtils,{addIds:function(a){for(var b=0;b<a.length;b++)a[b].id=b;return a},addHexadecimalIds:function(a){if(a!=null&&a!=void 0)for(var b=0;b<a.length;b++)a[b].id=i.randomNumber();return a},indexOfObjectWithId:function(a,b){for(var d=0;d<a.length;d++)if(a[d].id==b)return d;return-1},cleanEmbeddedArrayForSaving:function(a,b){for(var d=[],c=0;c<a.length;c++){var g=
a[c],f={},e;for(e in g)e!="id"&&e!="__parent_entity"&&(f[e]=g[e]);typeof b=="function"&&(f=b(f));d.push(f)}return d}});return c});