"use strict";(self["webpackChunkonline_shop_frontend"]=self["webpackChunkonline_shop_frontend"]||[]).push([[568],{5372:function(e,s,t){t.r(s),t.d(s,{default:function(){return v}});var r=t(3396),c=t(7139),a=t.p+"img/search-history.f6c9c8e8.png";const h=e=>((0,r.dD)("data-v-17627514"),e=e(),(0,r.Cn)(),e),i={class:"search-home"},l={class:"search-history"},o={class:"history-title flex-row justify-content-between"},n=h((()=>(0,r._)("div",{class:"flex-row"},[(0,r._)("img",{src:a,style:{height:"25px"}}),(0,r._)("h2",{class:"h2"},"歷史搜索")],-1))),u={class:"flex-row flex-wrap"},d=["onClick"],p={key:0,class:"h3"};function f(e,s,t,a,h,f){return(0,r.wg)(),(0,r.iD)("div",i,[(0,r._)("div",l,[(0,r._)("div",o,[n,(0,r._)("h2",{class:"h2 noselect cursor-ptr c-ptr-hover",onClick:s[0]||(s[0]=(...e)=>f.clearSearchList&&f.clearSearchList(...e))},"清空紀錄")]),(0,r._)("ul",u,[((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(h.searchList,(e=>((0,r.wg)(),(0,r.iD)("li",{class:"cursor-ptr c-ptr-hover",onClick:s=>f.historyBtnSearch(e)},(0,c.zw)(e),9,d)))),256))]),0==h.searchList.length?((0,r.wg)(),(0,r.iD)("h3",p,"暫無搜索紀錄")):(0,r.kq)("",!0)])])}t(7658);var g={data(){return{searchList:[]}},methods:{clearSearchList(){localStorage.setItem("searchList","[]"),this.searchList=""},historyBtnSearch(e){this.$router.push({name:"search-list",query:{key:e}})}},created(){localStorage.getItem("searchList")&&(this.searchList=JSON.parse(localStorage.getItem("searchList")))}},_=t(89);const w=(0,_.Z)(g,[["render",f],["__scopeId","data-v-17627514"]]);var v=w}}]);
//# sourceMappingURL=568.2f295c4f.js.map