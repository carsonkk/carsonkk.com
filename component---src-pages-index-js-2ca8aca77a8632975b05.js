(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{140:function(e,t,n){"use strict";n.r(t);var a,i,r,o,l,c,s=n(6),p=n.n(s),d=n(0),m=n.n(d),h=n(145),u=n(162),f=n(161),g=n(48),y=n.n(g),x=(n(558),n(4)),v=n.n(x),b=n(156),w=n.n(b),k=n(559),E=n.n(k),O=n(561),j=n(662),I=n(661),P=n.n(I);var S=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={currIndex:0,nextIndex:1},n.tick=n.tick.bind(y()(y()(n))),n.LaunchShow=n.LaunchShow.bind(y()(y()(n))),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.LaunchShow(),this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){!function(e,t){if(0!==o.children.length){var n=new j.TimelineMax({onComplete:function(){!0===a.wacky&&l.scale.set(1)},onUpdate:function(){!0===a.wacky&&(l.rotation+=.02*n.progress(),l.scale.set(3*n.progress()))}});if(n.clear(),n.isActive())return;n.to(c.scale,1,{x:a.displaceScale[0],y:a.displaceScale[1],ease:j.Power1.easeOut}).to(o.children[e],.5,{alpha:0,ease:j.Power2.easeOut},.2).to(o.children[t],.5,{alpha:1,ease:j.Power2.easeOut},.3).to(c.scale,1,{x:a.displaceScaleTo[0],y:a.displaceScaleTo[1],ease:j.Power2.easeOut},.3)}}(this.state.currIndex,this.state.nextIndex),this.state.currIndex=this.state.nextIndex,this.state.nextIndex=(this.state.nextIndex+1)%this.props.images.length},n.LaunchShow=function(){E()(".slideshow-container",function(){for(var e,t=document.querySelectorAll(".slide-image"),n=[],s=0;s<t.length;s++){var p=t[s].getElementsByTagName("img")[1];null!=p&&n.push(p.getAttribute("src"))}e={sprites:n,displacementImage:P.a,autoPlay:!1,displaceScale:[300,300],fullScreen:!0,centerSprites:!0,wacky:!0,appendElement:document.querySelector(".slideshow-container")},(a=e||{}).stageWidth=e.hasOwnProperty("stageWidth")?e.stageWidth:1920,a.stageHeight=e.hasOwnProperty("stageHeight")?e.stageHeight:1080,a.pixiSprites=e.hasOwnProperty("sprites")?e.sprites:[],a.centerSprites=!!e.hasOwnProperty("centerSprites")&&e.centerSprites,a.texts=e.hasOwnProperty("texts")?e.texts:[],a.autoPlay=!!e.hasOwnProperty("autoPlay")&&e.autoPlay,a.autoPlaySpeed=e.hasOwnProperty("autoPlaySpeed")?e.autoPlaySpeed:[10,3],a.fullScreen=!e.hasOwnProperty("fullScreen")||e.fullScreen,a.displaceScale=e.hasOwnProperty("displaceScale")?e.displaceScale:[200,70],a.displacementImage=e.hasOwnProperty("displacementImage")?e.displacementImage:"",a.navElement=e.hasOwnProperty("navElement")?e.navElement:document.querySelectorAll(".scene-nav"),a.displaceAutoFit=!!e.hasOwnProperty("displaceAutoFit")&&e.displaceAutoFit,a.wacky=!!e.hasOwnProperty("wacky")&&e.wacky,a.interactive=!!e.hasOwnProperty("interactive")&&e.interactive,a.interactionEvent=e.hasOwnProperty("interactionEvent")?e.interactionEvent:"",a.displaceScaleTo=!1===e.autoPlay?[0,0]:[20,20],a.textColor=e.hasOwnProperty("textColor")?e.textColor:"#fff",a.displacementCenter=!!e.hasOwnProperty("displacementCenter")&&e.displacementCenter,a.dispatchPointerOver=!!e.hasOwnProperty("dispatchPointerOver")&&e.dispatchPointerOver,a.appendElement=e.hasOwnProperty("appendElement")?e.appendElement:document.body,O.utils.skipHello(),i=new O.autoDetectRenderer(a.stageWidth,a.stageHeight,{transparent:!0}),r=new O.Container,o=new O.Container,l=new O.Sprite.fromImage(a.displacementImage),c=new O.filters.DisplacementFilter(l),function(){if(!0===a.autoPlay){var e=new O.ticker.Ticker;e.autoStart=a.autoPlay,e.add(function(e){l.x+=a.autoPlaySpeed[0]*e,l.y+=a.autoPlaySpeed[1],i.render(r)})}else{var t=new O.ticker.Ticker;t.autoStart=!0,t.add(function(e){i.render(r)})}}(),a.appendElement.appendChild(i.view),r.addChild(o),r.interactive=!0,!0===a.fullScreen?(i.view.style.objectFit="cover",i.view.style.width="100%",i.view.style.height="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-51%, -51%) scale(1.02)",i.view.style.transform="translate(-51%, -51%) scale(1.02)"):(i.view.style.maxWidth="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-50%, -50%)",i.view.style.transform="translate(-50%, -50%)"),l.texture.baseTexture.wrapMode=O.WRAP_MODES.REPEAT,r.filters=[c],!1===a.autoPlay&&(c.scale.x=0,c.scale.y=0),!0===a.wacky&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),l.scale.x=2,l.scale.y=2,c.autoFit=a.displaceAutoFit,r.addChild(l),function(e){for(var t=a.sprites,n=0;n<t.length;n++){var r=new O.Texture.fromImage(e[n]),l=new O.Sprite(r);!0===a.centerSprites&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),0!==n&&j.TweenMax.set(l,{alpha:0}),o.addChild(l)}}(a.pixiSprites)})},n.render=function(){var e=this.props,t=e.images,n=e.subject,a=h.d.div.withConfig({displayName:"Slideshow__SlideshowWrapper",componentId:"sc-1vkta5o-0"})(["height:100%;position:relative;> div:first-child{position:absolute;z-index:0;left:0;top:0;}> div:nth-child(2){position:relative;z-index:0;}canvas{display:block;position:absolute;z-index:2;}"]);return m.a.createElement(a,{className:"slideshow-container"},m.a.createElement("div",null,t.map(function(e,t){return m.a.createElement(w.a,{key:t,fluid:e.fluid,critical:!0,fadeIn:!1,className:"slide-image",alt:n+"-"+t})})),t[0]&&m.a.createElement(w.a,{fluid:t[0].fluid,alt:"placeholder"}))},t}(m.a.Component);S.propTypes={images:v.a.array.isRequired,rate:v.a.number.isRequired,subject:v.a.string},S.defaultProps={subject:"slide"};var C=S,_=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={bgIndex:0},n.tick=n.tick.bind(y()(y()(n))),n.tock=n.tock.bind(y()(y()(n))),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){setTimeout(this.tock,this.props.rate/2)},n.tock=function(){var e=this;this.refs.bg&&this.setState(function(t){return{bgIndex:(t.bgIndex+1)%e.props.images.length}})},n.render=function(){var e=this.props.images,t=this.state.bgIndex,n=h.d.div.withConfig({displayName:"BackgroundSlideshow",componentId:"sc-50pilu-0"})(["position:absolute;left:50%;top:50%;width:100%;z-index:1;transform:translate(-51%,-51%) scale(1.02);"]);return m.a.createElement(n,{ref:"bg"},e[t]&&m.a.createElement(w.a,{fluid:e[t].fluid,alt:"background-slide"}))},t}(m.a.Component);_.propTypes={images:v.a.array.isRequired,rate:v.a.number.isRequired};var T=_,N=n(154),q=n(191),z=n(211),R=n(164),W=n(153),A=n(160),D=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.prologue,a=e.epilogue,i=e.fontSize,r=e.lineHeight,o=e.color,l=e.background,c=Object(h.e)(["0%{clip:rect(","px,1000px,","px,0);}5%{clip:rect(","px,1000px,","px,0);}10%{clip:rect(","px,1000px,","px,0);}15%{clip:rect(","px,1000px,","px,0);}20%{clip:rect(","px,1000px,","px,0);}25%{clip:rect(","px,1000px,","px,0);}30%{clip:rect(","px,1000px,","px,0);}35%{clip:rect(","px,1000px,","px,0);}40%{clip:rect(","px,1000px,","px,0);}45%{clip:rect(","px,1000px,","px,0);}50%{clip:rect(","px,1000px,","px,0);}55%{clip:rect(","px,1000px,","px,0);}60%{clip:rect(","px,1000px,","px,0);}65%{clip:rect(","px,1000px,","px,0);}70%{clip:rect(","px,1000px,","px,0);}80%{clip:rect(","px,1000px,","px,0);}85%{clip:rect(","px,1000px,","px,0);}90%{clip:rect(","px,1000px,","px,0);}95%{clip:rect(","px,1000px,","px,0);}100%{clip:rect(","px,1000px,","px,0);}"],Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i),Object(W.h)(1,i)),s=Object(h.e)(["0%{transform:translate(0);}3%{transform:translate(-","px,","px);}6%{transform:translate(-","px,-","px);}9%{transform:translate(","px,","px);}12%{transform:translate(","px,-","px);}15%{transform:translate(0);}100%{transform:translate(0);}"],Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7),Object(W.h)(3,7)),p=h.d.span.withConfig({displayName:"GlitchedText__GlitchedTextWrapper",componentId:"sc-96oumu-0"})(["position:relative;font-size:","px;line-height:",";span:nth-child(2){color:",";background:",";position:relative;:hover{cursor:vertical-text;span:nth-child(2){animation:"," 3s infinite linear alternate-reverse;}span:nth-child(3){animation:"," 2s infinite linear alternate-reverse;}span:nth-child(4){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) both infinite;}span:nth-child(5){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) reverse both infinite;}}span:nth-child(1){position:relative;z-index:10;}span:nth-child(n+2):nth-child(-n+5){display:block;position:absolute;top:0;}span:nth-child(2),span:nth-child(3){z-index:9;clip:rect(0,1000px,0,0);}span:nth-child(2){left:-2px;color:#f0f;}span:nth-child(3){left:2px;color:#0f0;}span:nth-child(4),span:nth-child(5){z-index:8;left:0;}span:nth-child(4){color:#0ff;}span:nth-child(5){color:#ff0;}}"],i,r,o,l,c,c,s,s);return m.a.createElement(p,null,m.a.createElement("span",null,n),m.a.createElement("span",null,m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t)),m.a.createElement("span",null,a))},t}(m.a.Component);D.propTypes={prologue:v.a.string,epilogue:v.a.string,fontSize:v.a.number.isRequired,lineHeight:v.a.number,color:v.a.string,backgroundColor:v.a.string},D.defaultProps={prologue:"",epilogue:"",lineHeight:1,color:"white",background:"transparent"};var H=D;n.d(t,"pageQuery",function(){return F});var M=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.hiking_1,n=e.hiking_2,a=e.hiking_3,i=e.featuredProjectPosts.edges,r=e.recentArticlePosts.edges.map(function(e){return m.a.createElement(q.a,{key:e.node.id,data:e.node})}),o=e.featuredArticlePosts.edges.map(function(e){return m.a.createElement(q.a,{key:e.node.id,data:e.node})}),l=[t,n,a],c=h.d.div.withConfig({displayName:"pages__IndexWrapper",componentId:"sc-19r9niq-0"})(["display:flex;flex-direction:column;width:100%;"]),s=h.d.div.withConfig({displayName:"pages__IntroSection",componentId:"sc-19r9niq-1"})(["position:relative;color:",";"],W.b.text),p=h.d.div.withConfig({displayName:"pages__BackgroundFilter",componentId:"sc-19r9niq-2"})(["position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;opacity:0.7;background-color:black;"]),d=Object(h.d)(A.b).withConfig({displayName:"pages__IntroBlurb",componentId:"sc-19r9niq-3"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;bottom:20%;left:0;right:0;z-index:3;overflow:hidden;text-align:center;h1{font-size:4rem;}"]),g=h.d.div.withConfig({displayName:"pages__ButtonRow",componentId:"sc-19r9niq-4"})(["display:flex;justify-content:center;> span:first-child{margin-right:1.5rem;}> span:last-child{margin-left:1.5rem;}"]),y=Object(h.d)(N.a).withConfig({displayName:"pages__DarkButton",componentId:"sc-19r9niq-5"})(["&&{a{color:",";:hover{background-color:",";svg{color:",";}span > span{color:",";}}svg{color:",";}}}"],W.b.text,W.b.text,function(e){return e.theme.color},W.b.primary,W.b.text),x=Object(h.d)(A.b).withConfig({displayName:"pages__ArticleSection",componentId:"sc-19r9niq-6"})(["display:flex;flex-direction:row;padding-top:2rem;padding-bottom:2rem;"]),v=h.d.div.withConfig({displayName:"pages__ArticleColumn",componentId:"sc-19r9niq-7"})(["padding-left:2rem;padding-right:2rem;"]),b=h.d.div.withConfig({displayName:"pages__Divider",componentId:"sc-19r9niq-8"})(["flex:1 0 auto;width:0.25rem;margin:2rem;background-color:",";"],function(e){return e.theme.text}),w=Object(h.d)(A.b).withConfig({displayName:"pages__ContactSection",componentId:"sc-19r9niq-9"})(["padding-top:2rem;text-align:center;"]),k=h.d.div.withConfig({displayName:"pages__ShadowWrapper",componentId:"sc-19r9niq-10"})(["position:relative;z-index:50;box-shadow:0 0 1rem 0 black;background-color:",";"],function(e){return e.theme.primary});return m.a.createElement(u.a,null,m.a.createElement(f.a,{pathname:this.props.location.pathname}),m.a.createElement(c,null,m.a.createElement(s,null,m.a.createElement(C,{images:l,rate:8e3,subject:"hiking"}),m.a.createElement(T,{images:l,rate:8e3}),m.a.createElement(p,null),m.a.createElement(d,null,m.a.createElement("h1",null,m.a.createElement(H,{prologue:"Hey, my name's ",fontSize:64,lineHeight:1.3,color:W.b.text},"Kyle")),m.a.createElement("p",null,"I'm a Software & Computer Engineer from California with a passion for systems. This site is meant to consolidate the articles, tutorials, project writeups and everything else I've thrown together over the years."),m.a.createElement(g,null,m.a.createElement(y,{type:"internal",to:"/projects",text:"My Projects",icon:["fas","code"]}),m.a.createElement(y,{type:"internal",to:"/resume",text:"My Resume",icon:["fas","paper-plane"]})))),m.a.createElement(k,null,m.a.createElement(x,null,m.a.createElement(v,null,m.a.createElement("h1",null,"Recent Posts"),r),m.a.createElement(b,null),m.a.createElement(v,null,m.a.createElement("h1",null,"Featured Posts"),o))),m.a.createElement(z.a,{posts:i,placeholders:e}),m.a.createElement(k,null,m.a.createElement(w,null,m.a.createElement("h1",null,"Want to get in touch?"),m.a.createElement("p",null,"Shoot me an ",m.a.createElement(R.a,{type:"external",to:"mailto:kyle@carsonkk.com",text:"email",title:"kyle@carsonkk.com"}),", or check out any of the other links below to find me elsewhere online")))))},t}(m.a.Component),F=(t.default=M,"1743090714")},163:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(156),c=n.n(l),s=n(4),p=n.n(s),d=n(145),m=n(159),h=n(164),u=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.icon,i=e.texts,r=e.links,l=e.linkStates,s=e.iconType,p=e.isInline,u=d.d.div.withConfig({displayName:"MetaText",componentId:"sc-1rma57g-0"})(["display:",";margin:0.125rem "," 0.125rem 0;font-size:1rem;color:",";svg,img{margin-right:0.375rem;}"],p?"inline-flex":"flex",p?"1rem":"0",function(e){return e.theme.caption}),f=Object(d.d)(h.a).withConfig({displayName:"MetaText__MetaLink",componentId:"sc-1rma57g-1"})(["&&{a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}}"],function(e){return e.theme.caption},function(e){return e.theme.text},function(e){return e.theme.text}),g=i.map(function(e,a){var c="";return a<i.length-1&&(c=o.a.createElement("span",null,", ")),"text"===n?o.a.createElement("span",{key:a},e,c):o.a.createElement("span",{key:a},o.a.createElement(f,{className:t,type:n,to:r[a],text:e,linkState:l[a]}),c)});return o.a.createElement(u,{className:t},o.a.createElement("div",null,"fa"===s&&o.a.createElement(m.a,{icon:a,fixedWidth:!0}),"svg"===s&&o.a.createElement("object",{data:a[0],type:"image/svg+xml"},o.a.createElement("img",{src:"../images/favicon.png",alt:"favicon"})),"img"===s&&o.a.createElement("img",{src:a[0],alt:""}),"gimg"===s&&o.a.createElement(c.a,{fluid:a[0],alt:""})),o.a.createElement("div",null,g))},t}(o.a.Component);u.defaultProps={icon:[],links:[],linkStates:[],iconType:"fa",isInline:!1},u.propTypes={type:p.a.oneOf(["text","internal","external"]).isRequired,texts:p.a.array.isRequired,icon:p.a.array,links:p.a.array,linkStates:p.a.array,iconType:p.a.oneOf(["none","fa","svg","img","gimg"]),isInline:p.a.bool},t.a=u},164:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(146),p=n(173),d=n(145),m=n(152),h=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.to,i=e.text,r=e.title,l=e.linkState,c=e.intRel,h=e.extRel,u=d.d.span.withConfig({displayName:"SmartLink__SmartLinkWrapper",componentId:"sc-1jh8kcb-0"})([""," a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}"],m.d,function(e){return e.theme.color},function(e){return e.theme.accent},function(e){return e.theme.accent});return o.a.createElement(u,{className:t},"internal"===n&&o.a.createElement(s.Link,{to:a,title:r,activeClassName:"active",state:l,rel:c},i),"external"===n&&o.a.createElement(p.OutboundLink,{href:a,title:r,target:"_blank",rel:h},i))},t}(o.a.Component);h.defaultProps={title:"",linkState:{},intRel:"",extRel:"external nofollow noopener noreferrer"},h.propTypes={type:c.a.oneOf(["internal","external"]).isRequired,to:c.a.string.isRequired,text:c.a.string.isRequired,title:c.a.string,linkState:c.a.object,intRel:c.a.string,extRel:c.a.string},t.a=h},181:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(e){var t=new Date(e);return new Date(t.getTime()- -6e4*t.getTimezoneOffset())}function r(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}function o(e){var t=i(e);return a[t.getMonth()]+" "+r(t.getDate())+", "+t.getFullYear()}},191:function(e,t,n){"use strict";n(166);var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(146),c=n(196),s=n.n(c),p=n(145),d=n(163),m=n(181),h=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.frontmatter,n=e.fields,a=e.id,i=e.timeToRead,r=e.excerpt,c=n.type,h=n.slug,u=t.created,f=t.title,g=t.topic,y=t.icon,x=t.tags,v=t.description,b=p.d.div.withConfig({displayName:"TextPreview__TextPreviewWrapper",componentId:"sc-1iowez4-0"})(["margin-bottom:1.25rem;"]),w=p.d.div.withConfig({displayName:"TextPreview__Title",componentId:"sc-1iowez4-1"})(["line-height:1;a{display:inline-flex;line-height:1.5;:hover{div{transform:scaleY(1);}}div{transition:transform 0.3s;transform-origin:top;transform:scaleY(0);width:0.25rem;margin-left:-1rem;margin-right:0.75rem;background-color:",";}h3{margin:0;font-size:1.25em;}}"],function(e){return e.theme.text});return o.a.createElement(b,{key:a},f&&h&&o.a.createElement(w,null,o.a.createElement(l.Link,{to:""+h},o.a.createElement("div",null),o.a.createElement("h3",null,f))),c&&g&&y&&o.a.createElement(d.a,{type:"text",icon:["fas",y],texts:[g+" "+s.a.capitalize(c)],isInline:!0}),u&&o.a.createElement(d.a,{type:"text",icon:["far","calendar-alt"],texts:[Object(m.a)(Date.parse(u))],isInline:!0}),i&&o.a.createElement(d.a,{type:"text",icon:["far","clock"],texts:[i+" min read"],isInline:!0}),x&&o.a.createElement(d.a,{type:"internal",icon:["fas","tags"],texts:x,links:Array(x.length).fill("/search"),linkStates:x.map(function(e){return{tag:e}})}),o.a.createElement("div",null,r&&"article"===c&&o.a.createElement("span",null,r),v&&"article"!==c&&o.a.createElement("span",null,v)))},t}(o.a.Component);t.a=h},211:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(145),p=n(156),d=n.n(p),m=n(146),h=n(159),u=n(153),f=function(e){function t(t){var n;n=e.call(this,t)||this;var a=Object(u.e)();return n.state={angle:a,percents:Object(u.a)((a+45)%360),lightColor:Object(u.f)(),darkColor:Object(u.f)(),duration:Object(u.h)(4,10)},n}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.data,n=e.image,a=t.frontmatter,i=t.fields.slug,r=a.title,l=a.icon,c=a.description,p=s.d.div.withConfig({displayName:"ImagePreview__ImagePreviewWrapper",componentId:"sc-1ymef91-0"})(["transition:all 0.3s;flex:1 0 ","%;position:relative;overflow:hidden;:hover{> div:first-child{filter:blur(0);transform:scale(1.1);}> div:nth-child(2){opacity:0.5;}> a > div:last-child > h2{transition-delay:0s;transition-timing-function:ease-out;top:0.5rem;transform:translate(-50%,0.5rem);}> a > div:last-child > div:nth-child(2){transition-delay:0.1s;opacity:1;}> a > div:last-child > div:last-child{transition:opacity 0.4s;opacity:1;}}*{backface-visibility:hidden;}"],100/3),f=s.d.div.withConfig({displayName:"ImagePreview__PostPreview",componentId:"sc-1ymef91-1"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;color:",";"],u.b.text),g=s.d.h2.withConfig({displayName:"ImagePreview__PostTitle",componentId:"sc-1ymef91-2"})(["transition:all 0.3s;transition-delay:0.1s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 2rem);margin:0;padding:0 2rem;font-size:3em;text-align:center;"]),y=s.d.div.withConfig({displayName:"ImagePreview__BackgroundFilter",componentId:"sc-1ymef91-3"})(["transition:opacity 0.3s;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.7;background-color:black;"]),x=s.d.div.withConfig({displayName:"ImagePreview__Description",componentId:"sc-1ymef91-4"})(["transition:opacity 0.3s;transition-delay:0s;flex-grow:1;display:flex;justify-content:center;align-items:center;padding:0 2rem;opacity:0;text-align:center;span{font-style:italic;}"]),v=s.d.div.withConfig({displayName:"ImagePreview__Icon",componentId:"sc-1ymef91-5"})(["transition:opacity 0.3s;position:absolute;bottom:0.5rem;right:1rem;transform:translate(-1rem,-0.5rem);opacity:0;font-size:3rem;"]),b=Object(s.e)(["0%{background-position:","% ","%;}50%{background-position:","% ","%;}100%{background-position:","% ","%;}"],this.state.percents[0],this.state.percents[1],this.state.percents[2],this.state.percents[3],this.state.percents[0],this.state.percents[1]),w=a.bSingle?s.d.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-6"})(["transition:transform 0.4s,filter 0.6s;filter:blur(0.5rem);"]):s.d.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-7"})(["background:linear-gradient(","deg,",",",");background-size:400% 400%;animation:"," ","s ease infinite;img{display:none;}"],this.state.angle,this.state.lightColor,this.state.darkColor,b,this.state.duration);return o.a.createElement(p,null,o.a.createElement(w,null,o.a.createElement(d.a,{fluid:n,alt:"Image Preview"})),o.a.createElement(y,null),o.a.createElement(m.Link,{to:i},o.a.createElement(f,null,o.a.createElement(g,null,r),o.a.createElement(x,null,o.a.createElement("span",null,c)),o.a.createElement(v,null,o.a.createElement(h.a,{icon:l})))))},t}(o.a.Component);f.propTypes={data:c.a.object.isRequired,image:c.a.object.isRequired};var g=f,y=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.placeholders,n=e.posts,a=t.pSingle,i=t.pDouble,r=t.pTriple,l=n.map(function(e,t){var l=e.node.frontmatter,c=l.bSingle,s=l.bDouble,p=l.bTriple,d=c?c.childImageSharp.fluid:a.fluid;return n.length%3==2&&t>=n.length-2?d=s?s.childImageSharp.fluid:i.fluid:n.length%3==1&&t===n.length-1&&(d=p?p.childImageSharp.fluid:r.fluid),o.a.createElement(g,{key:e.node.id,data:e.node,image:d})}),c=s.d.div.withConfig({displayName:"ImagePreviewSection__ImagePreviewSectionWrapper",componentId:"sc-2cf92k-0"})(["display:flex;flex-wrap:wrap;justify-content:center;"]);return o.a.createElement(c,null,l)},t}(o.a.Component);y.propTypes={placeholders:c.a.object.isRequired,posts:c.a.array.isRequired};t.a=y},661:function(e,t,n){e.exports=n.p+"static/crystalize-d516798d1ff615365468344facf82372.jpg"}}]);
//# sourceMappingURL=component---src-pages-index-js-2ca8aca77a8632975b05.js.map