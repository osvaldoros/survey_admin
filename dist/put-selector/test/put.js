//>>built
define(["dijit","dojo","dojox"],function(){var e=put("div");console.assert(e.tagName.toLowerCase()=="div");var f=document.body;put(f,"h1 $","Running put() tests");var a=e,b=put(a,"span.class-name-1.class-name-2[name=span1]");console.assert(b.className=="class-name-1 class-name-2");console.assert(b.getAttribute("name")=="span1");console.assert(b.parentNode==e);put(b,"!class-name-1.class-name-3[!name]");console.assert(b.className=="class-name-2 class-name-3");put(b,"!.class-name-3");console.assert(b.className==
"class-name-2");console.assert(b.getAttribute("name")==null);put(b,"[name=span1]");a=put(a," .class");console.assert(a.tagName.toLowerCase()=="div");var d,c=put(b,"+span[name=span2] + span[name=span3]");console.assert(c.getAttribute("name")=="span3");console.assert((d=c.previousSibling).getAttribute("name")=="span2");console.assert(c.previousSibling.previousSibling.getAttribute("name")=="span1");a=put(d,">",c,"span.$[name=$]","span3-child","span4");console.assert(c.parentNode==d);console.assert(a.parentNode==
c);console.assert(a.className=="span3-child");console.assert(a.getAttribute("name")=="span4");put(d,"+",c,"+",a);console.assert(d.nextSibling==c);console.assert(c.nextSibling==a);a=put("div.parent span.first $ + span.second $<","inside first","inside second");console.assert(a.firstChild.innerHTML,"inside first");console.assert(a.lastChild.innerHTML,"inside second");put(c,"!");console.assert(d.nextSibling!=c);b=put(b,"-span[name=span0]");console.assert(b.getAttribute("name")=="span0");d=put(b,"-span -span");
console.assert(d.nextSibling.nextSibling==b);b=put(a,"span#with-id");console.assert(b.id=="with-id");a=put(a,"table.class-name#id tr.class-name td[colSpan=2]<<tr.class-name td+td<<");console.assert(a.tagName.toLowerCase()=="table");console.assert(a.childNodes.length==2);console.assert(a.firstChild.className=="class-name");console.assert(a.firstChild.childNodes.length==1);console.assert(a.lastChild.className=="class-name");console.assert(a.lastChild.childNodes.length==2);put(a,"tr>td,tr>td+td");console.assert(a.childNodes.length==
4);console.assert(a.lastChild.childNodes.length==2);e=put(e,"input[type=checkbox][checked]");console.assert(e.type=="checkbox");console.assert(e.getAttribute("checked")=="checked");put(f,"div",{innerHTML:"finished tests, check console for errors"})});