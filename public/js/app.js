!function(e){function t(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return e[o].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e,t,n){var o=document.getElementById(n);o&&(o.style.display="none",document.addEventListener("click",function(n){n.target.id===t||n.target.id===e?o.style.display="none"===o.style.display?"block":"none":o.style.display="none"}))}function i(){var e=document.getElementById("dropdown-label-rounds");if(e){var t=document.getElementsByClassName("round-content"),n=location.hash.replace("#/round-","")||window.currentRound||1;e.innerHTML="Round "+n;for(var o=0;o<t.length;o++)t[o].className.indexOf("round-"+n+"-content")!==-1?t[o].style.display="":t[o].style.display="none";var i=document.getElementById("arrow-rounds-previous");if(n>1){var r=parseInt(n)-1;i.setAttribute("href","#/round-"+r),i.style.display=""}else i.style.display="none";var s=document.getElementById("arrow-rounds-next");if(n<window.numberOfRounds){var a=parseInt(n)+1;s.setAttribute("href","#/round-"+a),s.style.display=""}else s.style.display="none"}}function r(){var e=document.getElementById("dropdown-label-groups");if(e){var t=document.getElementsByClassName("group-content"),n=location.hash.replace("#/group-","")||"a",o=n.charCodeAt(0);e.innerHTML="Group "+n;for(var i=0;i<t.length;i++)t[i].className.indexOf("group-"+n+"-content")!==-1?t[i].style.display="":t[i].style.display="none";var r=document.getElementById("arrow-groups-previous");if(o>97){var s=String.fromCharCode(o-1);r.setAttribute("href","#/group-"+s),r.style.display=""}else r.style.display="none";var a=document.getElementById("arrow-groups-next");if(o<96+window.numberOfGroups){var c=String.fromCharCode(o+1);a.setAttribute("href","#/group-"+c),a.style.display=""}else a.style.display="none"}}window.cookieconsent_options={message:"This website uses cookies to ensure you get the best experience on our website",dismiss:"Got it!",learnMore:"More info",link:null,theme:"light-bottom"},n(1),o("dropdown-label-years","dropdown-arrow-years","dropdown-content-years"),o("dropdown-label-rounds","dropdown-arrow-rounds","dropdown-content-rounds"),o("dropdown-label-groups","dropdown-arrow-groups","dropdown-content-groups"),i(),r(),window.onhashchange=function(){i(),r()}},function(e,t){!function(){if(!window.hasCookieConsent){window.hasCookieConsent=!0;var e="cookieconsent_options",t="update_cookieconsent_options",n="cookieconsent_dismissed",o="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/1.0.10/";if(!(document.cookie.indexOf(n)>-1||window.navigator&&window.navigator.CookiesOK)){"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});var i,r={isArray:function(e){var t=Object.prototype.toString.call(e);return"[object Array]"==t},isObject:function(e){return"[object Object]"==Object.prototype.toString.call(e)},each:function(e,t,n,o){if(r.isObject(e)&&!o)for(var i in e)e.hasOwnProperty(i)&&t.call(n,e[i],i,e);else for(var s=0,a=e.length;s<a;s++)t.call(n,e[s],s,e)},merge:function(e,t){e&&r.each(t,function(t,n){r.isObject(t)&&r.isObject(e[n])?r.merge(e[n],t):e[n]=t})},bind:function(e,t){return function(){return e.apply(t,arguments)}},queryObject:function(e,t){var n,o=0,i=e;for(t=t.split(".");(n=t[o++])&&i.hasOwnProperty(n)&&(i=i[n]);)if(o===t.length)return i;return null},setCookie:function(e,t,n,o,i){n=n||365;var r=new Date;r.setDate(r.getDate()+n);var s=[e+"="+t,"expires="+r.toUTCString(),"path="+i||"/"];o&&s.push("domain="+o),document.cookie=s.join(";")},addEventListener:function(e,t,n){e.addEventListener?e.addEventListener(t,n):e.attachEvent("on"+t,n)}},s=function(){var e="data-cc-event",t="data-cc-if",n=function(e,t,o){return r.isArray(t)?r.each(t,function(t){n(e,t,o)}):void(e.addEventListener?e.addEventListener(t,o):e.attachEvent("on"+t,o))},o=function(e,t){return e.replace(/\{\{(.*?)\}\}/g,function(e,n){for(var o,i,s=n.split("||");i=s.shift();){if(i=i.trim(),'"'===i[0])return i.slice(1,i.length-1);if(o=r.queryObject(t,i))return o}return""})},i=function(e){var t=document.createElement("div");return t.innerHTML=e,t.children[0]},s=function(e,t,n){var o=e.parentNode.querySelectorAll("["+t+"]");r.each(o,function(e){var o=e.getAttribute(t);n(e,o)},window,!0)},a=function(t,o){s(t,e,function(e,t){var i=t.split(":"),s=r.queryObject(o,i[1]);n(e,i[0],r.bind(s,o))})},c=function(e,n){s(e,t,function(e,t){var o=r.queryObject(n,t);o||e.parentNode.removeChild(e)})};return{build:function(e,t){r.isArray(e)&&(e=e.join("")),e=o(e,t);var n=i(e);return a(n,t),c(n,t),n}}}(),a={options:{message:"This website uses cookies to ensure you get the best experience on our website. ",dismiss:"Got it!",learnMore:"More info",link:null,target:"_self",container:null,theme:"light-floating",domain:null,path:"/",expiryDays:365,markup:['<div class="cc_banner-wrapper {{containerClasses}}">','<div class="cc_banner cc_container cc_container--open">','<a href="#null" data-cc-event="click:dismiss" target="_blank" class="cc_btn cc_btn_accept_all">{{options.dismiss}}</a>','<p class="cc_message">{{options.message}} <a data-cc-if="options.link" target="{{ options.target }}" class="cc_more_info" href="{{options.link || "#null"}}">{{options.learnMore}}</a></p>','<a class="cc_logo" target="_blank" href="http://silktide.com/cookieconsent">Cookie Consent plugin for the EU cookie law</a>',"</div>","</div>"]},init:function(){var t=window[e];t&&this.setOptions(t),this.setContainer(),this.options.theme?this.loadTheme(this.render):this.render()},setOptionsOnTheFly:function(e){this.setOptions(e),this.render()},setOptions:function(e){r.merge(this.options,e)},setContainer:function(){this.options.container?this.container=document.querySelector(this.options.container):this.container=document.body,this.containerClasses="",navigator.appVersion.indexOf("MSIE 8")>-1&&(this.containerClasses+=" cc_ie8")},loadTheme:function(e){var t=this.options.theme;t.indexOf(".css")===-1&&(t=o+t+".css");var n=document.createElement("link");n.rel="stylesheet",n.type="text/css",n.href=t;var i=!1;n.onload=r.bind(function(){!i&&e&&(e.call(this),i=!0)},this),document.getElementsByTagName("head")[0].appendChild(n)},render:function(){this.element&&this.element.parentNode&&(this.element.parentNode.removeChild(this.element),delete this.element),this.element=s.build(this.options.markup,this),this.container.firstChild?this.container.insertBefore(this.element,this.container.firstChild):this.container.appendChild(this.element)},dismiss:function(e){e.preventDefault&&e.preventDefault(),e.returnValue=!1,this.setDismissedCookie(),this.container.removeChild(this.element)},setDismissedCookie:function(){r.setCookie(n,"yes",this.options.expiryDays,this.options.domain,this.options.path)}},c=!1;(i=function(){c||"complete"!=document.readyState||(a.init(),c=!0,window[t]=r.bind(a.setOptionsOnTheFly,a))})(),r.addEventListener(document,"readystatechange",i)}}}()}]);
//# sourceMappingURL=app.js.map