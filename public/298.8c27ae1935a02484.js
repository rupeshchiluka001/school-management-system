"use strict";(self.webpackChunkviews=self.webpackChunkviews||[]).push([[298],{8298:(F,m,n)=>{n.r(m),n.d(m,{HostelModule:()=>N});var c=n(6019),e=n(3556),g=n(8190),p=n(2979);const d=function(){return["/hostel/room-requests-list"]};function _(o,r){1&o&&(e.TgZ(0,"a",1),e.TgZ(1,"li"),e._uU(2,"All Room Requests"),e.qZA(),e.qZA()),2&o&&e.Q6J("routerLink",e.DdM(1,d))}const f=function(){return["/hostel/home"]},b=function(){return["/hostel/book-room"]};let Z=(()=>{class o{constructor(t){this.cookieService=t,this.role=""}ngOnInit(){this.role=this.cookieService.getRole()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(g.T))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-hostel-home"]],decls:11,vars:5,consts:[["id","leftPanel"],[3,"routerLink"],[3,"routerLink",4,"ngIf"],["id","outerContainer"]],template:function(t,s){1&t&&(e.TgZ(0,"span",0),e.TgZ(1,"ul"),e.TgZ(2,"a",1),e.TgZ(3,"li"),e._uU(4,"Hostel Home"),e.qZA(),e.qZA(),e.TgZ(5,"a",1),e.TgZ(6,"li"),e._uU(7,"Book Hostel Room"),e.qZA(),e.qZA(),e.YNc(8,_,3,2,"a",2),e.qZA(),e.qZA(),e.TgZ(9,"span",3),e._UZ(10,"router-outlet"),e.qZA()),2&t&&(e.xp6(2),e.Q6J("routerLink",e.DdM(3,f)),e.xp6(3),e.Q6J("routerLink",e.DdM(4,b)),e.xp6(3),e.Q6J("ngIf","admin"===s.role||"warden"===s.role))},directives:[p.yS,c.O5,p.lC],styles:['[_nghost-%COMP%]{display:flex;flex-flow:row nowrap;align-items:stretch;min-height:91vh}ul[_ngcontent-%COMP%]{list-style-type:none}a[_ngcontent-%COMP%]{color:#000;text-decoration:none}li[_ngcontent-%COMP%]{margin:0 0 10px -10px}li[_ngcontent-%COMP%]:before{content:"-> "}#leftPanel[_ngcontent-%COMP%]{min-width:250px;border:1px solid black;transition:margin 1s ease-in;position:sticky;top:0}#outerContainer[_ngcontent-%COMP%]{flex-grow:1;border:1px solid red;padding:20px}']}),o})();var q=n(4522);let a=(()=>{class o{constructor(t){this.http=t,this.apiUrl="http://localhost",this.port=3e3,this.bookRoomUrl=`${this.apiUrl}:${this.port}/api/hostel/book-hostel-room`,this.leaveRoomUrl=`${this.apiUrl}:${this.port}/api/hostel/leave-hostel-room`,this.roomDetailsUrl=`${this.apiUrl}:${this.port}/api/hostel/get-room-details`,this.hostelRequestsUrl=`${this.apiUrl}:${this.port}/api/hostel/get-all-hostel-room-requests`,this.acceptRequestUrl=`${this.apiUrl}:${this.port}/api/hostel/accept-room-request`,this.checkRequestUrl=`${this.apiUrl}:${this.port}/api/hostel/check-room-request`}bookHostelRoom(){return this.http.get(this.bookRoomUrl)}leaveHostelRoom(){return this.http.get(this.leaveRoomUrl)}getHostelRoomDetails(){return this.http.get(this.roomDetailsUrl)}getHostelRequests(t){return this.http.get(this.hostelRequestsUrl+t)}acceptRequest(t,s){return console.log("hostel id: ",t),this.http.post(this.acceptRequestUrl,{hostelRequestId:t,userId:s})}checkRequest(){return this.http.get(this.checkRequestUrl)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(q.eN))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var h=n(4936);function v(o,r){1&o&&(e.TgZ(0,"div",2),e._uU(1,"You haven't applied for hostel yet!"),e.qZA())}function R(o,r){1&o&&(e.TgZ(0,"div"),e._uU(1,"You're application is in progress!"),e.qZA())}function U(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div"),e.TgZ(1,"div"),e.TgZ(2,"h3"),e._uU(3,"Student Details: "),e.qZA(),e.TgZ(4,"span"),e._uU(5,"Student Name: "),e.qZA(),e._uU(6),e._UZ(7,"br"),e.TgZ(8,"span"),e._uU(9,"Date Of Birth: "),e.qZA(),e._uU(10),e._UZ(11,"br"),e.TgZ(12,"span"),e._uU(13,"Gender: "),e.qZA(),e._uU(14),e._UZ(15,"br"),e.TgZ(16,"span"),e._uU(17,"Class: "),e.qZA(),e._uU(18),e._UZ(19,"br"),e.qZA(),e.TgZ(20,"div"),e.TgZ(21,"h3"),e._uU(22,"Room Details: "),e.qZA(),e.TgZ(23,"span"),e._uU(24,"Room Number: "),e.qZA(),e._uU(25),e._UZ(26,"br"),e.TgZ(27,"span"),e._uU(28,"Hostel Name: "),e.qZA(),e._uU(29),e._UZ(30,"br"),e.TgZ(31,"span"),e._uU(32,"Allotted on: "),e.qZA(),e._uU(33),e._UZ(34,"br"),e.qZA(),e.TgZ(35,"div"),e.TgZ(36,"button",3),e.NdJ("click",function(){return e.CHM(t),e.oxw().leaveRoom()}),e._uU(37,"Leave Room"),e.qZA(),e.qZA(),e.qZA()}if(2&o){const t=e.oxw();e.xp6(6),e.hij("",t.user.name," "),e.xp6(4),e.hij("",t.user.DOB," "),e.xp6(4),e.hij("",t.user.gender," "),e.xp6(4),e.hij("",t.user.class," "),e.xp6(7),e.hij("",t.room.roomNo," "),e.xp6(4),e.hij("",t.room.hostelName," "),e.xp6(4),e.hij("",t.room.allottedOn," ")}}let x=(()=>{class o{constructor(t,s){this.hostelService=t,this.accountService=s,this.room={},this.user={},this.roomAllotted=!1,this.applied=!1}ngOnInit(){this.userSub=this.accountService.getUserDetails().subscribe({next:t=>{this.user=t,console.log("User: ",t),this.user.hosteller&&(this.roomAllotted=!0,console.log("Room alloted"),this.roomSub=this.hostelService.getHostelRoomDetails().subscribe({next:s=>{this.room=s,console.log("Room: ",s)},error:s=>console.log("Err: ",s)}))},error:t=>console.log("Err: ",t)}),this.requestSub=this.hostelService.checkRequest().subscribe({next:t=>{console.log("request: ",t),this.applied=!0,console.log("Room applied")},error:t=>{console.log("Err: ",t),401===t.status&&(this.applied=!1,console.log("Room Not Applied"))}})}leaveRoom(){this.leaveSub=this.hostelService.leaveHostelRoom().subscribe({next:t=>{console.log("leave: ",t)},error:t=>console.log("leave err: ",t)})}ngOnDestroy(){this.roomSub&&this.roomSub.unsubscribe(),this.userSub&&this.userSub.unsubscribe(),this.requestSub&&this.requestSub.unsubscribe(),this.leaveSub&&this.leaveSub.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(a),e.Y36(h.B))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-room-details"]],decls:5,vars:3,consts:[["id","notAllotted",4,"ngIf"],[4,"ngIf"],["id","notAllotted"],[3,"click"]],template:function(t,s){1&t&&(e.TgZ(0,"h2"),e._uU(1,"Details"),e.qZA(),e.YNc(2,v,2,0,"div",0),e.YNc(3,R,2,0,"div",1),e.YNc(4,U,38,7,"div",1)),2&t&&(e.xp6(2),e.Q6J("ngIf",!s.applied&&!s.roomAllotted),e.xp6(1),e.Q6J("ngIf",s.applied&&!s.roomAllotted),e.xp6(1),e.Q6J("ngIf",s.roomAllotted))},directives:[c.O5],styles:[""]}),o})();var l=n(7537);function C(o,r){1&o&&(e.TgZ(0,"div"),e._uU(1,"You're application is in progress!"),e.qZA())}function A(o,r){1&o&&(e.TgZ(0,"div"),e._uU(1,"Room is already Allotted"),e.qZA())}function T(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"form",2),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().submitRequest()}),e.TgZ(1,"div",3),e.TgZ(2,"label",4),e._uU(3,"Your Name: "),e.qZA(),e._UZ(4,"br"),e.TgZ(5,"input",5),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().user.name=i}),e.qZA(),e._UZ(6,"br"),e.TgZ(7,"label",6),e._uU(8,"Email: "),e.qZA(),e._UZ(9,"br"),e.TgZ(10,"input",7),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().user.email=i}),e.qZA(),e._UZ(11,"br"),e.TgZ(12,"label",8),e._uU(13,"Role: "),e.qZA(),e._UZ(14,"br"),e.TgZ(15,"input",9),e.NdJ("ngModelChange",function(i){return e.CHM(t),e.oxw().user.role=i}),e.qZA(),e._UZ(16,"br"),e._UZ(17,"input",10),e.qZA(),e.qZA()}if(2&o){const t=e.oxw();e.xp6(5),e.Q6J("ngModel",t.user.name),e.xp6(5),e.Q6J("ngModel",t.user.email),e.xp6(5),e.Q6J("ngModel",t.user.role)}}let S=(()=>{class o{constructor(t,s){this.accountService=t,this.hostelService=s,this.user={},this.roomAllotted=!1,this.applied=!1}ngOnInit(){this.getUserSub=this.accountService.getUserDetails().subscribe({next:t=>{console.log("User: ",t),this.user=t,this.user.hosteller&&(this.roomAllotted=!0,console.log("Room Allotted"))},error:t=>{console.log("Err occurred: ",t)}}),this.requestSub=this.hostelService.checkRequest().subscribe({next:t=>{console.log("request: ",t),this.applied=!0,console.log("Room applied")},error:t=>{console.log("Err: ",t),401===t.status&&(this.applied=!1,console.log("Room Not Applied"))}})}submitRequest(){this.postDataSub=this.hostelService.bookHostelRoom().subscribe({next:t=>{console.log("In book room form ... ",t)},error:t=>console.log("Error: ",t)})}ngOnDestroy(){this.getUserSub&&this.getUserSub.unsubscribe(),this.postDataSub&&this.postDataSub.unsubscribe(),this.requestSub&&this.requestSub.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(h.B),e.Y36(a))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-book-room-form"]],decls:5,vars:3,consts:[[4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[3,"ngSubmit"],["id","container"],["for","name"],["type","text","name","name","id","name","disabled","",3,"ngModel","ngModelChange"],["for","email"],["type","text","name","email","id","email","disabled","",3,"ngModel","ngModelChange"],["for","role"],["type","text","name","role","id","role","disabled","",3,"ngModel","ngModelChange"],["type","submit","value","Submit!","id","submit"]],template:function(t,s){1&t&&(e.TgZ(0,"p"),e._uU(1,"Hostel Room Request Form"),e.qZA(),e.YNc(2,C,2,0,"div",0),e.YNc(3,A,2,0,"div",0),e.YNc(4,T,18,3,"form",1)),2&t&&(e.xp6(2),e.Q6J("ngIf",s.applied&&!s.roomAllotted),e.xp6(1),e.Q6J("ngIf",s.roomAllotted),e.xp6(1),e.Q6J("ngIf",!s.applied&&!s.roomAllotted))},directives:[c.O5,l._Y,l.JL,l.F,l.Fj,l.JJ,l.On],styles:[""]}),o})(),k=(()=>{class o{constructor(t){this.hostelService=t}ngOnInit(){}acceptRequest(){console.log("accepting"),this.sub=this.hostelService.acceptRequest(this.request._id,this.request.userId).subscribe({next:t=>{console.log("Data: ",t)},error:t=>console.log("Err: ",t)})}ngOnDestroy(){this.sub&&this.sub.unsubscribe(),this.userSub&&this.userSub.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(a))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-hostel-request"]],inputs:{request:"request"},decls:15,vars:3,consts:[[3,"click"]],template:function(t,s){1&t&&(e.TgZ(0,"div"),e.TgZ(1,"label"),e._uU(2,"Student Name: "),e.qZA(),e._uU(3),e._UZ(4,"br"),e.TgZ(5,"label"),e._uU(6,"Room Number: "),e.qZA(),e._uU(7),e._UZ(8,"br"),e.TgZ(9,"label"),e._uU(10,"Hostel Name: "),e.qZA(),e._uU(11),e._UZ(12,"br"),e.qZA(),e.TgZ(13,"button",0),e.NdJ("click",function(){return s.acceptRequest()}),e._uU(14,"Accept!"),e.qZA()),2&t&&(e.xp6(3),e.hij(" ",s.request.userName," "),e.xp6(4),e.hij(" ",s.request.roomNo," "),e.xp6(4),e.hij(" ",s.request.hostelName," "))},styles:["[_nghost-%COMP%]{border:2px solid black;margin:20px}"]}),o})();function H(o,r){1&o&&e._UZ(0,"app-hostel-request",4),2&o&&e.Q6J("request",r.$implicit)}function y(o,r){if(1&o){const t=e.EpF();e.TgZ(0,"div",5),e.NdJ("click",function(){const u=e.CHM(t).index;return e.oxw().pageClicked(u+1)}),e._uU(1),e.qZA()}if(2&o){const t=r.index,s=e.oxw();e.Q6J("ngStyle",s.showSelectedPage(t+1)),e.xp6(1),e.hij(" ",t+1," ")}}const M=[{path:"",component:Z,children:[{path:"room-details",component:x},{path:"book-room",component:S},{path:"room-requests-list",component:(()=>{class o{constructor(t){this.hostelService=t,this.currentPage=0,this.totalPages=0}ngOnInit(){this.getRequests("?page=1")}getRequests(t){this.sub=this.hostelService.getHostelRequests(t).subscribe({next:s=>{this.requestList=s.hostelRequests,this.currentPage=s.current,this.totalPages=s.pages},error:s=>console.log("Err: ",s)})}pageArray(){return new Array(this.totalPages)}showSelectedPage(t){return t==this.currentPage?{"box-shadow":"#00000029 0px 3px 6px, #0000003b 0px 3px 6px"}:{"box-shadow":"0",color:"#888888",cursor:"pointer"}}pageClicked(t){t!==this.currentPage&&this.getRequests(`?page=${t}`)}ngOnDestroy(){this.sub&&this.sub.unsubscribe()}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(a))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-request-list"]],decls:4,vars:2,consts:[["id","requestLayer"],[3,"request",4,"ngFor","ngForOf"],["id","pageNumbers"],["class","pgNo",3,"ngStyle","click",4,"ngFor","ngForOf"],[3,"request"],[1,"pgNo",3,"ngStyle","click"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e.YNc(1,H,1,1,"app-hostel-request",1),e.qZA(),e.TgZ(2,"div",2),e.YNc(3,y,2,2,"div",3),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",s.requestList),e.xp6(2),e.Q6J("ngForOf",s.pageArray()))},directives:[c.sg,k,c.PC],styles:[""]}),o})()},{path:"**",redirectTo:"room-details"}]}];let N=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[[c.ez,l.u5,p.Bz.forChild(M)]]}),o})()}}]);