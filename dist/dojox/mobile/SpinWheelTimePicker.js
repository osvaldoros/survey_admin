//>>built
define("dojox/mobile/SpinWheelTimePicker",["dojo/_base/declare","dojo/dom-class","./SpinWheel","./SpinWheelSlot"],function(d,e,f,b){return d("dojox.mobile.SpinWheelTimePicker",f,{slotClasses:[b,b],slotProps:[{labelFrom:0,labelTo:23},{labels:["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51",
"52","53","54","55","56","57","58","59"]}],buildRendering:function(){this.inherited(arguments);e.add(this.domNode,"mblSpinWheelTimePicker")},reset:function(){var c=this.slots,a=new Date,b=a.getHours()+"";c[0].setValue(b);c[0].setColor(b);a=a.getMinutes();a=(a<10?"0":"")+a;c[1].setValue(a);c[1].setColor(a)}})});