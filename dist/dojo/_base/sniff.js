//>>built
define("dojo/_base/sniff",["./kernel","../has"],function(a,j){a.isBrowser=!0;a._name="browser";var c=j.add,g=navigator,b=g.userAgent,d=g.appVersion,h=parseFloat(d),e,n,k,l,m,o,i,p,q,f,r,s,t;b.indexOf("AdobeAIR")>=0&&(n=1);k=d.indexOf("Konqueror")>=0?h:0;l=parseFloat(b.split("WebKit/")[1])||void 0;m=parseFloat(b.split("Chrome/")[1])||void 0;o=d.indexOf("Macintosh")>=0;s=/iPhone|iPod|iPad/.test(b);t=parseFloat(b.split("Android ")[1])||void 0;var u=Math.max(d.indexOf("WebKit"),d.indexOf("Safari"),0);
if(u&&!m&&(i=parseFloat(d.split("Version/")[1]),!i||parseFloat(d.substr(u+7))<=419.3))i=2;if(!j("dojo-webkit")&&(b.indexOf("Opera")>=0&&(e=h,e>=9.8&&(e=parseFloat(b.split("Version/")[1])||h)),b.indexOf("Gecko")>=0&&!k&&!l&&(p=q=h),q&&(r=parseFloat(b.split("Firefox/")[1]||b.split("Minefield/")[1])||void 0),document.all&&!e))f=parseFloat(d.split("MSIE ")[1])||void 0,(b=document.documentMode)&&b!=5&&Math.floor(f)!=b&&(f=b);b=document.compatMode=="BackCompat";c("opera",a.isOpera=e);c("air",a.isAIR=n);
c("khtml",a.isKhtml=k);c("webkit",a.isWebKit=l);c("chrome",a.isChrome=m);c("mac",a.isMac=o);c("safari",a.isSafari=i);c("mozilla",a.isMozilla=a.isMoz=p);c("ie",a.isIE=f);c("ff",a.isFF=r);c("quirks",a.isQuirks=b);c("ios",a.isIos=s);c("android",a.isAndroid=t);a.locale=a.locale||(f?g.userLanguage:g.language).toLowerCase();return j});