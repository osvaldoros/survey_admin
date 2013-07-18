//>>built
define(["dijit","dojo","dojox","dojo/require!dojo/window"],function(j,f,b){f.provide("dojox.flash._base");f.experimental("dojox.flash");f.require("dojo.window");b.flash=function(){};b.flash={ready:!1,url:null,_visible:!0,_loadedListeners:[],_installingListeners:[],setSwf:function(a,e){this.url=a;this._visible=!0;if(e!==null&&e!==void 0)this._visible=e;this._initialize()},addLoadedListener:function(a){this._loadedListeners.push(a)},addInstallingListener:function(a){this._installingListeners.push(a)},
loaded:function(){b.flash.ready=!0;if(b.flash._loadedListeners.length)for(var a=0;a<b.flash._loadedListeners.length;a++)b.flash._loadedListeners[a].call(null)},installing:function(){if(b.flash._installingListeners.length)for(var a=0;a<b.flash._installingListeners.length;a++)b.flash._installingListeners[a].call(null)},_initialize:function(){var a=new b.flash.Install;b.flash.installer=a;a.needed()?a.install():(b.flash.obj=new b.flash.Embed(this._visible),b.flash.obj.write(),b.flash.comm=new b.flash.Communicator)}};
b.flash.Info=function(){this._detectVersion()};b.flash.Info.prototype={version:-1,versionMajor:-1,versionMinor:-1,versionRevision:-1,capable:!1,installing:!1,isVersionOrAbove:function(a,e,b){b=parseFloat("."+b);return this.versionMajor>=a&&this.versionMinor>=e&&this.versionRevision>=b?!0:!1},_detectVersion:function(){for(var a,b=25;b>0;b--){if(f.isIE){var c;try{if(c=b>6?new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+b):new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),typeof c=="object"){if(b==
6)c.AllowScriptAccess="always";a=c.GetVariable("$version")}}catch(d){continue}}else a=this._JSFlashInfo(b);if(a==-1){this.capable=!1;break}else if(a!=0){a=f.isIE?a.split(" ")[1].split(","):a.split(".");this.versionMajor=a[0];this.versionMinor=a[1];this.versionRevision=a[2];this.version=parseFloat(this.versionMajor+"."+this.versionRevision);this.capable=!0;break}}},_JSFlashInfo:function(){if(navigator.plugins!=null&&navigator.plugins.length>0&&(navigator.plugins["Shockwave Flash 2.0"]||navigator.plugins["Shockwave Flash"])){var a=
navigator.plugins["Shockwave Flash"+(navigator.plugins["Shockwave Flash 2.0"]?" 2.0":"")].description.split(" "),b=a[2].split("."),c=b[0],b=b[1],a=(a[3]||a[4]).split("r");return c+"."+b+"."+(a[1]>0?a[1]:0)}return-1}};b.flash.Embed=function(a){this._visible=a};b.flash.Embed.prototype={width:215,height:138,id:"flashObject",_visible:!0,protocol:function(){switch(window.location.protocol){case "https:":return"https";default:return"http"}},write:function(a){var e,c=b.flash.url,d=c,g=f.baseUrl,h=document.location.protocol+
"//"+document.location.host;if(a){a=escape(window.location);document.title=document.title.slice(0,47)+" - Flash Player Installation";var i=escape(document.title);d+="?MMredirectURL="+a+"&MMplayerType=ActiveX&MMdoctitle="+i+"&baseUrl="+escape(g)+"&xdomain="+escape(h);c+="?MMredirectURL="+a+"&MMplayerType=PlugIn&baseUrl="+escape(g)+"&xdomain="+escape(h)}else d+="?cachebust="+(new Date).getTime(),d+="&baseUrl="+escape(g),d+="&xdomain="+escape(h);c+=c.indexOf("?")==-1?"?baseUrl="+escape(g):"&baseUrl="+
escape(g);c+="&xdomain="+escape(h);e='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="'+this.protocol()+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"\n width="'+this.width+'"\n height="'+this.height+'"\n id="'+this.id+'"\n name="'+this.id+'"\n align="middle">\n <param name="allowScriptAccess" value="always"></param>\n <param name="movie" value="'+d+'"></param>\n <param name="quality" value="high"></param>\n <param name="bgcolor" value="#ffffff"></param>\n <embed src="'+
c+'" quality="high" bgcolor="#ffffff" width="'+this.width+'" height="'+this.height+'" id="'+this.id+'Embed" name="'+this.id+'" swLiveConnect="true" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="'+this.protocol()+'://www.macromedia.com/go/getflashplayer" ></embed>\n</object>\n';f.connect(f,"loaded",f.hitch(this,function(){if(!f.byId(this.id+"Container")){var a=document.createElement("div");a.id=this.id+"Container";a.style.width=this.width+"px";a.style.height=
this.height+"px";if(!this._visible)a.style.position="absolute",a.style.zIndex="10000",a.style.top="-1000px";a.innerHTML=e;var b=document.getElementsByTagName("body");if(!b||!b.length)throw Error("No body tag for this page");b=b[0];b.appendChild(a)}}))},get:function(){return f.isIE||f.isWebKit?f.byId(this.id):document[this.id+"Embed"]},setVisible:function(a){var b=f.byId(this.id+"Container");a?(b.style.position="absolute",b.style.visibility="visible"):(b.style.position="absolute",b.style.y="-1000px",
b.style.visibility="hidden")},center:function(){var a=this.width,b=this.height,c=f.window.getBox(),a=c.l+(c.w-a)/2,b=c.t+(c.h-b)/2,c=f.byId(this.id+"Container");c.style.top=b+"px";c.style.left=a+"px"}};b.flash.Communicator=function(){};b.flash.Communicator.prototype={_addExternalInterfaceCallback:function(a){var b=f.hitch(this,function(){for(var b=Array(arguments.length),d=0;d<arguments.length;d++)b[d]=this._encodeData(arguments[d]);b=this._execFlash(a,b);return b=this._decodeData(b)});this[a]=b},
_encodeData:function(a){if(!a||typeof a!="string")return a;a=a.replace("\\","&custom_backslash;");return a=a.replace(/\0/g,"&custom_null;")},_decodeData:function(a){a&&a.length&&typeof a!="string"&&(a=a[0]);if(!a||typeof a!="string")return a;a=a.replace(/\&custom_null\;/g,"\0");return a=a.replace(/\&custom_lt\;/g,"<").replace(/\&custom_gt\;/g,">").replace(/\&custom_backslash\;/g,"\\")},_execFlash:function(a,e){for(var c=b.flash.obj.get(),e=e?e:[],d=0;d<e;d++)typeof e[d]=="string"&&(e[d]=this._encodeData(e[d]));
d=function(){return eval(c.CallFunction('<invoke name="'+a+'" returntype="javascript">'+__flash__argumentsToXML(e,0)+"</invoke>"))}.call(e);typeof d=="string"&&(d=this._decodeData(d));return d}};b.flash.Install=function(){};b.flash.Install.prototype={needed:function(){if(!b.flash.info.capable)return!0;if(!b.flash.info.isVersionOrAbove(8,0,0))return!0;return!1},install:function(){var a;b.flash.info.installing=!0;b.flash.installing();b.flash.info.capable==!1?(a=new b.flash.Embed(!1),a.write()):b.flash.info.isVersionOrAbove(6,
0,65)?(a=new b.flash.Embed(!1),a.write(!0),a.setVisible(!0),a.center()):(alert("This content requires a more recent version of the Macromedia  Flash Player."),window.location.href=+b.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer")},_onInstallStatus:function(a){a=="Download.Complete"?b.flash._initialize():a=="Download.Cancelled"?(alert("This content requires a more recent version of the Macromedia  Flash Player."),window.location.href=b.flash.Embed.protocol()+"://www.macromedia.com/go/getflashplayer"):
a=="Download.Failed"&&alert("There was an error downloading the Flash Player update. Please try again later, or visit macromedia.com to download the latest version of the Flash plugin.")}};b.flash.info=new b.flash.Info});