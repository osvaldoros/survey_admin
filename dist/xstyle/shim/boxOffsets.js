//>>built
define("xstyle/shim/boxOffsets",{onProperty:function(b,c){if(b=="bottom"){if(c!=="auto")return c.match(/px$/)?"height: expression(cssx_boxOffsets_checkBoxHeight(this, "+parseInt(c)+"));":'height: expression(cssx_boxOffsets_checkBoxHeight(this)); bottom: expression("'+c+'");'}else if(c!=="auto")return c.match(/px$/)?"width: expression(cssx_boxOffsets_checkBoxWidth(this, "+parseInt(c)+"));":'width: expression(cssx_boxOffsets_checkBoxWidth(this)); right: expression("'+c+'");'}});
function cssx_boxOffsets_checkBoxHeight(b,c){function d(){console.log("checkHieght");if(c==null)c=b.style.pixelBottom;b.runtimeStyle.bottom="0px";var a=b.currentStyle,e=b.offsetParent,d=b.ownerDocument;e&&a.top!="auto"&&a.position=="absolute"||a.position=="fixed"?(a=e==d.body?d.body.clientHeight:e.offsetHeight-(b.offsetHeight-b.clientHeight)-parseInt(a.paddingTop)-parseInt(a.paddingBottom),a=a-b.offsetTop-c+"px"):a="";b.runtimeStyle.height=a}setTimeout(function(){var a=b.parentNode,c=a.onresize;a.onresize=
function(){d();c&&c.call(this)}},10);d()}
function cssx_boxOffsets_checkBoxWidth(b,c){function d(){console.log("checkWidth");if(c==null)c=b.style.pixelRight;b.runtimeStyle.right="0px";var a=b.currentStyle,e=b.offsetParent,d=b.ownerDocument;e&&a.left!="auto"&&a.position=="absolute"||a.position=="fixed"?(a=(e==d.body?d.body.clientWidth:e.offsetWidth)-(b.offsetWidth-b.clientWidth)-parseInt(a.paddingLeft)-parseInt(a.paddingRight),a=a-b.offsetLeft-c+"px"):a="";b.runtimeStyle.width=a}setTimeout(function(){var a=b.parentNode,c=a.onresize;a.onresize=
function(){d();c&&c.call(this)}},10);d()};