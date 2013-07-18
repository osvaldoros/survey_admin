//>>built
define("dojox/date/hebrew/numerals",["dojo/_base/kernel","dojo/_base/array"],function(e){e.getObject("date.hebrew.numerals",!0,dojox);e.experimental("dojox.date.hebrew.numerals");var f=function(a,b){a=a.replace("\u05d9\u05d4","\u05d8\u05d5").replace("\u05d9\u05d5","\u05d8\u05d6");if(!b){var d=a.length;d>1?a=a.substr(0,d-1)+'"'+a.charAt(d-1):a+="\u05f3"}return a},h=function(a){var b=0;e.forEach(a,function(a){var c;if((c="\u05d0\u05d1\u05d2\u05d3\u05d4\u05d5\u05d6\u05d7\u05d8".indexOf(a))!=-1)b+=++c;
else if((c="\u05d9\u05db\u05dc\u05de\u05e0\u05e1\u05e2\u05e4\u05e6".indexOf(a))!=-1)b+=10*++c;else if((c="\u05e7\u05e8\u05e9\u05ea".indexOf(a))!=-1)b+=100*++c});return b},g=function(a){for(var b="",d=4,c=9;a;)a>=d*100?(b+="\u05e7\u05e8\u05e9\u05ea".charAt(d-1),a-=d*100):d>1?d--:a>=c*10?(b+="\u05d9\u05db\u05dc\u05de\u05e0\u05e1\u05e2\u05e4\u05e6".charAt(c-1),a-=c*10):c>1?c--:a>0&&(b+="\u05d0\u05d1\u05d2\u05d3\u05d4\u05d5\u05d6\u05d7\u05d8".charAt(a-1),a=0);return b};dojox.date.hebrew.numerals.getYearHebrewLetters=
function(a){return f(g(a%1E3))};dojox.date.hebrew.numerals.parseYearHebrewLetters=function(a){return h(a)+5E3};dojox.date.hebrew.numerals.getDayHebrewLetters=function(a,b){return f(g(a),b)};dojox.date.hebrew.numerals.parseDayHebrewLetters=function(a){return h(a)};dojox.date.hebrew.numerals.getMonthHebrewLetters=function(a){return f(g(a+1))};dojox.date.hebrew.numerals.parseMonthHebrewLetters=function(a){a=dojox.date.hebrew.numerals.parseDayHebrewLetters(a)-1;if(a==-1||a>12)throw Error("The month name is incorrect , month = "+
a);return a};return dojox.date.hebrew.numerals});