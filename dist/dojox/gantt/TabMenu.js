//>>built
define(["dijit","dojo","dojox","dojo/require!dijit/dijit,dijit/Menu,dijit/Dialog,dijit/form/NumberSpinner,dijit/form/Button,dijit/form/CheckBox,dijit/form/DateTextBox,dijit/form/TimeTextBox,dojo/date/locale,dijit/form/Form,dojo/parser"],function(g,b,h){b.provide("dojox.gantt.TabMenu");b.require("dijit.dijit");b.require("dijit.Menu");b.require("dijit.Dialog");b.require("dijit.form.NumberSpinner");b.require("dijit.form.Button");b.require("dijit.form.CheckBox");b.require("dijit.form.DateTextBox");b.require("dijit.form.TimeTextBox");
b.require("dojo.date.locale");b.require("dijit.form.Form");b.require("dojo.parser");(function(){b.declare("dojox.gantt.TabMenu",null,{constructor:function(a){this.ganttChart=a;this.tabPanelDlgId=this.tabPanelDlg=this.paneActionBar=this.paneContentArea=this.menuPanel=null;this.arrTabs=[];this.isShow=!1;this.buildContent()},buildContent:function(){this.createMenuPanel();this.createTabPanel();var a=this.createTab(11,"Add Successor Task","t",!0,this);a.addItem(1,"Id","id",!0);a.addItem(2,"Name","name");
a.addItem(3,"Start Time","startTime");a.addItem(4,"Duration (hours)","duration");a.addItem(5,"Percent Complete (%)","percentage");a.addItem(6,"Task Assignee","taskOwner");a.addAction("addSuccessorTaskAction");a=this.createTab(10,"Add Child Task","t",!0,this);a.addItem(1,"Id","id",!0);a.addItem(2,"Name","name");a.addItem(3,"Start Time","startTime");a.addItem(4,"Duration (hours)","duration");a.addItem(5,"Percent Complete (%)","percentage");a.addItem(6,"Task Assignee","taskOwner");a.addAction("addChildTaskAction");
a=this.createTab(4,"Set Duration(hours)","t",!0,this,!0);a.addItem(1,"Duration (hours)","duration",!0);a.addAction("durationUpdateAction");a=this.createTab(5,"Set Complete Percentage (%)","t",!0,this,!0);a.addItem(1,"Percent Complete (%)","percentage",!0);a.addAction("cpUpdateAction");a=this.createTab(20,"Set Owner","t",!0,this,!0);a.addItem(1,"Task Assignee","taskOwner",!0);a.addAction("ownerUpdateAction");a=this.createTab(13,"Set Previous Task","t",!0,this);a.addItem(1,"Previous Task Id","previousTaskId",
!0);a.addAction("ptUpdateAction");a=this.createTab(1,"Rename Task","t",!0,this,!0);a.addItem(1,"New Name","name",!0);a.addAction("renameTaskAction");this.createTab(2,"Delete Task","t",!0,this).addAction("deleteAction");a=this.createTab(12,"Add New Project","p",!1,this);a.addItem(1,"Id","id",!0);a.addItem(2,"Name","name",!0);a.addItem(3,"Start Date","startDate",!0);a.addAction("addProjectAction");a=this.createTab(8,"Set Complete Percentage (%)","p",!0,this,!0);a.addItem(1,"Percent Complete (%)","percentage",
!0);a.addAction("cpProjectAction");a=this.createTab(6,"Rename Project","p",!0,this,!0);a.addItem(1,"New Name","name",!0);a.addAction("renameProjectAction");this.createTab(7,"Delete Project","p",!0,this).addAction("deleteProjectAction");a=this.createTab(9,"Add New Task","p",!0,this);a.addItem(1,"Id","id",!0);a.addItem(2,"Name","name");a.addItem(3,"Start Time","startTime");a.addItem(4,"Duration (hours)","duration");a.addItem(5,"Percent Complete (%)","percentage");a.addItem(6,"Task Assignee","taskOwner");
a.addItem(7,"Parent Task Id","parentTaskId");a.addItem(8,"Previous Task Id","previousTaskId");a.addAction("addTaskAction")},createMenuPanel:function(){this.menuPanel=b.create("div",{innerHTML:"<table></table>",className:"ganttMenuPanel"},this.ganttChart.content);b.addClass(this.menuPanel.firstChild,"ganttContextMenu");this.menuPanel.firstChild.cellPadding=0;this.menuPanel.firstChild.cellSpacing=0},createTabPanel:function(){this.tabPanelDlg=g.byId(this.tabPanelDlgId)||new g.Dialog({title:"Settings"});
this.tabPanelDlgId=this.tabPanelDlg.id;this.tabPanelDlg.closeButtonNode.style.display="none";var a=this.tabPanelDlg.containerNode;this.paneContentArea=b.create("div",{className:"dijitDialogPaneContentArea"},a);this.paneActionBar=b.create("div",{className:"dijitDialogPaneActionBar"},a);this.paneContentArea.innerHTML="<table cellpadding=0 cellspacing=0><tr><th></th></tr><tr><td></td></tr></table>";a=this.paneContentArea.firstChild.rows[0].cells[0];a.colSpan=2;a.innerHTML="Description: ";b.addClass(a,
"ganttDialogContentHeader");a=this.paneContentArea.firstChild.rows[1].cells[0];a.innerHTML="<table></table>";b.addClass(a.firstChild,"ganttDialogContentCell");a.align="center";this.ok=new g.form.Button({label:"OK"});this.cancel=new g.form.Button({label:"Cancel"});this.paneActionBar.appendChild(this.ok.domNode);this.paneActionBar.appendChild(this.cancel.domNode)},addItemMenuPanel:function(a){var c=this.menuPanel.firstChild.insertRow(this.menuPanel.firstChild.rows.length),d=b.create("td",{className:"ganttContextMenuItem",
innerHTML:a.Description});b.attr(d,"tabIndex",0);this.ganttChart._events.push(b.connect(d,"onclick",this,function(){try{this.hide(),a.show()}catch(c){console.log("dialog open exception: "+c.message)}}));this.ganttChart._events.push(b.connect(d,"onkeydown",this,function(c){if(c.keyCode==b.keys.ENTER)try{this.hide(),a.show()}catch(d){console.log("dialog open exception: "+d.message)}}));this.ganttChart._events.push(b.connect(d,"onmouseover",this,function(){b.addClass(d,"ganttContextMenuItemHover")}));
this.ganttChart._events.push(b.connect(d,"onmouseout",this,function(){b.removeClass(d,"ganttContextMenuItemHover")}));c.appendChild(d)},show:function(a,c){c.constructor==h.gantt.GanttTaskControl?b.forEach(this.arrTabs,function(a){if(a.type=="t")a.object=c,this.addItemMenuPanel(a)},this):c.constructor==h.gantt.GanttProjectControl&&b.forEach(this.arrTabs,function(a){if(a.type=="p")a.object=c,this.addItemMenuPanel(a)},this);this.isShow=!0;b.style(this.menuPanel,{zIndex:15,visibility:"visible"});var d=
b.position(this.menuPanel,!0),f=b.position(this.ganttChart.content,!0),e=b.coords(a,!0);this.menuPanel.style.top=e.y+d.h>f.y+f.h+50?e.y-d.h+e.h+"px":e.y+"px";this.menuPanel.style.left=b._isBodyLtr()?e.x+e.w+5+"px":e.x-d.w-5+"px"},hide:function(){this.isShow=!1;this.menuPanel.style.visibility="hidden"},clear:function(){this.menuPanel.removeChild(this.menuPanel.firstChild);this.menuPanel.innerHTML="<table></table>";b.addClass(this.menuPanel.firstChild,"ganttContextMenu");this.menuPanel.firstChild.cellPadding=
0;this.menuPanel.firstChild.cellSpacing=0},createTab:function(a,c,b,f,e,i){a=new h.gantt.contextMenuTab(a,c,b,f,e,i);this.arrTabs.push(a);return a}});b.declare("dojox.gantt.contextMenuTab",null,{constructor:function(a,c,b,f,e,i){this.id=a;this.arrItems=[];this.TabItemContainer=null;this.Description=c;this.tabMenu=e;this.type=b;this.object=null;this.showObjectInfo=f;this.withDefaultValue=i},preValueValidation:function(a){for(var c=0;c<a.length;c++){var b=a[c];if(b.required&&!b.control.textbox.value)return!1}return!0},
encodeDate:function(a){return a.getFullYear()+"."+(a.getMonth()+1)+"."+a.getDate()},decodeDate:function(a){a=a.split(".");return a.length<3?"":new Date(a[0],parseInt(a[1])-1,a[2])},renameTaskAction:function(){var a=this.arrItems[0].control.textbox.value;!(b.trim(a).length<=0)&&this.preValueValidation(this.arrItems)&&(this.object.setName(a),this.hide())},deleteAction:function(){this.preValueValidation(this.arrItems)&&(this.object.project.deleteTask(this.object.taskItem.id),this.hide(),this.tabMenu.ganttChart.resource&&
this.tabMenu.ganttChart.resource.reConstruct())},durationUpdateAction:function(){var a=this.arrItems[0].control.textbox.value;this.preValueValidation(this.arrItems)&&(this.object.setDuration(a)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.refresh()):alert("Duration out of Range"))},cpUpdateAction:function(){var a=this.arrItems[0].control.textbox.value;this.preValueValidation(this.arrItems)&&(this.object.setPercentCompleted(a)?this.hide():alert("Complete Percentage out of Range"))},
ownerUpdateAction:function(){var a=this.arrItems[0].control.textbox.value;this.preValueValidation(this.arrItems)&&(this.object.setTaskOwner(a)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct()):alert("Task owner not Valid"))},ptUpdateAction:function(){var a=this.arrItems[0].control.textbox.value;this.preValueValidation(this.arrItems)&&(this.object.setPreviousTask(a)?this.hide():alert("Please verify the Previous Task ("+a+")  and adjust its Time Range"))},
renameProjectAction:function(){var a=this.arrItems[0].control.textbox.value;!(b.trim(a).length<=0)&&this.preValueValidation(this.arrItems)&&(this.object.setName(a),this.hide())},deleteProjectAction:function(){this.preValueValidation(this.arrItems)&&(this.object.ganttChart.deleteProject(this.object.project.id),this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct())},cpProjectAction:function(){var a=this.arrItems[0].control.textbox.value;this.preValueValidation(this.arrItems)&&
(this.object.setPercentCompleted(a)?this.hide():alert("Percentage not Acceptable"))},addTaskAction:function(){if(this.preValueValidation(this.arrItems)){var a=this.arrItems[0].control.textbox.value,c=this.arrItems[1].control.textbox.value,d=this.decodeDate(this.arrItems[2].control.textbox.value),f=this.arrItems[3].control.textbox.value,e=this.arrItems[4].control.textbox.value,i=this.arrItems[5].control.textbox.value,g=this.arrItems[6].control.textbox.value,h=this.arrItems[7].control.textbox.value;
b.trim(a).length<=0||(this.object.insertTask(a,c,d,f,e,h,i,g)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct()):alert("Please adjust your Customization"))}},addSuccessorTaskAction:function(){if(this.preValueValidation(this.arrItems)){var a=this.object.project,c=this.arrItems[0].control.textbox.value,d=this.arrItems[1].control.textbox.value,f=this.decodeDate(this.arrItems[2].control.textbox.value),e=this.arrItems[3].control.textbox.value,i=this.arrItems[4].control.textbox.value,
g=this.arrItems[5].control.textbox.value;b.trim(c).length<=0||(a.insertTask(c,d,f,e,i,this.object.taskItem.id,g,!this.object.parentTask?"":this.object.parentTask.taskItem.id)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct()):alert("Please adjust your Customization"))}},addChildTaskAction:function(){if(this.preValueValidation(this.arrItems)){var a=this.object.project,c=this.arrItems[0].control.textbox.value,d=this.arrItems[1].control.textbox.value,f=this.decodeDate(this.arrItems[2].control.textbox.value),
e=this.arrItems[3].control.textbox.value,i=this.arrItems[4].control.textbox.value,g=this.arrItems[5].control.textbox.value,h=this.object.taskItem.id;b.trim(c).length<=0||(a.insertTask(c,d,f,e,i,"",g,h)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct()):alert("Please adjust your Customization"))}},addProjectAction:function(){if(this.preValueValidation(this.arrItems)){var a=this.arrItems[0].control.textbox.value,c=this.arrItems[1].control.textbox.value,d=
this.decodeDate(this.arrItems[2].control.textbox.value);b.trim(a).length<=0||b.trim(c).length<=0||(this.tabMenu.ganttChart.insertProject(a,c,d)?(this.hide(),this.tabMenu.ganttChart.resource&&this.tabMenu.ganttChart.resource.reConstruct()):alert("Please adjust your Customization"))}},addAction:function(a){this.actionFunc=this[a]},addItem:function(a,b,d,f){var e;e=d=="startTime"||d=="startDate"?new g.form.DateTextBox({type:"text",constraints:{datePattern:"yyyy.M.d",strict:!0}}):d=="percentage"?new g.form.NumberSpinner({constraints:{max:100,
min:0}}):d=="duration"?new g.form.NumberSpinner({constraints:{min:0}}):new g.form.TextBox;this.arrItems.push({id:a,name:b,control:e,tab:this,key:d,required:f})},show:function(){this.tabMenu.tabPanelDlg=this.tabMenu.tabPanelDlg||g.byId(this.tabMenu.tabPanelDlgId)||new g.Dialog({title:"Settings"});try{this.tabMenu.tabPanelDlg.show()}catch(a){console.log("dialog show exception: "+a.message);return}this.tabMenu.tabPanelDlg.titleNode.innerHTML=this.Description;var c=this.tabMenu.paneContentArea.firstChild.rows[1].cells[0].firstChild,
d,f,e=null;this.showObjectInfo&&this.object&&(this.object.constructor==h.gantt.GanttTaskControl?(this.insertData(c,"Id",this.object.taskItem.id),this.insertData(c,"Name",this.object.taskItem.name),this.insertData(c,"Start Time",this.encodeDate(this.object.taskItem.startTime)),this.insertData(c,"Duration (hours)",this.object.taskItem.duration+" hours"),this.insertData(c,"Percent Complete (%)",this.object.taskItem.percentage+"%"),this.insertData(c,"Task Assignee",this.object.taskItem.taskOwner),this.insertData(c,
"Previous Task Id",this.object.taskItem.previousTaskId)):(this.insertData(c,"Id",this.object.project.id),this.insertData(c,"Name",this.object.project.name),this.insertData(c,"Start date",this.encodeDate(this.object.project.startDate))));e=c.insertRow(c.rows.length);d=e.insertCell(e.cells.length);d.colSpan=2;d.innerHTML="<hr/>";e=c.insertRow(c.rows.length);d=e.insertCell(e.cells.length);d.colSpan=2;b.addClass(d,"ganttMenuDialogInputCellHeader");d.innerHTML="Customization: "+this.Description;b.forEach(this.arrItems,
function(a){e=c.insertRow(c.rows.length);d=e.insertCell(e.cells.length);b.addClass(d,"ganttMenuDialogInputCell");f=e.insertCell(e.cells.length);b.addClass(f,"ganttMenuDialogInputCellValue");d.innerHTML=a.name;f.appendChild(a.control.domNode);this.withDefaultValue&&this.object?a.control.textbox.value=this.object.constructor==h.gantt.GanttTaskControl?a.key=="startTime"?this.encodeDate(this.object.taskItem.startTime):a.key?this.object.taskItem[a.key]:"":a.key=="startDate"?this.encodeDate(this.object.project.startDate):
a.key?this.object.project[a.key]||this.object[a.key]||"":"":a.control.textbox.placeholder=a.required?"---required---":"---optional---"},this);this.tabMenu.ok.onClick=b.hitch(this,this.actionFunc);this.tabMenu.cancel.onClick=b.hitch(this,this.hide)},hide:function(){try{this.tabMenu.tabPanelDlg.hide()}catch(a){console.log("dialog show exception: "+a.message),this.tabMenu.tabPanelDlg.destroy()}var c=this.tabMenu.paneContentArea.firstChild.rows[1].cells[0];c.firstChild.parentNode.removeChild(c.firstChild);
c.innerHTML="<table></table>";b.addClass(c.firstChild,"ganttDialogContentCell")},insertData:function(a,c,d){var f=null,f=a.insertRow(a.rows.length),a=f.insertCell(f.cells.length);b.addClass(a,"ganttMenuDialogDescCell");a.innerHTML=c;c=f.insertCell(f.cells.length);b.addClass(c,"ganttMenuDialogDescCellValue");c.innerHTML=d}})})()});