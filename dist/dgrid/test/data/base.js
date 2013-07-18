//>>built
define("dgrid/test/data/base",["dojo/_base/lang","dojo/_base/Deferred","dojo/store/Memory","dojo/store/Observable","dojo/store/util/QueryResults"],function(f,i,b,c,j){function k(a,h,e,d){var b,c=0;d||(d="order");return e?(b=e[d],a.query({},{}).forEach(function(a){a=a[d];a>c&&a<b&&(c=a)}),(b+c)/2):(b=0,a.query({},{}).forEach(function(a){a=a[d];a>b&&(b=a)}),b+1)}data={identifier:"id",label:"id",items:[]};data_list=[{col1:"normal",col2:!1,col3:"new",col4:"But are not followed by two hexadecimal",col5:29.91,
col6:10,col7:!1},{col1:"important",col2:!1,col3:"new",col4:"Because a % sign always indicates",col5:9.33,col6:-5,col7:!1},{col1:"important",col2:!1,col3:"read",col4:"Signs can be selectively",col5:19.34,col6:0,col7:!0},{col1:"note",col2:!1,col3:"read",col4:"However the reserved characters",col5:15.63,col6:0,col7:!0},{col1:"normal",col2:!1,col3:"replied",col4:"It is therefore necessary",col5:24.22,col6:5.5,col7:!0},{col1:"important",col2:!1,col3:"replied",col4:"To problems of corruption by",col5:9.12,
col6:-3,col7:!0},{col1:"note",col2:!1,col3:"replied",col4:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris",col5:12.15,col6:-4,col7:!1}];for(var a=0,g=data_list.length;a<100;a++)data.items.push(f.mixin({id:a},data_list[a%g]));testStore=c(new b({data:data}));testAsyncStore=c(new b({data:data,query:function(){var a=b.prototype.query.apply(this,arguments),h=
new i;setTimeout(function(){h.resolve(a)},200);var e=j(h.promise);e.total=a.total;return e}}));data2={identifier:"id",label:"id",items:[]};colors=[{col1:"Red",col2:!1,col3:"Primary",col4:"A primary color",col5:255,col6:0,col7:0},{col1:"Yellow",col2:!1,col3:"Primary",col4:"A primary color",col5:255,col6:255,col7:0},{col1:"Blue",col2:!1,col3:"Primary",col4:"A primary color",col5:0,col6:0,col7:255},{col1:"Orange",col2:!1,col3:"Secondary",col4:"A Secondary color",col5:255,col6:165,col7:0},{col1:"Purple",
col2:!1,col3:"Secondary",col4:"A Secondary color",col5:160,col6:32,col7:240},{col1:"Green",col2:!1,col3:"Secondary",col4:"A Secondary color",col5:0,col6:192,col7:0},{col1:"Pink",col2:!1,col3:"Hue",col4:"A hue",col5:255,col6:192,col7:203}];a=0;for(g=colors.length;a<100;a++)data2.items.push(f.mixin({id:a},colors[a%g]));colorStore=c(new b({data:data2}));data2.items=[];for(a=0;a<colors.length;a++)data2.items.push(f.mixin({id:a},colors[a]));smallColorStore=c(new b({data:data2}));emptyData={identifier:"id",
label:"id",items:[]};emptyStore=c(new b({data:emptyData}));testStateStore=c(new b({idProperty:"abbreviation",data:[{abbreviation:"AL",name:"Alabama"},{abbreviation:"AK",name:"Alaska"},{abbreviation:"AZ",name:"Arizona"},{abbreviation:"AR",name:"Arkansas"},{abbreviation:"CA",name:"California"},{abbreviation:"CO",name:"Colorado"},{abbreviation:"CT",name:"Connecticut"},{abbreviation:"DE",name:"Delaware"},{abbreviation:"FL",name:"Florida"},{abbreviation:"GA",name:"Georgia"},{abbreviation:"HI",name:"Hawaii"},
{abbreviation:"ID",name:"Idaho"},{abbreviation:"IL",name:"Illinois"},{abbreviation:"IN",name:"Indiana"},{abbreviation:"IA",name:"Iowa"},{abbreviation:"KS",name:"Kansas"},{abbreviation:"KY",name:"Kentucky"},{abbreviation:"LA",name:"Louisiana"},{abbreviation:"ME",name:"Maine"},{abbreviation:"MD",name:"Maryland"},{abbreviation:"MA",name:"Massachusetts"},{abbreviation:"MI",name:"Michigan"},{abbreviation:"MN",name:"Minnesota"},{abbreviation:"MS",name:"Mississippi"},{abbreviation:"MO",name:"Missouri"},
{abbreviation:"MT",name:"Montana"},{abbreviation:"NE",name:"Nebraska"},{abbreviation:"NV",name:"Nevada"},{abbreviation:"NH",name:"New Hampshire"},{abbreviation:"NJ",name:"New Jersey"},{abbreviation:"NM",name:"New Mexico"},{abbreviation:"NY",name:"New York"},{abbreviation:"NC",name:"North Carolina"},{abbreviation:"ND",name:"North Dakota"},{abbreviation:"OH",name:"Ohio"},{abbreviation:"OK",name:"Oklahoma"},{abbreviation:"OR",name:"Oregon"},{abbreviation:"PA",name:"Pennsylvania"},{abbreviation:"RI",
name:"Rhode Island"},{abbreviation:"SC",name:"South Carolina"},{abbreviation:"SD",name:"South Dakota"},{abbreviation:"TN",name:"Tennessee"},{abbreviation:"TX",name:"Texas"},{abbreviation:"UT",name:"Utah"},{abbreviation:"VT",name:"Vermont"},{abbreviation:"VA",name:"Virginia"},{abbreviation:"WA",name:"Washington"},{abbreviation:"WV",name:"West Virginia"},{abbreviation:"WI",name:"Wisconsin"},{abbreviation:"WY",name:"Wyoming"}]}));f=[];for(a=0;a<12;a++)f.push({id:a,integer:Math.floor(Math.random()*100),
floatNum:Math.random()*100,date:new Date((new Date).getTime()*Math.random()*2),date2:new Date((new Date).getTime()-Math.random()*1E9),text:"A number in text "+Math.random(),text2:"A number in text "+Math.random(),bool:Math.random()>0.5,bool2:Math.random()>0.5,state:testStateStore.data[Math.floor(Math.random()*50)].abbreviation,state2:testStateStore.data[Math.floor(Math.random()*50)].abbreviation});testTypesStore=c(new b({data:f}));testCountryStore=c(new b({data:[{id:"AF",name:"Africa",type:"continent",
population:"900 million",area:"30,221,532 sq km",timezone:"-1 UTC to +4 UTC"},{id:"EG",name:"Egypt",type:"country",parent:"AF"},{id:"Cairo",name:"Cairo",type:"city",parent:"EG"},{id:"KE",name:"Kenya",type:"country",parent:"AF"},{id:"Nairobi",name:"Nairobi",type:"city",parent:"KE"},{id:"Mombasa",name:"Mombasa",type:"city",parent:"KE"},{id:"SD",name:"Sudan",type:"country",parent:"AF"},{id:"Khartoum",name:"Khartoum",type:"city",parent:"SD"},{id:"AS",name:"Asia",type:"continent",population:"3.2 billion"},
{id:"CN",name:"China",type:"country",parent:"AS"},{id:"Shanghai",name:"Shanghai",type:"city",parent:"CN"},{id:"IN",name:"India",type:"country",parent:"AS"},{id:"Calcutta",name:"Calcutta",type:"city",parent:"IN"},{id:"RU",name:"Russia",type:"country",parent:"AS"},{id:"Moscow",name:"Moscow",type:"city",parent:"RU"},{id:"MN",name:"Mongolia",type:"country",parent:"AS"},{id:"UlanBator",name:"Ulan Bator",type:"city",parent:"MN"},{id:"OC",name:"Oceania",type:"continent",population:"21 million"},{id:"AU",
name:"Australia",type:"country",population:"21 million",parent:"OC"},{id:"Sydney",name:"Sydney",type:"city",parent:"AU"},{id:"EU",name:"Europe",type:"continent",population:"774 million"},{id:"DE",name:"Germany",type:"country",parent:"EU"},{id:"Berlin",name:"Berlin",type:"city",parent:"DE"},{id:"FR",name:"France",type:"country",parent:"EU"},{id:"Paris",name:"Paris",type:"city",parent:"FR"},{id:"ES",name:"Spain",type:"country",parent:"EU"},{id:"Madrid",name:"Madrid",type:"city",parent:"ES"},{id:"IT",
name:"Italy",type:"country",parent:"EU"},{id:"Rome",name:"Rome",type:"city",parent:"IT"},{id:"NA",name:"North America",type:"continent",population:"575 million"},{id:"MX",name:"Mexico",type:"country",population:"108 million",area:"1,972,550 sq km",parent:"NA"},{id:"Mexico City",name:"Mexico City",type:"city",population:"19 million",timezone:"-6 UTC",parent:"MX"},{id:"Guadalajara",name:"Guadalajara",type:"city",population:"4 million",timezone:"-6 UTC",parent:"MX"},{id:"CA",name:"Canada",type:"country",
population:"33 million",area:"9,984,670 sq km",parent:"NA"},{id:"Ottawa",name:"Ottawa",type:"city",population:"0.9 million",timezone:"-5 UTC",parent:"CA"},{id:"Toronto",name:"Toronto",type:"city",population:"2.5 million",timezone:"-5 UTC",parent:"CA"},{id:"US",name:"United States of America",type:"country",parent:"NA"},{id:"New York",name:"New York",type:"city",parent:"US"},{id:"SA",name:"South America",type:"continent",population:"445 million"},{id:"BR",name:"Brazil",type:"country",population:"186 million",
parent:"SA"},{id:"Brasilia",name:"Brasilia",type:"city",parent:"BR"},{id:"AR",name:"Argentina",type:"country",population:"40 million",parent:"SA"},{id:"BuenosAires",name:"Buenos Aires",type:"city",parent:"AR"}],getChildren:function(a,b){return this.query({parent:a.id},b)},mayHaveChildren:function(a){return a.type!="city"},query:function(a,b){var e=new i,d=this.queryEngine(a,b)(this.data);setTimeout(function(){e.resolve(d)},200);return j(e.promise)}}));createOrderedStore=function(a){return c(new b({data:a,
idProperty:"name",put:function(a,e){a.order=k(this,a,e.before);return b.prototype.put.call(this,a,e)},copy:function(a,b){var d,c={},f=this.idProperty,g=0;for(d in a)c[d]=a[d];d=a[f];if(d in this.index){for(;this.index[d+"("+ ++g+")"];);c[f]=d+"("+g+")"}this.add(c,b)},query:function(a,c){c.sort=[{attribute:"order"}];return b.prototype.query.call(this,a,c)}}))};testOrderedData=[{order:1,name:"preheat",description:"Preheat your oven to 350\u00b0F"},{order:2,name:"mix dry",description:"In a medium bowl, combine flour, salt, and baking soda"},
{order:3,name:"mix butter",description:"In a large bowl, beat butter, then add the brown sugar and white sugar then mix"},{order:4,name:"mix together",description:"Slowly add the dry ingredients from the medium bowl to the wet ingredients in the large bowl, mixing until the dry ingredients are totally combined"},{order:5,name:"chocolate chips",description:"Add chocolate chips"},{order:6,name:"make balls",description:"Scoop up a golf ball size amount of dough with a spoon and drop in onto a cookie sheet"},
{order:7,name:"bake",description:"Put the cookies in the oven and bake for about 10-14 minutes"},{order:8,name:"remove",description:"Using a spatula, lift cookies off onto wax paper or a cooling rack"},{order:9,name:"eat",description:"Eat and enjoy!"}];testOrderedStore=createOrderedStore(testOrderedData);return testStore});