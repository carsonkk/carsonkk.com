(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{149:function(e,t,a){"use strict";a.r(t);a(176);var n=a(7),i=a.n(n),r=a(0),l=a.n(r),o=a(166),s=a.n(o),c=a(153),d=a(163),u=a(241),f=a.n(u),p=a(175),m=a(173),h=a(174),g=a(164),y=a(54),b=a.n(y),v=(a(162),function(e){function t(t){var a;return(a=e.call(this,t)||this).handleClick=function(){return function(e){for(var t=e.currentTarget,a=t.parentNode.parentNode.previousSibling.previousSibling;8===a.nodeType||3===a.nodeType;)a=a.nextSibling;for(a=a.firstChild;8===a.nodeType||3===a.nodeType;)a=a.nextSibling;for(a=a.firstChild;8===a.nodeType||3===a.nodeType;)a=a.nextSibling;var n=document.createElement("textarea");n.style.height=0,t.appendChild(n),n.value=a.innerText,n.select(),document.execCommand("copy"),t.removeChild(n)}},a.handleClick=a.handleClick.bind(b()(a)),a}return i()(t,e),t.prototype.render=function(){var e=Object(c.default)(g.a).withConfig({displayName:"CopyButton__CopyButtonWrapper",componentId:"tvg7w9-0"})(["&&{button{position:absolute;z-index:0;right:0;margin:-1em 1em 0 0;padding:0.375em 0.5em;border-bottom:2px solid ",";border-left:2px solid ",";border-right:2px solid ",";border-top-left-radius:0;border-top-right-radius:0;font-size:1em;font-weight:bold;svg{font-size:0.675em;}}}"],function(e){return e.theme.text},function(e){return e.theme.text},function(e){return e.theme.text});return l.a.createElement(e,{type:"action",text:"Copy",icon:["fas","clone"],func:this.handleClick()})},t}(l.a.Component)),x=a(4),E=a.n(x),w=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){for(var e,t,a=this.props,n=a.currentPost,i=a.allPosts,r=0;r<i.length;r++)if(i[r].node.fields.slug===n.fields.slug){e=0===r?-1:r-1,t=r===i.length-1?-1:r+1;break}var o=c.default.div.withConfig({displayName:"AdjacentPosts__AdjacentPostsWrapper",componentId:"sc-8o4gui-0"})(["display:flex;flex-direction:column;margin-top:1em;"]),s=c.default.div.withConfig({displayName:"AdjacentPosts__SeperatedWrapper",componentId:"sc-8o4gui-1"})(["display:flex;justify-content:space-between;"]),d=c.default.span.withConfig({displayName:"AdjacentPosts__PrevTitle",componentId:"sc-8o4gui-2"})(["display:block;margin:0.5em 1em 0 0;max-width:15em;font-style:italic;"]),u=c.default.span.withConfig({displayName:"AdjacentPosts__NextTitle",componentId:"sc-8o4gui-3"})(["display:block;margin:0.5em 0 0 1em;max-width:15em;font-style:italic;text-align:right;"]);return l.a.createElement(o,null,l.a.createElement(s,null,-1!==e?l.a.createElement(g.a,{type:"internal",to:i[e].node.fields.slug,text:"prev",icon:["fas","angle-left"],intRel:"prev"}):l.a.createElement("span",null),-1!==t?l.a.createElement(g.a,{type:"internal",to:i[t].node.fields.slug,text:"next",icon:["fas","angle-right"],isIconLeft:!1,intRel:"next"}):l.a.createElement("span",null)),l.a.createElement(s,null,-1!==e?l.a.createElement(d,null,i[e].node.frontmatter.title):l.a.createElement(d,null,"This is where it all begins"),-1!==t?l.a.createElement(u,null,i[t].node.frontmatter.title):l.a.createElement(d,null,"This is the end (for now)")))},t}(l.a.Component);w.defaultProps={prev:"/",next:"/"},w.propTypes={prev:E.a.string,next:E.a.string};var S=w,k=a(188),I=a(161),C=a(160);a.d(t,"pageQuery",function(){return R});var _=new f.a({createElement:l.a.createElement,components:{"copy-button":v}}).Compiler,N=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges,t=this.props.data.markdownRemark,a=t.htmlAst,n=t.timeToRead,i=t.tableOfContents,r=t.excerpt,o=t.fields,u=t.frontmatter,f=o.targetTag,y=u.created,b=u.updated,v=u.banner,x=u.title,E=u.topic,w=u.icon,N=u.tags,R=u.project,T=u.misc,P=u.toc,L=u.github,j=u.reddit,z=u.medium,A=L||j||z,O=null;v&&(O=(O=/,\n(.*) .*$/g.exec(v.childImageSharp.fluid.srcSet))[1]);var W=c.default.div.withConfig({displayName:"ArticlePost__Article",componentId:"sc-160xxch-0"})(["position:relative;display:flex;flex-direction:column;width:100%;margin-bottom:16em;.title{font-family:",";}"],I.c),D=c.default.div.withConfig({displayName:"ArticlePost__Banner",componentId:"sc-160xxch-1"})(["flex:0 0 24em;div{position:fixed;width:100%;height:100vh;top:0;}"]),M=c.default.div.withConfig({displayName:"ArticlePost__ShadowWrapper",componentId:"sc-160xxch-2"})(["position:relative;flex:1;box-shadow:0em 0em 1.5em -0.25em black;background-color:",";"],function(e){return e.theme.primary}),q=c.default.div.withConfig({displayName:"ArticlePost__PostHeader",componentId:"sc-160xxch-3"})(["margin-bottom:2em;h1{margin-top:0;margin-bottom:0.25em;font-size:4em;font-weight:normal;}"]),V=c.default.div.withConfig({displayName:"ArticlePost__TableOfContents",componentId:"sc-160xxch-4"})(["display:flex;flex-direction:column;margin-bottom:3em;> p{margin:0;font-size:2em;font-weight:bold;}> div{> ul{padding-left:2em;}ul{margin:0;list-style-type:upper-roman;}}"]),B=c.default.div.withConfig({displayName:"ArticlePost__PostBody",componentId:"sc-160xxch-5"})(["position:relative;> div{> p > img{display:block;margin-left:auto;margin-right:auto;}}"]),J=c.default.div.withConfig({displayName:"ArticlePost__PostFooter",componentId:"sc-160xxch-6"})(["margin:4em 0;h1{margin-top:0;margin-bottom:0.25em;}"]),F=c.default.span.withConfig({displayName:"ArticlePost__PostFooterTagline",componentId:"sc-160xxch-7"})(["font-size:1.5em;font-style:italic;"]),G=c.default.div.withConfig({displayName:"ArticlePost__PostButtonsWrapper",componentId:"sc-160xxch-8"})(["display:flex;justify-content:space-evenly;margin-top:0.5em;"]);return l.a.createElement(p.a,null,l.a.createElement(m.a,{pathname:this.props.location.pathname,title:x,description:r,image:O,article:!0}),l.a.createElement(W,null,l.a.createElement(D,null,l.a.createElement("div",null,l.a.createElement(s.a,{fluid:v.childImageSharp.fluid,alt:"Banner"}))),l.a.createElement(M,null,l.a.createElement(d.Flex,{flexDirection:"column",width:[1,1,1,1,C.f.s],mx:"auto",px:[4,5,6,6,0],pt:5},l.a.createElement(q,null,l.a.createElement("h1",{className:"title"},x),l.a.createElement(h.a,{type:"text",icon:["fas",w],texts:[E+" Article"],isInline:!0}),l.a.createElement(h.a,{type:"text",icon:["far","calendar-alt"],texts:[Object(k.a)(Date.parse(y))],isInline:!0}),l.a.createElement(h.a,{type:"text",icon:["far","clock"],texts:[n+" min read"],isInline:!0}),l.a.createElement(h.a,{type:"internal",icon:["fas","tags"],texts:N,links:Array(N.length).fill("/search"),linkStates:N.map(function(e){return{tag:e}})}),R&&l.a.createElement(h.a,{type:"internal",icon:["fas","asterisk"],texts:["Related Project: "+R],links:["/projects/"+f]}),T&&l.a.createElement(h.a,{type:"internal",icon:["fas","asterisk"],texts:["Related Misc: "+T],links:["/misc/"+f]}),b!==y&&l.a.createElement(h.a,{type:"text",icon:["fas","pencil-alt"],texts:["Last updated on "+Object(k.a)(Date.parse(b))]})),P&&l.a.createElement(V,null,l.a.createElement("p",null,"Table of Contents"),l.a.createElement("div",{dangerouslySetInnerHTML:{__html:i}})),l.a.createElement(B,null,_(a)),l.a.createElement("hr",null),l.a.createElement(S,{currentPost:t,allPosts:e}),l.a.createElement(J,null,A&&l.a.createElement("div",null,l.a.createElement("h1",null,"Discussion"),l.a.createElement(F,null,"Questions? Comments? Join the discussion over on the..."),l.a.createElement(G,null,L&&l.a.createElement(g.a,{type:"external",to:L,text:"Issue",icon:["fab","github"]}),j&&l.a.createElement(g.a,{type:"external",to:j,text:"Post",icon:["fab","reddit-alien"]}),z&&l.a.createElement(g.a,{type:"external",to:z,text:"Article",icon:["fab","medium-m"]}))))))))},t}(l.a.Component),R=(t.default=N,"1319145390")},166:function(e,t,a){"use strict";var n=a(8);t.__esModule=!0,t.default=void 0;var i,r=n(a(7)),l=n(a(54)),o=n(a(199)),s=n(a(157)),c=n(a(0)),d=n(a(4)),u=function(e){var t=(0,s.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},p=function(e){var t=u(e),a=t.fluid?t.fluid.src:t.fixed.src;return!!f[a]||(f[a]=!0,!1)},m=[];var h=function(e,t){(void 0===i&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=new window.IntersectionObserver(function(e){e.forEach(function(e){m.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(i.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),i).observe(e),m.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+a+"/>":"",i=e.srcSet?'<source srcSet="'+e.srcSet+'" '+a+"/>":"",r=e.title?'title="'+e.title+'" ':"",l=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",s=e.height?'height="'+e.height+'" ':"",c=e.opacity?e.opacity:"1";return"<picture>"+n+i+"<img "+o+s+t+l+r+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+c+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=c.default.forwardRef(function(e,t){var a=e.style,n=e.onLoad,i=e.onError,r=(0,o.default)(e,["style","onLoad","onError"]);return c.default.createElement("img",(0,s.default)({},r,{onLoad:n,onError:i,ref:t,style:(0,s.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))});y.propTypes={style:d.default.object,onError:d.default.func,onLoad:d.default.func};var b=function(e){function t(t){var a;a=e.call(this,t)||this;var n=!0,i=!0,r=!1,o=t.fadeIn,s=p(t);!s&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=!1,i=!1,r=!0),"undefined"==typeof window&&(n=!1,i=!1),t.critical&&(n=!0,i=!1,r=!1);var d=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:n,imgLoaded:i,IOSupported:r,fadeIn:o,hasNoScript:d,seenBefore:s},a.imageRef=c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,l.default)((0,l.default)(a))),a.handleRef=a.handleRef.bind((0,l.default)((0,l.default)(a))),a}(0,r.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&h(e,function(){t.setState({isVisible:!0})})},a.handleImageLoaded=function(){this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,n=e.className,i=e.style,r=void 0===i?{}:i,l=e.imgStyle,o=void 0===l?{}:l,d=e.placeholderStyle,f=void 0===d?{}:d,p=e.placeholderClassName,m=e.fluid,h=e.fixed,b=e.backgroundColor,v=e.Tag,x="boolean"==typeof b?"lightgray":b,E=(0,s.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},o,f),w=(0,s.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},o),S={title:t,alt:this.state.isVisible?"":a,style:E,className:p};if(m){var k=m;return c.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:(0,s.default)({position:"relative",overflow:"hidden"},r),ref:this.handleRef,key:"fluid-"+JSON.stringify(k.srcSet)},c.default.createElement(v,{style:{width:"100%",paddingBottom:100/k.aspectRatio+"%"}}),k.base64&&c.default.createElement(y,(0,s.default)({src:k.base64},S)),k.tracedSVG&&c.default.createElement(y,(0,s.default)({src:k.tracedSVG},S)),x&&c.default.createElement(v,{title:t,style:{backgroundColor:x,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&c.default.createElement("picture",null,k.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:k.srcSetWebp,sizes:k.sizes}),c.default.createElement("source",{srcSet:k.srcSet,sizes:k.sizes}),c.default.createElement(y,{alt:a,title:t,src:k.src,style:w,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,s.default)({alt:a,title:t},k))}}))}if(h){var I=h,C=(0,s.default)({position:"relative",overflow:"hidden",display:"inline-block",width:I.width,height:I.height},r);return"inherit"===r.display&&delete C.display,c.default.createElement(v,{className:(n||"")+" gatsby-image-wrapper",style:C,ref:this.handleRef,key:"fixed-"+JSON.stringify(I.srcSet)},I.base64&&c.default.createElement(y,(0,s.default)({src:I.base64},S)),I.tracedSVG&&c.default.createElement(y,(0,s.default)({src:I.tracedSVG},S)),x&&c.default.createElement(v,{title:t,style:{backgroundColor:x,width:I.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:I.height}}),this.state.isVisible&&c.default.createElement("picture",null,I.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:I.srcSetWebp,sizes:I.sizes}),c.default.createElement("source",{srcSet:I.srcSet,sizes:I.sizes}),c.default.createElement(y,{alt:a,title:t,width:I.width,height:I.height,src:I.src,style:w,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,s.default)({alt:a,title:t,width:I.width,height:I.height},I))}}))}return null},t}(c.default.Component);b.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var v=d.default.shape({width:d.default.number.isRequired,height:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string}),x=d.default.shape({aspectRatio:d.default.number.isRequired,src:d.default.string.isRequired,srcSet:d.default.string.isRequired,sizes:d.default.string.isRequired,base64:d.default.string,tracedSVG:d.default.string,srcWebp:d.default.string,srcSetWebp:d.default.string});b.propTypes={resolutions:v,sizes:x,fixed:v,fluid:x,fadeIn:d.default.bool,title:d.default.string,alt:d.default.string,className:d.default.oneOfType([d.default.string,d.default.object]),critical:d.default.bool,style:d.default.object,imgStyle:d.default.object,placeholderStyle:d.default.object,placeholderClassName:d.default.string,backgroundColor:d.default.oneOfType([d.default.string,d.default.bool]),onLoad:d.default.func,onError:d.default.func,Tag:d.default.string};var E=b;t.default=E},171:function(e,t,a){"use strict";var n=a(7),i=a.n(n),r=a(0),l=a.n(r),o=a(4),s=a.n(o),c=a(154),d=a(179),u=a(153),f=a(161),p=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,a=e.type,n=e.to,i=e.text,r=e.title,o=e.linkState,s=e.intRel,p=e.extRel,m=u.default.span.withConfig({displayName:"SmartLink__SmartLinkWrapper",componentId:"sc-1jh8kcb-0"})([""," a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}"],f.d,function(e){return e.theme.color},function(e){return e.theme.accent},function(e){return e.theme.accent});return l.a.createElement(m,{className:t},"internal"===a&&l.a.createElement(c.a,{to:n,title:r,getProps:function(e){return e.isPartiallyCurrent?{className:"active"}:null},state:o,rel:s},i),"external"===a&&l.a.createElement(d.OutboundLink,{href:n,title:r,target:"_blank",rel:p},i))},t}(l.a.Component);p.defaultProps={title:"",linkState:{},intRel:"",extRel:"external nofollow noopener noreferrer"},p.propTypes={type:s.a.oneOf(["internal","external"]).isRequired,to:s.a.string.isRequired,text:s.a.string.isRequired,title:s.a.string,linkState:s.a.object,intRel:s.a.string,extRel:s.a.string},t.a=p},174:function(e,t,a){"use strict";var n=a(7),i=a.n(n),r=a(0),l=a.n(r),o=a(166),s=a.n(o),c=a(4),d=a.n(c),u=a(153),f=a(170),p=a(171),m=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,a=e.type,n=e.icon,i=e.texts,r=e.links,o=e.linkStates,c=e.iconType,d=e.isInline,m=u.default.div.withConfig({displayName:"MetaText",componentId:"sc-1rma57g-0"})(["display:",";padding:0.25em "," 0.25em 0;font-size:0.875em;color:",";> div:first-child{padding-right:0.375em;}"],d?"inline-flex":"flex",d?"1em":"0",function(e){return e.theme.caption}),h=Object(u.default)(p.a).withConfig({displayName:"MetaText__MetaLink",componentId:"sc-1rma57g-1"})(["&&{a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}}"],function(e){return e.theme.caption},function(e){return e.theme.text},function(e){return e.theme.text}),g=i.map(function(e,n){var s="";return n<i.length-1&&(s=l.a.createElement("span",null,", ")),"text"===a?l.a.createElement("span",{key:n},e,s):l.a.createElement("span",{key:n},l.a.createElement(h,{className:t,type:a,to:r[n],text:e,linkState:o[n]}),s)});return l.a.createElement(m,{className:t},l.a.createElement("div",null,"fa"===c&&l.a.createElement(f.a,{icon:n,fixedWidth:!0}),"svg"===c&&l.a.createElement("object",{data:n[0],type:"image/svg+xml"},l.a.createElement("img",{src:"../images/favicon.png",alt:"favicon"})),"img"===c&&l.a.createElement("img",{src:n[0],alt:""}),"gimg"===c&&l.a.createElement(s.a,{fluid:n[0],alt:""})),l.a.createElement("div",null,g))},t}(l.a.Component);m.defaultProps={icon:[],links:[],linkStates:[],iconType:"fa",isInline:!1},m.propTypes={type:d.a.oneOf(["text","internal","external"]).isRequired,texts:d.a.array.isRequired,icon:d.a.array,links:d.a.array,linkStates:d.a.array,iconType:d.a.oneOf(["none","fa","svg","img","gimg"]),isInline:d.a.bool},t.a=m},176:function(e,t,a){var n=a(17);n(n.P,"Array",{fill:a(187)}),a(58)("fill")},187:function(e,t,a){"use strict";var n=a(25),i=a(75),r=a(13);e.exports=function(e){for(var t=n(this),a=r(t.length),l=arguments.length,o=i(l>1?arguments[1]:void 0,a),s=l>2?arguments[2]:void 0,c=void 0===s?a:i(s,a);c>o;)t[o++]=e;return t}},188:function(e,t,a){"use strict";a.d(t,"a",function(){return l});var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(e){var t=new Date(e);return new Date(t.getTime()- -6e4*t.getTimezoneOffset())}function r(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}function l(e){var t=i(e);return n[t.getMonth()]+" "+r(t.getDate())+", "+t.getFullYear()}}}]);
//# sourceMappingURL=component---src-templates-article-post-js-c7039a349c529e576723.js.map