(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{2693:function(t,s,a){t.exports=a.p+"img/auction-placeholder.317b82bc.jpeg"},"5ced":function(t,s,a){},bb51:function(t,s,a){"use strict";a.r(s);var c=function(){var t=this,s=t.$createElement,c=t._self._c||s;return c("body",[c("img",{attrs:{id:"placeholder",src:a("2693"),alt:""}}),c("div",{staticClass:"top-bar"},[t._m(0),c("div",{staticClass:"new-auc"},[c("router-link",{attrs:{to:"/auction/me"}},[c("button",{staticClass:"btn btn-primary",attrs:{type:"button"}},[t._v(" My Auctions ")])])],1)]),c("div",{staticClass:"container row"},t._l(t.auctions,(function(s,a){return c("div",{key:a,staticClass:"card col-12 col-md-3 mx-4 m-0 m-md-3",staticStyle:{width:"18rem"}},[c("img",{staticClass:"card-img-top",attrs:{src:s.images[0].path,alt:"..."}}),c("div",{staticClass:"card-body"},[c("h5",{staticClass:"card-title"},[t._v(t._s(s.title))]),c("p",{staticClass:"card-text"},[t._v(" "+t._s(s.itemName)+" ")]),null==s.endDate?c("div",{},[c("router-link",{attrs:{to:"/auction/"+s._id}},[c("button",{staticClass:"btn btn-primary"},[t._v("Bid")])])],1):c("div",{},[c("button",{staticClass:"btn btn-primary",attrs:{disabled:""}},[t._v("Auction Ended")])])])])})),0)])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"textbox"},[a("h4",[t._v("Ongoing Auctions")]),a("div",{staticClass:"line"})])}],n=a("5530"),e=a("2f62"),o={name:"Home",components:{},methods:Object(n["a"])({},Object(e["b"])(["getAllAuctions"])),computed:Object(n["a"])({},Object(e["c"])(["auctions"])),mounted:function(){this.getAllAuctions()}},l=o,r=(a("cccb"),a("2877")),u=Object(r["a"])(l,c,i,!1,null,null,null);s["default"]=u.exports},cccb:function(t,s,a){"use strict";a("5ced")}}]);
//# sourceMappingURL=home.2123152c.js.map