(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{140:function(e,t,n){"use strict";n.r(t);var a,i,r,o,l,c,s=n(6),p=n.n(s),d=n(0),m=n.n(d),h=n(145),u=n(160),f=n(163),g=n(162),x=n(48),y=n.n(x),b=(n(561),n(4)),w=n.n(b),v=n(156),k=n.n(v),E=n(562),O=n.n(E),j=n(564),I=n(665),P=n(664),C=n.n(P);var S=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={currIndex:0,nextIndex:1},n.tick=n.tick.bind(y()(y()(n))),n.LaunchShow=n.LaunchShow.bind(y()(y()(n))),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.LaunchShow(),this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){!function(e,t){if(0!==o.children.length){var n=new I.TimelineMax({onComplete:function(){!0===a.wacky&&l.scale.set(1)},onUpdate:function(){!0===a.wacky&&(l.rotation+=.02*n.progress(),l.scale.set(3*n.progress()))}});if(n.clear(),n.isActive())return;n.to(c.scale,1,{x:a.displaceScale[0],y:a.displaceScale[1],ease:I.Power1.easeOut}).to(o.children[e],.5,{alpha:0,ease:I.Power2.easeOut},.2).to(o.children[t],.5,{alpha:1,ease:I.Power2.easeOut},.3).to(c.scale,1,{x:a.displaceScaleTo[0],y:a.displaceScaleTo[1],ease:I.Power2.easeOut},.3)}}(this.state.currIndex,this.state.nextIndex),this.state.currIndex=this.state.nextIndex,this.state.nextIndex=(this.state.nextIndex+1)%this.props.images.length},n.LaunchShow=function(){O()(".slideshow-container",function(){for(var e,t=document.querySelectorAll(".slide-image"),n=[],s=0;s<t.length;s++){var p=t[s].getElementsByTagName("img")[1];null!=p&&n.push(p.getAttribute("src"))}e={sprites:n,displacementImage:C.a,autoPlay:!1,displaceScale:[300,300],fullScreen:!0,centerSprites:!0,wacky:!0,appendElement:document.querySelector(".slideshow-container")},(a=e||{}).stageWidth=e.hasOwnProperty("stageWidth")?e.stageWidth:1920,a.stageHeight=e.hasOwnProperty("stageHeight")?e.stageHeight:1080,a.pixiSprites=e.hasOwnProperty("sprites")?e.sprites:[],a.centerSprites=!!e.hasOwnProperty("centerSprites")&&e.centerSprites,a.texts=e.hasOwnProperty("texts")?e.texts:[],a.autoPlay=!!e.hasOwnProperty("autoPlay")&&e.autoPlay,a.autoPlaySpeed=e.hasOwnProperty("autoPlaySpeed")?e.autoPlaySpeed:[10,3],a.fullScreen=!e.hasOwnProperty("fullScreen")||e.fullScreen,a.displaceScale=e.hasOwnProperty("displaceScale")?e.displaceScale:[200,70],a.displacementImage=e.hasOwnProperty("displacementImage")?e.displacementImage:"",a.navElement=e.hasOwnProperty("navElement")?e.navElement:document.querySelectorAll(".scene-nav"),a.displaceAutoFit=!!e.hasOwnProperty("displaceAutoFit")&&e.displaceAutoFit,a.wacky=!!e.hasOwnProperty("wacky")&&e.wacky,a.interactive=!!e.hasOwnProperty("interactive")&&e.interactive,a.interactionEvent=e.hasOwnProperty("interactionEvent")?e.interactionEvent:"",a.displaceScaleTo=!1===e.autoPlay?[0,0]:[20,20],a.textColor=e.hasOwnProperty("textColor")?e.textColor:"#fff",a.displacementCenter=!!e.hasOwnProperty("displacementCenter")&&e.displacementCenter,a.dispatchPointerOver=!!e.hasOwnProperty("dispatchPointerOver")&&e.dispatchPointerOver,a.appendElement=e.hasOwnProperty("appendElement")?e.appendElement:document.body,j.utils.skipHello(),i=new j.autoDetectRenderer(a.stageWidth,a.stageHeight,{transparent:!0}),r=new j.Container,o=new j.Container,l=new j.Sprite.fromImage(a.displacementImage),c=new j.filters.DisplacementFilter(l),function(){if(!0===a.autoPlay){var e=new j.ticker.Ticker;e.autoStart=a.autoPlay,e.add(function(e){l.x+=a.autoPlaySpeed[0]*e,l.y+=a.autoPlaySpeed[1],i.render(r)})}else{var t=new j.ticker.Ticker;t.autoStart=!0,t.add(function(e){i.render(r)})}}(),a.appendElement.appendChild(i.view),r.addChild(o),r.interactive=!0,!0===a.fullScreen?(i.view.style.objectFit="cover",i.view.style.width="100%",i.view.style.height="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-51%, -51%) scale(1.02)",i.view.style.transform="translate(-51%, -51%) scale(1.02)"):(i.view.style.maxWidth="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-50%, -50%)",i.view.style.transform="translate(-50%, -50%)"),l.texture.baseTexture.wrapMode=j.WRAP_MODES.REPEAT,r.filters=[c],!1===a.autoPlay&&(c.scale.x=0,c.scale.y=0),!0===a.wacky&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),l.scale.x=2,l.scale.y=2,c.autoFit=a.displaceAutoFit,r.addChild(l),function(e){for(var t=a.sprites,n=0;n<t.length;n++){var r=new j.Texture.fromImage(e[n]),l=new j.Sprite(r);!0===a.centerSprites&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),0!==n&&I.TweenMax.set(l,{alpha:0}),o.addChild(l)}}(a.pixiSprites)})},n.render=function(){var e=this.props,t=e.images,n=e.subject,a=h.default.div.withConfig({displayName:"Slideshow__SlideshowWrapper",componentId:"sc-1vkta5o-0"})(["position:absolute;width:100%;height:100%;> div:first-child{position:absolute;z-index:0;left:0;top:0;}> div:nth-child(2){position:relative;z-index:0;}canvas{display:block;position:absolute;z-index:2;}"]);return m.a.createElement(a,{className:"slideshow-container"},m.a.createElement("div",null,t.map(function(e,t){return m.a.createElement(k.a,{key:t,fluid:e.fluid,critical:!0,fadeIn:!1,className:"slide-image",alt:n+"-"+t})})),t[0]&&m.a.createElement(k.a,{fluid:t[0].fluid,alt:"placeholder"}))},t}(m.a.Component);S.propTypes={images:w.a.array.isRequired,rate:w.a.number.isRequired,subject:w.a.string},S.defaultProps={subject:"slide"};var _=S,N=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={bgIndex:0},n.tick=n.tick.bind(y()(y()(n))),n.tock=n.tock.bind(y()(y()(n))),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){setTimeout(this.tock,this.props.rate/2)},n.tock=function(){var e=this;this.refs.bg&&this.setState(function(t){return{bgIndex:(t.bgIndex+1)%e.props.images.length}})},n.render=function(){var e=this.props.images,t=this.state.bgIndex,n=h.default.div.withConfig({displayName:"BackgroundSlideshow",componentId:"sc-50pilu-0"})(["position:absolute;left:50%;top:50%;width:100%;height:100%;z-index:1;transform:translate(-51%,-51%) scale(1.02);> div{height:100%;}"]);return m.a.createElement(n,{ref:"bg"},e[t]&&m.a.createElement(k.a,{fluid:e[t].fluid,alt:"background-slide"}))},t}(m.a.Component);N.propTypes={images:w.a.array.isRequired,rate:w.a.number.isRequired};var T=N,z=n(154),q=n(194),R=n(214),W=n(165),F=n(153),A=n(161),D=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.prologue,a=e.epilogue,i=e.fontSize,r=e.lineHeight,o=e.color,l=e.background,c=Object(h.keyframes)(["0%{clip:rect(","px,1000px,","px,0);}5%{clip:rect(","px,1000px,","px,0);}10%{clip:rect(","px,1000px,","px,0);}15%{clip:rect(","px,1000px,","px,0);}20%{clip:rect(","px,1000px,","px,0);}25%{clip:rect(","px,1000px,","px,0);}30%{clip:rect(","px,1000px,","px,0);}35%{clip:rect(","px,1000px,","px,0);}40%{clip:rect(","px,1000px,","px,0);}45%{clip:rect(","px,1000px,","px,0);}50%{clip:rect(","px,1000px,","px,0);}55%{clip:rect(","px,1000px,","px,0);}60%{clip:rect(","px,1000px,","px,0);}65%{clip:rect(","px,1000px,","px,0);}70%{clip:rect(","px,1000px,","px,0);}80%{clip:rect(","px,1000px,","px,0);}85%{clip:rect(","px,1000px,","px,0);}90%{clip:rect(","px,1000px,","px,0);}95%{clip:rect(","px,1000px,","px,0);}100%{clip:rect(","px,1000px,","px,0);}"],Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i),Object(F.h)(1,i)),s=Object(h.keyframes)(["0%{transform:translate(0);}3%{transform:translate(-","px,","px);}6%{transform:translate(-","px,-","px);}9%{transform:translate(","px,","px);}12%{transform:translate(","px,-","px);}15%{transform:translate(0);}100%{transform:translate(0);}"],Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7),Object(F.h)(3,7)),p=h.default.span.withConfig({displayName:"GlitchedText__GlitchedTextWrapper",componentId:"sc-96oumu-0"})(["position:relative;font-size:","px;line-height:",";span:nth-child(2){color:",";background:",";position:relative;:hover{cursor:vertical-text;span:nth-child(2){animation:"," 3s infinite linear alternate-reverse;}span:nth-child(3){animation:"," 2s infinite linear alternate-reverse;}span:nth-child(4){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) both infinite;}span:nth-child(5){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) reverse both infinite;}}span:nth-child(1){position:relative;z-index:10;}span:nth-child(n+2):nth-child(-n+5){display:block;position:absolute;top:0;}span:nth-child(2),span:nth-child(3){z-index:9;clip:rect(0,1000px,0,0);}span:nth-child(2){left:-2px;color:#f0f;}span:nth-child(3){left:2px;color:#0f0;}span:nth-child(4),span:nth-child(5){z-index:8;left:0;}span:nth-child(4){color:#0ff;}span:nth-child(5){color:#ff0;}}"],i,r,o,l,c,c,s,s);return m.a.createElement(p,null,m.a.createElement("span",null,n),m.a.createElement("span",null,m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t),m.a.createElement("span",null,t)),m.a.createElement("span",null,a))},t}(m.a.Component);D.propTypes={prologue:w.a.string,epilogue:w.a.string,fontSize:w.a.number.isRequired,lineHeight:w.a.number,color:w.a.string,backgroundColor:w.a.string},D.defaultProps={prologue:"",epilogue:"",lineHeight:1,color:"white",background:"transparent"};var B=D;n.d(t,"pageQuery",function(){return M});var H=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.hiking_1,n=e.hiking_2,a=e.hiking_3,i=e.featuredProjectPosts.edges,r=e.recentArticlePosts.edges.map(function(e){return m.a.createElement(q.a,{key:e.node.id,data:e.node})}),o=e.featuredArticlePosts.edges.map(function(e){return m.a.createElement(q.a,{key:e.node.id,data:e.node})}),l=[t,n,a],c=h.default.div.withConfig({displayName:"pages__IndexWrapper",componentId:"sc-19r9niq-0"})(["display:flex;flex-direction:column;width:100%;"]),s=h.default.div.withConfig({displayName:"pages__IntroSection",componentId:"sc-19r9niq-1"})(["position:relative;height:67.5em;overflow:hidden;color:",";"],F.b.text),p=h.default.div.withConfig({displayName:"pages__BackgroundFilter",componentId:"sc-19r9niq-2"})(["position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;opacity:0.7;background-color:black;"]),d=Object(h.default)(u.Flex).withConfig({displayName:"pages__IntroBlurb",componentId:"sc-19r9niq-3"})(["position:absolute;top:25%;left:0;right:0;z-index:3;overflow:hidden;text-align:center;"]),x=h.default.span.withConfig({displayName:"pages__IntroTagline",componentId:"sc-19r9niq-4"})(["font-size:1.25em;"]),y=Object(h.default)(z.a).withConfig({displayName:"pages__DarkButton",componentId:"sc-19r9niq-5"})(["&&{a{color:",";:hover{background-color:",";svg{color:",";}span > span{color:",";}}svg{color:",";}}}"],F.b.text,F.b.text,function(e){return e.theme.color},F.b.primary,F.b.text),b=h.default.span.withConfig({displayName:"pages__ArticleColumnTitle",componentId:"sc-19r9niq-6"})(["text-align:center;"]),w=Object(h.default)(u.Box).withConfig({displayName:"pages__Divider",componentId:"sc-19r9niq-7"})(["background-color:",";"],function(e){return e.theme.text}),v=h.default.div.withConfig({displayName:"pages__ShadowWrapper",componentId:"sc-19r9niq-8"})(["position:relative;z-index:50;box-shadow:0 0 1em 0 black;background-color:",";"],function(e){return e.theme.primary}),k=Object(h.default)(u.Flex).withConfig({displayName:"pages__ContactSection",componentId:"sc-19r9niq-9"})(["text-align:center;"]),E=h.default.span.withConfig({displayName:"pages__ContactTagline",componentId:"sc-19r9niq-10"})(["font-size:1.25em;"]);return m.a.createElement(f.a,null,m.a.createElement(g.a,{pathname:this.props.location.pathname}),m.a.createElement(c,null,m.a.createElement(s,null,m.a.createElement(_,{images:l,rate:8e3,subject:"hiking"}),m.a.createElement(T,{images:l,rate:8e3}),m.a.createElement(p,null),m.a.createElement(d,{flexDirection:"column",justifyContent:"center",width:[1,1,1,A.b.s],mx:"auto",px:[4,5,6,5,0]},m.a.createElement("span",{className:"hxxl"},m.a.createElement(B,{prologue:"Hey, my name's ",fontSize:64,lineHeight:1.3,color:F.b.text},"Kyle")),m.a.createElement(x,null,"I'm a Software & Computer Engineer from California with a passion for systems. This site is meant to consolidate the articles, project writeups, and everything else I've thrown together over the years."),m.a.createElement(u.Flex,{justifyContent:"center",flexWrap:"wrap",pt:4},m.a.createElement(u.Box,{width:[1,1,1,.25],pr:[0,0,0,3],mb:[2,2,2,0]},m.a.createElement(y,{type:"internal",to:"/projects",text:"My Projects",icon:["fas","code"]})),m.a.createElement(u.Box,{width:[1,1,1,.25],pl:[0,0,0,3],mt:[2,2,2,0]},m.a.createElement(y,{type:"internal",to:"/articles",text:"My Resume",icon:["fas","paper-plane"]}))))),m.a.createElement(v,null,m.a.createElement(u.Flex,{justifyContent:"center",flexWrap:"wrap",width:[1,1,1,1,A.b.m],mx:"auto",px:[4,5,6,6,0],py:5},m.a.createElement(u.Box,{width:[1,1,1,A.c.m-A.d[6],.44]},m.a.createElement(b,{className:"hxxl"},"Featured Posts"),o),m.a.createElement(w,{width:[1,1,1,A.c.m-A.d[6],"0.25em"],my:[4,4,4,4,0],mx:[2,2,2,2,5],pt:[1,1,1,1,0]}),m.a.createElement(u.Box,{width:[1,1,1,A.c.m-A.d[6],.44]},m.a.createElement(b,{className:"hxxl"},"Recent Posts"),r))),m.a.createElement(R.a,{edges:i}),m.a.createElement(v,null,m.a.createElement(k,{flexDirection:"column",alignItems:"center",px:[4,5,6,6,0],pt:4},m.a.createElement("span",{className:"hxxl"},"Want to get in touch?"),m.a.createElement(E,null,"Shoot me an ",m.a.createElement(W.a,{type:"external",to:"mailto:kyle@carsonkk.com",text:"email",title:"kyle@carsonkk.com"}),", or check out any of the other links below to find me elsewhere online")))))},t}(m.a.Component),M=(t.default=H,"3868708576")},164:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(156),c=n.n(l),s=n(4),p=n.n(s),d=n(145),m=n(159),h=n(165),u=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.icon,i=e.texts,r=e.links,l=e.linkStates,s=e.iconType,p=e.isInline,u=d.default.div.withConfig({displayName:"MetaText",componentId:"sc-1rma57g-0"})(["display:",";padding:0.25em "," 0.25em 0;font-size:0.875em;color:",";svg,img{padding-right:0.375em;}"],p?"inline-flex":"flex",p?"1em":"0",function(e){return e.theme.caption}),f=Object(d.default)(h.a).withConfig({displayName:"MetaText__MetaLink",componentId:"sc-1rma57g-1"})(["&&{a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}}"],function(e){return e.theme.caption},function(e){return e.theme.text},function(e){return e.theme.text}),g=i.map(function(e,a){var c="";return a<i.length-1&&(c=o.a.createElement("span",null,", ")),"text"===n?o.a.createElement("span",{key:a},e,c):o.a.createElement("span",{key:a},o.a.createElement(f,{className:t,type:n,to:r[a],text:e,linkState:l[a]}),c)});return o.a.createElement(u,{className:t},o.a.createElement("div",null,"fa"===s&&o.a.createElement(m.a,{icon:a,fixedWidth:!0}),"svg"===s&&o.a.createElement("object",{data:a[0],type:"image/svg+xml"},o.a.createElement("img",{src:"../images/favicon.png",alt:"favicon"})),"img"===s&&o.a.createElement("img",{src:a[0],alt:""}),"gimg"===s&&o.a.createElement(c.a,{fluid:a[0],alt:""})),o.a.createElement("div",null,g))},t}(o.a.Component);u.defaultProps={icon:[],links:[],linkStates:[],iconType:"fa",isInline:!1},u.propTypes={type:p.a.oneOf(["text","internal","external"]).isRequired,texts:p.a.array.isRequired,icon:p.a.array,links:p.a.array,linkStates:p.a.array,iconType:p.a.oneOf(["none","fa","svg","img","gimg"]),isInline:p.a.bool},t.a=u},165:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(146),p=n(174),d=n(145),m=n(152),h=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.to,i=e.text,r=e.title,l=e.linkState,c=e.intRel,h=e.extRel,u=d.default.span.withConfig({displayName:"SmartLink__SmartLinkWrapper",componentId:"sc-1jh8kcb-0"})([""," a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}"],m.d,function(e){return e.theme.color},function(e){return e.theme.accent},function(e){return e.theme.accent});return o.a.createElement(u,{className:t},"internal"===n&&o.a.createElement(s.Link,{to:a,title:r,getProps:function(e){return e.isPartiallyCurrent?{className:"active"}:null},state:l,rel:c},i),"external"===n&&o.a.createElement(p.OutboundLink,{href:a,title:r,target:"_blank",rel:h},i))},t}(o.a.Component);h.defaultProps={title:"",linkState:{},intRel:"",extRel:"external nofollow noopener noreferrer"},h.propTypes={type:c.a.oneOf(["internal","external"]).isRequired,to:c.a.string.isRequired,text:c.a.string.isRequired,title:c.a.string,linkState:c.a.object,intRel:c.a.string,extRel:c.a.string},t.a=h},183:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(e){var t=new Date(e);return new Date(t.getTime()- -6e4*t.getTimezoneOffset())}function r(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}function o(e){var t=i(e);return a[t.getMonth()]+" "+r(t.getDate())+", "+t.getFullYear()}},194:function(e,t,n){"use strict";n(168);var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(146),c=n(199),s=n.n(c),p=n(145),d=n(164),m=n(183),h=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.frontmatter,n=e.fields,a=e.id,i=e.timeToRead,r=e.excerpt,c=n.type,h=n.slug,u=t.created,f=t.title,g=t.topic,x=t.icon,y=t.tags,b=t.description,w=p.default.div.withConfig({displayName:"TextPreview__TextPreviewWrapper",componentId:"sc-1iowez4-0"})(["margin-bottom:2em;"]),v=p.default.div.withConfig({displayName:"TextPreview__Title",componentId:"sc-1iowez4-1"})(["line-height:1;a{display:inline-flex;line-height:1.5;:hover{div{transform:scaleY(0.9);}}div{transition:transform 0.3s;transform-origin:top;transform:scaleY(0);width:0.25rem;margin-left:-1em;margin-right:0.75em;background-color:",";}}h4{margin-bottom:0.125em;}"],function(e){return e.theme.text}),k=p.default.div.withConfig({displayName:"TextPreview__PreviewDescription",componentId:"sc-1iowez4-2"})(["margin-top:0.375em;"]);return o.a.createElement(w,{key:a},f&&h&&o.a.createElement(v,null,o.a.createElement(l.Link,{to:""+h},o.a.createElement("div",null),o.a.createElement("h4",null,f))),c&&g&&x&&o.a.createElement(d.a,{type:"text",icon:["fas",x],texts:[g+" "+s.a.capitalize(c)],isInline:!0}),u&&o.a.createElement(d.a,{type:"text",icon:["far","calendar-alt"],texts:[Object(m.a)(Date.parse(u))],isInline:!0}),i&&o.a.createElement(d.a,{type:"text",icon:["far","clock"],texts:[i+" min read"],isInline:!0}),y&&o.a.createElement(d.a,{type:"internal",icon:["fas","tags"],texts:y,links:Array(y.length).fill("/search"),linkStates:y.map(function(e){return{tag:e}})}),o.a.createElement(k,null,r&&"article"===c&&o.a.createElement("span",null,r),b&&"article"!==c&&o.a.createElement("span",null,b)))},t}(o.a.Component);t.a=h},214:function(e,t,n){"use strict";var a=n(6),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(160),p=n(156),d=n.n(p),m=n(146),h=n(145),u=n(159),f=n(153),g=function(e){function t(t){var n;n=e.call(this,t)||this;var a=Object(f.e)();return n.state={angle:a,percents:Object(f.a)((a+45)%360),lightColor:Object(f.f)(),darkColor:Object(f.f)(),duration:Object(f.h)(4,8)},n}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.data,n=e.width,a=e.image,i=t.frontmatter,r=t.fields.slug,l=i.title,c=i.icon,p=i.description,g=Object(h.default)(s.Box).withConfig({displayName:"ImagePreview__ImagePreviewWrapper",componentId:"sc-1ymef91-0"})(["transition:all 0.3s;position:relative;overflow:hidden;min-height:15em;:hover{> div:first-child{filter:blur(0);transform:scale(1.1);}> div:nth-child(2){opacity:0.5;}> a > div:last-child > h2{transition-delay:0s;transition-timing-function:ease-out;top:0.25em;transform:translate(-50%,0.25em);}> a > div:last-child > div:nth-child(2){transition-delay:0.1s;opacity:1;}> a > div:last-child > div:last-child{transition:opacity 0.4s;opacity:1;}}*{backface-visibility:hidden;}"]),x=h.default.div.withConfig({displayName:"ImagePreview__PostPreview",componentId:"sc-1ymef91-1"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;color:",";"],f.b.text),y=h.default.h2.withConfig({displayName:"ImagePreview__PostTitle",componentId:"sc-1ymef91-2"})(["transition:all 0.3s;transition-delay:0.1s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 2em);margin:0;padding:0 1em;text-align:center;"]),b=h.default.div.withConfig({displayName:"ImagePreview__BackgroundFilter",componentId:"sc-1ymef91-3"})(["transition:opacity 0.3s;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.7;background-color:black;"]),w=h.default.div.withConfig({displayName:"ImagePreview__Description",componentId:"sc-1ymef91-4"})(["transition:opacity 0.3s;transition-delay:0s;flex-grow:1;display:flex;justify-content:center;align-items:center;padding:0 1em;opacity:0;font-size:1.25em;text-align:center;span{font-style:italic;}"]),v=h.default.div.withConfig({displayName:"ImagePreview__Icon",componentId:"sc-1ymef91-5"})(["transition:opacity 0.3s;position:absolute;bottom:0.125em;right:0.25em;transform:translate(-0.25em,-0.125em);opacity:0;font-size:2.25em;"]),k=Object(h.keyframes)(["0%{background-position:","% ","%;}50%{background-position:","% ","%;}100%{background-position:","% ","%;}"],this.state.percents[0],this.state.percents[1],this.state.percents[2],this.state.percents[3],this.state.percents[0],this.state.percents[1]),E=a?h.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-6"})(["transition:transform 0.4s,filter 0.6s;filter:blur(0.5rem);height:100%;> div{height:100%;}"]):h.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-7"})(["height:100%;background:linear-gradient(","deg,",",",");background-size:400% 400%;animation:"," ","s ease infinite;"],this.state.angle,this.state.lightColor,this.state.darkColor,k,this.state.duration);return o.a.createElement(g,{width:[1,1,1,n[0],n[0],n[1]]},o.a.createElement(E,null,a&&o.a.createElement(d.a,{fluid:a,alt:"Image Preview"})),o.a.createElement(b,null),o.a.createElement(m.Link,{to:r},o.a.createElement(x,null,o.a.createElement(y,null,l),o.a.createElement(w,null,o.a.createElement("span",null,p)),o.a.createElement(v,null,o.a.createElement(u.a,{icon:c})))))},t}(o.a.Component);g.propTypes={data:c.a.object.isRequired,width:c.a.array.isRequired,image:c.a.object};var x=g,y=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.edges,t=e.map(function(t,n){var a=t.node.frontmatter.banner,i=e.length,r=i%6,l=[.5,1/3];if(n>=i-2)if(n===i-2)switch(r){case 2:case 5:l=[.5,.5]}else if(n===i-1)switch(r){case 1:l=[1,1];break;case 2:l=[.5,.5];break;case 3:l=[1,1/3];break;case 4:l=[.5,1];break;case 5:l=[1,.5]}return o.a.createElement(x,{key:n,data:t.node,width:l,image:a?a.childImageSharp.fluid:null})});return o.a.createElement(s.Flex,{flexWrap:"wrap",width:1},t)},t}(o.a.Component);y.propTypes={edges:c.a.array.isRequired};t.a=y},664:function(e,t,n){e.exports=n.p+"static/crystalize-d516798d1ff615365468344facf82372.jpg"}}]);
//# sourceMappingURL=component---src-pages-index-js-4a7fb85c09958c41c345.js.map