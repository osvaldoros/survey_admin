//>>built
define(["dijit","dojo","dojox"],function(o,j,e){j.provide("dojox.secure.capability");e.secure.badProps=/^__|^(apply|call|callee|caller|constructor|eval|prototype|this|unwatch|valueOf|watch)$|__$/;e.secure.capability={keywords:["break","case","catch","const","continue","debugger","default","delete","do","else","enum","false","finally","for","function","if","in","instanceof","new","null","yield","return","switch","throw","true","try","typeof","var","void","while"],validate:function(a,f,e){function j(a){var d=
{};a.replace(/#\d+/g,function(a){var a=h[a.substring(1)],b;for(b in a){if(b==k)throw b;b=="this"&&a[":method"]&&a["this"]==1&&(b=k);b!=":method"&&(d[b]=2)}});a.replace(/(\W|^)([a-z_\$A-Z][\w_\$]*)/g,function(a,b,l){if(l.charAt(0)=="_")throw Error("Names may not start with _");d[l]=1});return d}function m(a,d,c,b,e,g){function f(a,b,d,c){c.replace(/,?([a-z\$A-Z][_\w\$]*)/g,function(a,b){if(b=="Class")throw Error("Class is reserved");delete i[b]})}g.replace(/(^|,)0:\s*function#(\d+)/g,function(a,b,
d){h[d][":method"]=1});g=g.replace(/(^|[^_\w\$])Class\s*\(\s*([_\w\$]+\s*,\s*)*#(\d+)/g,function(a,b,d,c){delete h[c][k];return(b||"")+(d||"")+"#"+c});i=j(g,d);d&&f(a,c,c,e);g.replace(/(\W|^)(var) ([ \t,_\w\$]+)/g,f);return(c||"")+(b||"")+"#"+(h.push(i)-1)}for(var n=this.keywords,c=0;c<n.length;c++)e[n[c]]=!0;var k="|this| keyword in object literal without a Class call",h=[];if(a.match(/[\u200c-\u200f\u202a-\u202e\u206a-\u206f\uff00-\uffff]/))throw Error("Illegal unicode characters detected");if(a.match(/\/\*@cc_on/))throw Error("Conditional compilation token is not allowed");
a=a.replace(/\\["'\\\/bfnrtu]/g,"@").replace(/\/\/.*|\/\*[\w\W]*?\*\/|("[^"]*")|('[^']*')/g,function(a){return a.match(/^\/\/|^\/\*/)?" ":"0"}).replace(/\.\s*([a-z\$_A-Z][\w\$_]*)|([;,{])\s*([a-z\$_A-Z][\w\$_]*\s*):/g,function(a,d,c,b){d=d||b;if(/^__|^(apply|call|callee|caller|constructor|eval|prototype|this|unwatch|valueOf|watch)$|__$/.test(d))throw Error("Illegal property name "+d);return c&&c+"0:"||"~"});a.replace(/([^\[][\]\}]\s*=)|((\Wreturn|\S)\s*\[\s*\+?)|([^=!][=!]=[^=])/g,function(a){if(!a.match(/((\Wreturn|[=\&\|\:\?\,])\s*\[)|\[\s*\+$/))throw Error("Illegal operator "+
a.substring(1));});var a=a.replace(RegExp("("+f.join("|")+")[\\s~]*\\(","g"),function(){return"new("}),i;do f=a.replace(/((function|catch)(\s+[_\w\$]+)?\s*\(([^\)]*)\)\s*)?{([^{}]*)}/g,m);while(f!=a&&(a=f));m(0,0,0,0,0,a);for(c in i)if(!(c in e))throw Error("Illegal reference to "+c);}}});