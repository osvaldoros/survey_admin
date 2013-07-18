//>>built
define("dojox/date/buddhist",["dojo/_base/kernel","dojo/date","./buddhist/Date"],function(j,h,i){j.getObject("date.buddhist",!0,dojox);j.experimental("dojox.date.buddhist");dojox.date.buddhist.getDaysInMonth=function(b){return h.getDaysInMonth(b.toGregorian())};dojox.date.buddhist.isLeapYear=function(b){return h.isLeapYear(b.toGregorian())};dojox.date.buddhist.compare=function(b,c,a){return h.compare(b,c,a)};dojox.date.buddhist.add=function(b,c,a){var e=new i(b);switch(c){case "day":e.setDate(b.getDate(!0)+
a);break;case "weekday":var d;(c=a%5)?d=parseInt(a/5):(c=a>0?5:-5,d=a>0?(a-5)/5:(a+5)/5);var f=b.getDay(),g=0;f==6&&a>0?g=1:f==0&&a<0&&(g=-1);f+=c;if(f==0||f==6)g=a>0?2:-2;e.setDate(b.getDate(!0)+(7*d+c+g));break;case "year":e.setFullYear(b.getFullYear()+a);break;case "week":a*=7;e.setDate(b.getDate(!0)+a);break;case "month":e.setMonth(b.getMonth()+a);break;case "hour":e.setHours(b.getHours()+a);break;case "minute":e._addMinutes(a);break;case "second":e._addSeconds(a);break;case "millisecond":e._addMilliseconds(a)}return e};
dojox.date.buddhist.difference=function(b,c,a){var c=c||new i,a=a||"day",e=c.getFullYear()-b.getFullYear(),d=1;switch(a){case "weekday":d=Math.round(dojox.date.buddhist.difference(b,c,"day"));e=parseInt(dojox.date.buddhist.difference(b,c,"week"));if(d%7==0)d=e*5;else{var a=0,f=b.getDay(),g=c.getDay(),e=parseInt(d/7),b=d%7,c=new i(c);c.setDate(c.getDate(!0)+e*7);c=c.getDay();if(d>0)switch(!0){case f==5:a=-1;break;case f==6:a=0;break;case g==5:a=-1;break;case g==6:a=-2;break;case c+b>5:a=-2}else if(d<
0)switch(!0){case f==5:a=0;break;case f==6:a=1;break;case g==5:a=2;break;case g==6:a=1;break;case c+b<0:a=2}d+=a;d-=e*2}break;case "year":d=e;break;case "month":a=c.toGregorian()>b.toGregorian()?c:b;f=c.toGregorian()>b.toGregorian()?b:c;g=a.getMonth();d=f.getMonth();if(e==0)d=a.getMonth()-f.getMonth();else{d=12-d;d+=g;e=f.getFullYear()+1;for(a=a.getFullYear();e<a;e++)d+=12}c.toGregorian()<b.toGregorian()&&(d=-d);break;case "week":d=parseInt(dojox.date.buddhist.difference(b,c,"day")/7);break;case "day":d/=
24;case "hour":d/=60;case "minute":d/=60;case "second":d/=1E3;case "millisecond":d*=c.toGregorian().getTime()-b.toGregorian().getTime()}return Math.round(d)};return dojox.date.buddhist});