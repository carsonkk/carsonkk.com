(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{141:function(e,t,n){"use strict";n.r(t);n(168);var a=n(6),i=n.n(a),l=n(0),r=n.n(l),o=n(156),c=n.n(o),s=n(145),m=n(160),p=n(236),d=n.n(p),u=n(163),f=n(162),g=n(164),h=n(154),y=n(48),x=n.n(y),v=n(153),E=function(e){function t(t){var n;return(n=e.call(this,t)||this).handleClick=function(){return function(e){for(var t=e.currentTarget,n=t.parentNode.parentNode.nextSibling;8===n.nodeType||3===n.nodeType;)n=n.nextSibling;for(n=n.firstChild;8===n.nodeType||3===n.nodeType;)n=n.nextSibling;for(n=n.firstChild;8===n.nodeType||3===n.nodeType;)n=n.nextSibling;var a=document.createElement("textarea");a.style.height=0,t.appendChild(a),a.value=n.innerText,a.select(),document.execCommand("copy"),t.removeChild(a)}},n.handleClick=n.handleClick.bind(x()(x()(n))),n}return i()(t,e),t.prototype.render=function(){var e=Object(s.default)(h.a).withConfig({displayName:"CopyButton__CopyButtonWrapper",componentId:"tvg7w9-0"})(["&&{button{position:absolute;right:0;margin:0.5em 0.5em 0 0;padding:0.375em 0.5em;opacity:0.25;font-size:1em;font-weight:bold;color:",";background-color:",";:hover{opacity:1;background-color:",";span > span{color:",";}}svg{font-size:0.675em;color:",";}}}"],v.b.primary,v.b.text,v.b.text,v.b.primary,v.b.color);return r.a.createElement(e,{type:"action",text:"Copy",icon:["fas","clone"],func:this.handleClick()})},t}(r.a.Component),b=n(4),k=n.n(b),w=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){for(var e,t,n=this.props,a=n.currentPost,i=n.allPosts,l=0;l<i.length;l++)if(i[l].node.fields.slug===a.fields.slug){e=0===l?-1:l-1,t=l===i.length-1?-1:l+1;break}var o=s.default.div.withConfig({displayName:"AdjacentPosts__AdjacentPostsWrapper",componentId:"sc-8o4gui-0"})(["display:flex;flex-direction:column;margin-top:1em;"]),c=s.default.div.withConfig({displayName:"AdjacentPosts__SeperatedWrapper",componentId:"sc-8o4gui-1"})(["display:flex;justify-content:space-between;"]),m=s.default.span.withConfig({displayName:"AdjacentPosts__PrevTitle",componentId:"sc-8o4gui-2"})(["display:block;margin:0.5em 1em 0 0;max-width:15em;font-style:italic;"]),p=s.default.span.withConfig({displayName:"AdjacentPosts__NextTitle",componentId:"sc-8o4gui-3"})(["display:block;margin:0.5em 0 0 1em;max-width:15em;font-style:italic;text-align:right;"]);return r.a.createElement(o,null,r.a.createElement(c,null,-1!==e?r.a.createElement(h.a,{type:"internal",to:i[e].node.fields.slug,text:"prev",icon:["fas","angle-left"],intRel:"prev"}):r.a.createElement("span",null),-1!==t?r.a.createElement(h.a,{type:"internal",to:i[t].node.fields.slug,text:"next",icon:["fas","angle-right"],isIconLeft:!1,intRel:"next"}):r.a.createElement("span",null)),r.a.createElement(c,null,-1!==e?r.a.createElement(m,null,i[e].node.frontmatter.title):r.a.createElement(m,null,"This is where it all begins"),-1!==t?r.a.createElement(p,null,i[t].node.frontmatter.title):r.a.createElement(m,null,"This is the end (for now)")))},t}(r.a.Component);w.defaultProps={prev:"/",next:"/"},w.propTypes={prev:k.a.string,next:k.a.string};var C=w,_=n(183),P=n(152),I=n(161);n.d(t,"pageQuery",function(){return S});var N=new d.a({createElement:r.a.createElement,components:{"copy-button":E}}).Compiler,T=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges,t=this.props.data.markdownRemark,n=t.htmlAst,a=t.timeToRead,i=t.tableOfContents,l=t.excerpt,o=t.fields,p=t.frontmatter,d=o.targetTag,y=p.created,x=p.updated,v=p.banner,E=p.title,b=p.topic,k=p.icon,w=p.tags,T=p.project,S=p.misc,A=p.toc,R=p.github,j=p.reddit,O=p.medium,M=R||j||O,D=null;v&&(D=(D=/,\n(.*) .*$/g.exec(v.childImageSharp.fluid.srcSet))[1]);var L=s.default.div.withConfig({displayName:"ArticlePost__Article",componentId:"sc-160xxch-0"})(["position:relative;display:flex;flex-direction:column;width:100%;.title{font-family:",";}"],P.c),z=s.default.div.withConfig({displayName:"ArticlePost__Banner",componentId:"sc-160xxch-1"})(["flex:0 0 24em;div{position:fixed;width:100%;height:100%;margin-top:-6em;}"]),W=s.default.div.withConfig({displayName:"ArticlePost__ShadowWrapper",componentId:"sc-160xxch-2"})(["position:relative;flex:1;box-shadow:0em 0em 1.5em -0.25em black;background-color:",";"],function(e){return e.theme.primary}),B=s.default.div.withConfig({displayName:"ArticlePost__PostHeader",componentId:"sc-160xxch-3"})(["margin-bottom:3em;h1{margin-top:0;margin-bottom:0.25em;font-size:4em;font-weight:normal;}"]),J=s.default.div.withConfig({displayName:"ArticlePost__TableOfContents",componentId:"sc-160xxch-4"})(["display:flex;flex-direction:column;margin-bottom:3em;> p{margin:0;font-size:2em;font-weight:bold;}> div{> ul{padding-left:2em;}ul{margin:0;list-style-type:upper-roman;}}"]),q=s.default.div.withConfig({displayName:"ArticlePost__PostBody",componentId:"sc-160xxch-5"})(["position:relative;"]),F=s.default.div.withConfig({displayName:"ArticlePost__PostFooter",componentId:"sc-160xxch-6"})(["margin-top:3em;h1{margin-top:0;margin-bottom:0.25em;}"]),H=s.default.span.withConfig({displayName:"ArticlePost__PostFooterTagline",componentId:"sc-160xxch-7"})(["font-size:1.5em;font-style:italic;"]),Q=s.default.div.withConfig({displayName:"ArticlePost__PostButtonsWrapper",componentId:"sc-160xxch-8"})(["display:flex;justify-content:space-evenly;margin-top:0.5em;"]);return r.a.createElement(u.a,null,r.a.createElement(f.a,{pathname:this.props.location.pathname,title:E,description:l,image:D,article:!0}),r.a.createElement(L,null,r.a.createElement(z,null,r.a.createElement("div",null,r.a.createElement(c.a,{fluid:v.childImageSharp.fluid,alt:"Banner"}))),r.a.createElement(W,null,r.a.createElement(m.Flex,{flexDirection:"column",width:[1,1,1,1,I.b.s],mx:"auto",px:[4,5,6,6,0],py:5},r.a.createElement(B,null,r.a.createElement("h1",{className:"title"},E),r.a.createElement(g.a,{type:"text",icon:["fas",k],texts:[b],isInline:!0}),r.a.createElement(g.a,{type:"text",icon:["far","calendar-alt"],texts:[Object(_.a)(Date.parse(y))],isInline:!0}),r.a.createElement(g.a,{type:"text",icon:["far","clock"],texts:[a+" min read"],isInline:!0}),r.a.createElement(g.a,{type:"internal",icon:["fas","tags"],texts:w,links:Array(w.length).fill("/search"),linkStates:w.map(function(e){return{tag:e}})}),T&&r.a.createElement(g.a,{type:"internal",icon:["fas","asterisk"],texts:["Related Project: "+T],links:["/projects/"+d]}),S&&r.a.createElement(g.a,{type:"internal",icon:["fas","asterisk"],texts:["Related Misc: "+S],links:["/misc/"+d]}),x!==y&&r.a.createElement(g.a,{type:"text",icon:["fas","pencil-alt"],texts:["Last updated on "+Object(_.a)(Date.parse(x))]})),A&&r.a.createElement(J,null,r.a.createElement("p",null,"Table of Contents"),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:i}})),r.a.createElement(q,null,N(n)),r.a.createElement("hr",null),r.a.createElement(C,{currentPost:t,allPosts:e}),r.a.createElement(F,null,M&&r.a.createElement("div",null,r.a.createElement("h1",null,"Discussion"),r.a.createElement(H,null,"Questions? Comments? Join the discussion over on the..."),r.a.createElement(Q,null,R&&r.a.createElement(h.a,{type:"external",to:R,text:"Issue",icon:["fab","github"]}),j&&r.a.createElement(h.a,{type:"external",to:j,text:"Post",icon:["fab","reddit-alien"]}),O&&r.a.createElement(h.a,{type:"external",to:O,text:"Article",icon:["fab","medium-m"]}))))))))},t}(r.a.Component),S=(t.default=T,"1319145390")},164:function(e,t,n){"use strict";var a=n(6),i=n.n(a),l=n(0),r=n.n(l),o=n(156),c=n.n(o),s=n(4),m=n.n(s),p=n(145),d=n(159),u=n(165),f=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.icon,i=e.texts,l=e.links,o=e.linkStates,s=e.iconType,m=e.isInline,f=p.default.div.withConfig({displayName:"MetaText",componentId:"sc-1rma57g-0"})(["display:",";padding:0.25em "," 0.25em 0;font-size:0.875em;color:",";svg,img{padding-right:0.375em;}"],m?"inline-flex":"flex",m?"1em":"0",function(e){return e.theme.caption}),g=Object(p.default)(u.a).withConfig({displayName:"MetaText__MetaLink",componentId:"sc-1rma57g-1"})(["&&{a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}}"],function(e){return e.theme.caption},function(e){return e.theme.text},function(e){return e.theme.text}),h=i.map(function(e,a){var c="";return a<i.length-1&&(c=r.a.createElement("span",null,", ")),"text"===n?r.a.createElement("span",{key:a},e,c):r.a.createElement("span",{key:a},r.a.createElement(g,{className:t,type:n,to:l[a],text:e,linkState:o[a]}),c)});return r.a.createElement(f,{className:t},r.a.createElement("div",null,"fa"===s&&r.a.createElement(d.a,{icon:a,fixedWidth:!0}),"svg"===s&&r.a.createElement("object",{data:a[0],type:"image/svg+xml"},r.a.createElement("img",{src:"../images/favicon.png",alt:"favicon"})),"img"===s&&r.a.createElement("img",{src:a[0],alt:""}),"gimg"===s&&r.a.createElement(c.a,{fluid:a[0],alt:""})),r.a.createElement("div",null,h))},t}(r.a.Component);f.defaultProps={icon:[],links:[],linkStates:[],iconType:"fa",isInline:!1},f.propTypes={type:m.a.oneOf(["text","internal","external"]).isRequired,texts:m.a.array.isRequired,icon:m.a.array,links:m.a.array,linkStates:m.a.array,iconType:m.a.oneOf(["none","fa","svg","img","gimg"]),isInline:m.a.bool},t.a=f},165:function(e,t,n){"use strict";var a=n(6),i=n.n(a),l=n(0),r=n.n(l),o=n(4),c=n.n(o),s=n(146),m=n(174),p=n(145),d=n(152),u=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.to,i=e.text,l=e.title,o=e.linkState,c=e.intRel,u=e.extRel,f=p.default.span.withConfig({displayName:"SmartLink__SmartLinkWrapper",componentId:"sc-1jh8kcb-0"})([""," a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}"],d.d,function(e){return e.theme.color},function(e){return e.theme.accent},function(e){return e.theme.accent});return r.a.createElement(f,{className:t},"internal"===n&&r.a.createElement(s.Link,{to:a,title:l,getProps:function(e){return e.isPartiallyCurrent?{className:"active"}:null},state:o,rel:c},i),"external"===n&&r.a.createElement(m.OutboundLink,{href:a,title:l,target:"_blank",rel:u},i))},t}(r.a.Component);u.defaultProps={title:"",linkState:{},intRel:"",extRel:"external nofollow noopener noreferrer"},u.propTypes={type:c.a.oneOf(["internal","external"]).isRequired,to:c.a.string.isRequired,text:c.a.string.isRequired,title:c.a.string,linkState:c.a.object,intRel:c.a.string,extRel:c.a.string},t.a=u},183:function(e,t,n){"use strict";n.d(t,"a",function(){return r});var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(e){var t=new Date(e);return new Date(t.getTime()- -6e4*t.getTimezoneOffset())}function l(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}function r(e){var t=i(e);return a[t.getMonth()]+" "+l(t.getDate())+", "+t.getFullYear()}}}]);
//# sourceMappingURL=component---src-templates-article-post-js-e1a6ce37192134913568.js.map