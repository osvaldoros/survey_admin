//>>built
define("dojox/date/hebrew",["dojo/_base/kernel","dojo/date","./hebrew/Date"],function(i,j,h){i.getObject("date.hebrew",!0,dojox);i.experimental("dojox.date.hebrew");dojox.date.hebrew.getDaysInMonth=function(b){return b.getDaysInHebrewMonth(b.getMonth(),b.getFullYear())};dojox.date.hebrew.compare=function(b,c){b instanceof h&&(b=b.toGregorian());c instanceof h&&(c=c.toGregorian());return j.compare.apply(null,arguments)};dojox.date.hebrew.add=function(b,c,a){var e=new h(b);switch(c){case "day":e.setDate(b.getDate()+
a);break;case "weekday":var c=b.getDay(),d=0;a<0&&c==6&&(c=5,d=-1);if(c+a<5&&c+a>=0)e.setDate(b.getDate()+a+d);else{var f=a>0?5:-1,g=a>0?2:-2;if(a>0&&(c==5||c==6))d=4-c,c=4;var a=c+a-f,i=parseInt(a/5);e.setDate(b.getDate()-c+g+i*7+d+a%5+f)}break;case "year":e.setFullYear(b.getFullYear()+a);break;case "week":a*=7;e.setDate(b.getDate()+a);break;case "month":c=b.getMonth();a=c+a;b.isLeapYear(b.getFullYear())||(c<5&&a>=5?a++:c>5&&a<=5&&a--);e.setMonth(a);break;case "hour":e.setHours(b.getHours()+a);break;
case "minute":e._addMinutes(a);break;case "second":e._addSeconds(a);break;case "millisecond":e._addMilliseconds(a)}return e};dojox.date.hebrew.difference=function(b,c,a){var c=c||new h,a=a||"day",e=c.getFullYear()-b.getFullYear(),d=1;switch(a){case "weekday":d=Math.round(dojox.date.hebrew.difference(b,c,"day"));a=parseInt(dojox.date.hebrew.difference(b,c,"week"));if(d%7==0)d=a*5;else{var e=0,f=b.getDay(),g=c.getDay(),a=parseInt(d/7),c=d%7,b=new h(b);b.setDate(b.getDate()+a*7);b=b.getDay();if(d>0)switch(!0){case f==
5:e=-1;break;case f==6:e=0;break;case g==5:e=-1;break;case g==6:e=-2;break;case b+c>5:e=-2}else if(d<0)switch(!0){case f==5:e=0;break;case f==6:e=1;break;case g==5:e=2;break;case g==6:e=1;break;case b+c<0:e=2}d+=e;d-=a*2}break;case "year":d=e;break;case "month":f=c.toGregorian()>b.toGregorian()?c:b;a=c.toGregorian()>b.toGregorian()?b:c;g=f.getMonth();d=a.getMonth();if(e==0)d=!c.isLeapYear(c.getFullYear())&&f.getMonth()>5&&a.getMonth()<=5?f.getMonth()-a.getMonth()-1:f.getMonth()-a.getMonth();else{d=
!a.isLeapYear(a.getFullYear())&&d<6?13-d-1:13-d;d+=!f.isLeapYear(f.getFullYear())&&g>5?g-1:g;e=a.getFullYear()+1;for(f=f.getFullYear();e<f;e++)d+=a.isLeapYear(e)?13:12}c.toGregorian()<b.toGregorian()&&(d=-d);break;case "week":d=parseInt(dojox.date.hebrew.difference(b,c,"day")/7);break;case "day":d/=24;case "hour":d/=60;case "minute":d/=60;case "second":d/=1E3;case "millisecond":d*=c.toGregorian().getTime()-b.toGregorian().getTime()}return Math.round(d)};return dojox.date.hebrew});