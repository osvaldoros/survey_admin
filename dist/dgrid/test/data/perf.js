//>>built
define("dgrid/test/data/perf",["dojo/store/Memory","dojo/store/Observable"],function(d,e){for(var c=[],a=(new Date).getTime(),b=0;b<2E4;b++)c.push({id:b,integer:Math.floor(Math.random()*100),floatNum:Math.random()*100,date:new Date(a*Math.random()*2),date2:new Date(a-Math.random()*1E9),text:"A number in text "+Math.random(),bool:Math.random()>0.5,bool2:Math.random()>0.5,price:Math.random()*100,today:new Date(a)});return e(new d({data:c}))});