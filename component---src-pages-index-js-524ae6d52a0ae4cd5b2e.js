(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{148:function(e,t,n){"use strict";n.r(t);var a,i,r,o,l,c,s=n(7),p=n.n(s),d=n(0),h=n.n(d),m=n(153),u=n(163),f=n(175),g=n(173),x=n(54),y=n.n(x),w=(n(529),n(4)),v=n.n(w),b=n(166),k=n.n(b),E=n(530),O=n.n(E),j=n(532),I=n(633),P=n(632),C=n.n(P);var S=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={currIndex:0,nextIndex:1},n.tick=n.tick.bind(y()(n)),n.LaunchShow=n.LaunchShow.bind(y()(n)),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.LaunchShow(),this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){!function(e,t){if(0!==o.children.length){var n=new I.TimelineMax({onComplete:function(){!0===a.wacky&&l.scale.set(1)},onUpdate:function(){!0===a.wacky&&(l.rotation+=.02*n.progress(),l.scale.set(3*n.progress()))}});if(n.clear(),n.isActive())return;n.to(c.scale,1,{x:a.displaceScale[0],y:a.displaceScale[1],ease:I.Power1.easeOut}).to(o.children[e],.5,{alpha:0,ease:I.Power2.easeOut},.2).to(o.children[t],.5,{alpha:1,ease:I.Power2.easeOut},.3).to(c.scale,1,{x:a.displaceScaleTo[0],y:a.displaceScaleTo[1],ease:I.Power2.easeOut},.3)}}(this.state.currIndex,this.state.nextIndex),this.state.currIndex=this.state.nextIndex,this.state.nextIndex=(this.state.nextIndex+1)%this.props.images.length},n.LaunchShow=function(){O()(".slideshow-container",function(){for(var e,t=document.querySelectorAll(".slide-image"),n=[],s=0;s<t.length;s++){var p=t[s].getElementsByTagName("img")[1];null!=p&&n.push(p.getAttribute("src"))}e={sprites:n,displacementImage:C.a,autoPlay:!1,displaceScale:[300,300],fullScreen:!0,centerSprites:!0,wacky:!0,appendElement:document.querySelector(".slideshow-container")},(a=e||{}).stageWidth=e.hasOwnProperty("stageWidth")?e.stageWidth:1920,a.stageHeight=e.hasOwnProperty("stageHeight")?e.stageHeight:1080,a.pixiSprites=e.hasOwnProperty("sprites")?e.sprites:[],a.centerSprites=!!e.hasOwnProperty("centerSprites")&&e.centerSprites,a.texts=e.hasOwnProperty("texts")?e.texts:[],a.autoPlay=!!e.hasOwnProperty("autoPlay")&&e.autoPlay,a.autoPlaySpeed=e.hasOwnProperty("autoPlaySpeed")?e.autoPlaySpeed:[10,3],a.fullScreen=!e.hasOwnProperty("fullScreen")||e.fullScreen,a.displaceScale=e.hasOwnProperty("displaceScale")?e.displaceScale:[200,70],a.displacementImage=e.hasOwnProperty("displacementImage")?e.displacementImage:"",a.navElement=e.hasOwnProperty("navElement")?e.navElement:document.querySelectorAll(".scene-nav"),a.displaceAutoFit=!!e.hasOwnProperty("displaceAutoFit")&&e.displaceAutoFit,a.wacky=!!e.hasOwnProperty("wacky")&&e.wacky,a.interactive=!!e.hasOwnProperty("interactive")&&e.interactive,a.interactionEvent=e.hasOwnProperty("interactionEvent")?e.interactionEvent:"",a.displaceScaleTo=!1===e.autoPlay?[0,0]:[20,20],a.textColor=e.hasOwnProperty("textColor")?e.textColor:"#fff",a.displacementCenter=!!e.hasOwnProperty("displacementCenter")&&e.displacementCenter,a.dispatchPointerOver=!!e.hasOwnProperty("dispatchPointerOver")&&e.dispatchPointerOver,a.appendElement=e.hasOwnProperty("appendElement")?e.appendElement:document.body,j.utils.skipHello(),i=new j.autoDetectRenderer(a.stageWidth,a.stageHeight,{transparent:!0}),r=new j.Container,o=new j.Container,l=new j.Sprite.fromImage(a.displacementImage),c=new j.filters.DisplacementFilter(l),function(){if(!0===a.autoPlay){var e=new j.ticker.Ticker;e.autoStart=a.autoPlay,e.add(function(e){l.x+=a.autoPlaySpeed[0]*e,l.y+=a.autoPlaySpeed[1],i.render(r)})}else{var t=new j.ticker.Ticker;t.autoStart=!0,t.add(function(e){i.render(r)})}}(),a.appendElement.appendChild(i.view),r.addChild(o),r.interactive=!0,!0===a.fullScreen?(i.view.style.objectFit="cover",i.view.style.width="100%",i.view.style.height="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-51%, -51%) scale(1.02)",i.view.style.transform="translate(-51%, -51%) scale(1.02)"):(i.view.style.maxWidth="100%",i.view.style.top="50%",i.view.style.left="50%",i.view.style.webkitTransform="translate(-50%, -50%)",i.view.style.transform="translate(-50%, -50%)"),l.texture.baseTexture.wrapMode=j.WRAP_MODES.REPEAT,r.filters=[c],!1===a.autoPlay&&(c.scale.x=0,c.scale.y=0),!0===a.wacky&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),l.scale.x=2,l.scale.y=2,c.autoFit=a.displaceAutoFit,r.addChild(l),function(e){for(var t=a.sprites,n=0;n<t.length;n++){var r=new j.Texture.fromImage(e[n]),l=new j.Sprite(r);!0===a.centerSprites&&(l.anchor.set(.5),l.x=i.width/2,l.y=i.height/2),0!==n&&I.TweenMax.set(l,{alpha:0}),o.addChild(l)}}(a.pixiSprites)})},n.render=function(){var e=this.props,t=e.images,n=e.subject,a=m.default.div.withConfig({displayName:"Slideshow__SlideshowWrapper",componentId:"sc-1vkta5o-0"})(["position:absolute;width:100%;height:100%;> div:first-child{position:absolute;z-index:0;left:0;top:0;}> div:nth-child(2){position:relative;z-index:0;}canvas{display:block;position:absolute;z-index:2;}"]);return h.a.createElement(a,{className:"slideshow-container"},h.a.createElement("div",null,t.map(function(e,t){return h.a.createElement(k.a,{key:t,fluid:e.fluid,critical:!0,fadeIn:!1,className:"slide-image",alt:n+"-"+t})})),t[0]&&h.a.createElement(k.a,{fluid:t[0].fluid,alt:"placeholder"}))},t}(h.a.Component);S.propTypes={images:v.a.array.isRequired,rate:v.a.number.isRequired,subject:v.a.string},S.defaultProps={subject:"slide"};var _=S,N=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={bgIndex:0},n.tick=n.tick.bind(y()(n)),n.tock=n.tock.bind(y()(n)),n}p()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.intervalHandler=setInterval(this.tick,this.props.rate)},n.componentWillUnmount=function(){clearInterval(this.intervalHandler)},n.tick=function(){setTimeout(this.tock,this.props.rate/2)},n.tock=function(){var e=this;this.refs.bg&&this.setState(function(t){return{bgIndex:(t.bgIndex+1)%e.props.images.length}})},n.render=function(){var e=this.props.images,t=this.state.bgIndex,n=m.default.div.withConfig({displayName:"BackgroundSlideshow",componentId:"sc-50pilu-0"})(["position:absolute;left:50%;top:50%;width:100%;height:100%;z-index:1;transform:translate(-51%,-51%) scale(1.02);> div{height:100%;}"]);return h.a.createElement(n,{ref:"bg"},e[t]&&h.a.createElement(k.a,{fluid:e[t].fluid,alt:"background-slide"}))},t}(h.a.Component);N.propTypes={images:v.a.array.isRequired,rate:v.a.number.isRequired};var T=N,z=n(164),q=n(196),R=n(217),W=n(171),M=n(162),F=n(160),A=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props,t=e.children,n=e.prologue,a=e.epilogue,i=e.fontSize,r=e.lineHeight,o=e.color,l=e.background,c=Object(m.keyframes)(["0%{clip:rect(","px,1000px,","px,0);}5%{clip:rect(","px,1000px,","px,0);}10%{clip:rect(","px,1000px,","px,0);}15%{clip:rect(","px,1000px,","px,0);}20%{clip:rect(","px,1000px,","px,0);}25%{clip:rect(","px,1000px,","px,0);}30%{clip:rect(","px,1000px,","px,0);}35%{clip:rect(","px,1000px,","px,0);}40%{clip:rect(","px,1000px,","px,0);}45%{clip:rect(","px,1000px,","px,0);}50%{clip:rect(","px,1000px,","px,0);}55%{clip:rect(","px,1000px,","px,0);}60%{clip:rect(","px,1000px,","px,0);}65%{clip:rect(","px,1000px,","px,0);}70%{clip:rect(","px,1000px,","px,0);}80%{clip:rect(","px,1000px,","px,0);}85%{clip:rect(","px,1000px,","px,0);}90%{clip:rect(","px,1000px,","px,0);}95%{clip:rect(","px,1000px,","px,0);}100%{clip:rect(","px,1000px,","px,0);}"],Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i),Object(M.h)(1,i)),s=Object(m.keyframes)(["0%{transform:translate(0);}3%{transform:translate(-","px,","px);}6%{transform:translate(-","px,-","px);}9%{transform:translate(","px,","px);}12%{transform:translate(","px,-","px);}15%{transform:translate(0);}100%{transform:translate(0);}"],Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7),Object(M.h)(3,7)),p=m.default.span.withConfig({displayName:"GlitchedText__GlitchedTextWrapper",componentId:"sc-96oumu-0"})(["position:relative;font-size:","px;line-height:",";span:nth-child(2){color:",";background:",";position:relative;:hover{cursor:vertical-text;span:nth-child(2){animation:"," 3s infinite linear alternate-reverse;}span:nth-child(3){animation:"," 2s infinite linear alternate-reverse;}span:nth-child(4){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) both infinite;}span:nth-child(5){animation:"," 2.75s cubic-bezier(.25,.45,.45,.95) reverse both infinite;}}span:nth-child(1){position:relative;z-index:10;}span:nth-child(n+2):nth-child(-n+5){display:block;position:absolute;top:0;}span:nth-child(2),span:nth-child(3){z-index:9;clip:rect(0,1000px,0,0);}span:nth-child(2){left:-2px;color:#f0f;}span:nth-child(3){left:2px;color:#0f0;}span:nth-child(4),span:nth-child(5){z-index:8;left:0;}span:nth-child(4){color:#0ff;}span:nth-child(5){color:#ff0;}}"],i,r,o,l,c,c,s,s);return h.a.createElement(p,null,h.a.createElement("span",null,n),h.a.createElement("span",null,h.a.createElement("span",null,t),h.a.createElement("span",null,t),h.a.createElement("span",null,t),h.a.createElement("span",null,t),h.a.createElement("span",null,t)),h.a.createElement("span",null,a))},t}(h.a.Component);A.propTypes={prologue:v.a.string,epilogue:v.a.string,fontSize:v.a.number.isRequired,lineHeight:v.a.number,color:v.a.string,backgroundColor:v.a.string},A.defaultProps={prologue:"",epilogue:"",lineHeight:1,color:"white",background:"transparent"};var D=A;n.d(t,"pageQuery",function(){return H});var B=function(e){function t(){return e.apply(this,arguments)||this}return p()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.hiking_1,n=e.hiking_2,a=e.hiking_3,i=e.featuredProjectPosts.edges,r=e.recentArticlePosts.edges.map(function(e){return h.a.createElement(q.a,{key:e.node.id,data:e.node})}),o=e.featuredArticlePosts.edges.map(function(e){return h.a.createElement(q.a,{key:e.node.id,data:e.node})}),l=[t,n,a],c=m.default.div.withConfig({displayName:"pages__IndexWrapper",componentId:"sc-19r9niq-0"})(["display:flex;flex-direction:column;width:100%;"]),s=m.default.div.withConfig({displayName:"pages__IntroSection",componentId:"sc-19r9niq-1"})(["position:relative;height:67.5em;overflow:hidden;color:",";"],M.b.text),p=m.default.div.withConfig({displayName:"pages__BackgroundFilter",componentId:"sc-19r9niq-2"})(["position:absolute;top:0;left:0;width:100%;height:100%;z-index:3;opacity:0.7;background-color:black;"]),d=Object(m.default)(u.Flex).withConfig({displayName:"pages__IntroBlurb",componentId:"sc-19r9niq-3"})(["position:absolute;top:25%;left:0;right:0;z-index:3;overflow:hidden;text-align:center;"]),x=m.default.span.withConfig({displayName:"pages__IntroTagline",componentId:"sc-19r9niq-4"})(["font-size:1.25em;"]),y=Object(m.default)(z.a).withConfig({displayName:"pages__DarkButton",componentId:"sc-19r9niq-5"})(["&&{a{color:",";:hover{background-color:",";svg{color:",";}span > span{color:",";}}svg{color:",";}}}"],M.b.text,M.b.text,function(e){return e.theme.color},M.b.primary,M.b.text),w=m.default.span.withConfig({displayName:"pages__ArticleColumnTitle",componentId:"sc-19r9niq-6"})(["text-align:center;"]),v=Object(m.default)(u.Box).withConfig({displayName:"pages__Divider",componentId:"sc-19r9niq-7"})(["background-color:",";"],function(e){return e.theme.text}),b=m.default.div.withConfig({displayName:"pages__ShadowWrapper",componentId:"sc-19r9niq-8"})(["position:relative;z-index:50;box-shadow:0 0 1em 0 black;background-color:",";"],function(e){return e.theme.primary}),k=Object(m.default)(u.Flex).withConfig({displayName:"pages__ContactSection",componentId:"sc-19r9niq-9"})(["text-align:center;"]),E=m.default.span.withConfig({displayName:"pages__ContactTagline",componentId:"sc-19r9niq-10"})(["font-size:1.25em;"]);return h.a.createElement(f.a,null,h.a.createElement(g.a,{pathname:this.props.location.pathname}),h.a.createElement(c,null,h.a.createElement(s,null,h.a.createElement(_,{images:l,rate:8e3,subject:"hiking"}),h.a.createElement(T,{images:l,rate:8e3}),h.a.createElement(p,null),h.a.createElement(d,{flexDirection:"column",justifyContent:"center",width:[1,1,1,F.f.s],mx:"auto",px:[4,5,6,5,0]},h.a.createElement("span",{className:"hxxl"},h.a.createElement(D,{prologue:"Hey, my name's ",fontSize:64,lineHeight:1.3,color:M.b.text},"Kyle")),h.a.createElement(x,null,"I'm a Software & Computer Engineer from California with a passion for systems. This site is meant to consolidate the articles, project writeups, and everything else I've thrown together over the years."),h.a.createElement(u.Flex,{justifyContent:"center",flexWrap:"wrap",pt:4},h.a.createElement(u.Box,{width:[1,1,1,.25],pr:[0,0,0,3],mb:[3,3,3,0]},h.a.createElement(y,{type:"internal",to:"/projects",text:"My Projects",icon:["fas","code"]})),h.a.createElement(u.Box,{width:[1,1,1,.25],pl:[0,0,0,3],mt:[3,3,3,0]},h.a.createElement(y,{type:"internal",to:"/resume",text:"My Resume",icon:["fas","code"]}))))),h.a.createElement(b,null,h.a.createElement(u.Flex,{justifyContent:"center",flexWrap:"wrap",width:[1,1,1,1,F.f.m-2],mx:"auto",px:[4,5,6,6,0],py:5},h.a.createElement(u.Box,{width:[1,1,1,F.g.m-F.h[6],.44]},h.a.createElement(w,{className:"hxxl"},"Featured Posts"),o),h.a.createElement(v,{width:[1,1,1,F.g.m-F.h[6],"0.25em"],my:[4,4,4,4,0],mx:[2,2,2,2,5],pt:[1,1,1,1,0]}),h.a.createElement(u.Box,{width:[1,1,1,F.g.m-F.h[6],.44]},h.a.createElement(w,{className:"hxxl"},"Recent Posts"),r))),h.a.createElement(R.a,{edges:i}),h.a.createElement(b,null,h.a.createElement(k,{flexDirection:"column",alignItems:"center",px:[4,5,6,6,0],pt:5},h.a.createElement("span",{className:"hxxl"},"Want to get in touch?"),h.a.createElement(E,null,"Shoot me an ",h.a.createElement(W.a,{type:"external",to:"mailto:kyle@carsonkk.com",text:"email",title:"kyle@carsonkk.com"}),", or check out any of the other links below to find me elsewhere online")))))},t}(h.a.Component),H=(t.default=B,"3868708576")},171:function(e,t,n){"use strict";var a=n(7),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(154),p=n(179),d=n(153),h=n(161),m=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.to,i=e.text,r=e.title,l=e.linkState,c=e.intRel,m=e.extRel,u=d.default.span.withConfig({displayName:"SmartLink__SmartLinkWrapper",componentId:"sc-1jh8kcb-0"})([""," a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}"],h.d,function(e){return e.theme.color},function(e){return e.theme.accent},function(e){return e.theme.accent});return o.a.createElement(u,{className:t},"internal"===n&&o.a.createElement(s.a,{to:a,title:r,getProps:function(e){return e.isPartiallyCurrent?{className:"active"}:null},state:l,rel:c},i),"external"===n&&o.a.createElement(p.OutboundLink,{href:a,title:r,target:"_blank",rel:m},i))},t}(o.a.Component);m.defaultProps={title:"",linkState:{},intRel:"",extRel:"external nofollow noopener noreferrer"},m.propTypes={type:c.a.oneOf(["internal","external"]).isRequired,to:c.a.string.isRequired,text:c.a.string.isRequired,title:c.a.string,linkState:c.a.object,intRel:c.a.string,extRel:c.a.string},t.a=m},174:function(e,t,n){"use strict";var a=n(7),i=n.n(a),r=n(0),o=n.n(r),l=n(166),c=n.n(l),s=n(4),p=n.n(s),d=n(153),h=n(170),m=n(171),u=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.className,n=e.type,a=e.icon,i=e.texts,r=e.links,l=e.linkStates,s=e.iconType,p=e.isInline,u=d.default.div.withConfig({displayName:"MetaText",componentId:"sc-1rma57g-0"})(["display:",";padding:0.25em "," 0.25em 0;font-size:0.875em;color:",";> div:first-child{padding-right:0.375em;}"],p?"inline-flex":"flex",p?"1em":"0",function(e){return e.theme.caption}),f=Object(d.default)(m.a).withConfig({displayName:"MetaText__MetaLink",componentId:"sc-1rma57g-1"})(["&&{a{transition:all 0.3s;color:",";:hover{color:",";}::before{background-color:",";}}}"],function(e){return e.theme.caption},function(e){return e.theme.text},function(e){return e.theme.text}),g=i.map(function(e,a){var c="";return a<i.length-1&&(c=o.a.createElement("span",null,", ")),"text"===n?o.a.createElement("span",{key:a},e,c):o.a.createElement("span",{key:a},o.a.createElement(f,{className:t,type:n,to:r[a],text:e,linkState:l[a]}),c)});return o.a.createElement(u,{className:t},o.a.createElement("div",null,"fa"===s&&o.a.createElement(h.a,{icon:a,fixedWidth:!0}),"svg"===s&&o.a.createElement("object",{data:a[0],type:"image/svg+xml"},o.a.createElement("img",{src:"../images/favicon.png",alt:"favicon"})),"img"===s&&o.a.createElement("img",{src:a[0],alt:""}),"gimg"===s&&o.a.createElement(c.a,{fluid:a[0],alt:""})),o.a.createElement("div",null,g))},t}(o.a.Component);u.defaultProps={icon:[],links:[],linkStates:[],iconType:"fa",isInline:!1},u.propTypes={type:p.a.oneOf(["text","internal","external"]).isRequired,texts:p.a.array.isRequired,icon:p.a.array,links:p.a.array,linkStates:p.a.array,iconType:p.a.oneOf(["none","fa","svg","img","gimg"]),isInline:p.a.bool},t.a=u},188:function(e,t,n){"use strict";n.d(t,"a",function(){return o});var a=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];function i(e){var t=new Date(e);return new Date(t.getTime()- -6e4*t.getTimezoneOffset())}function r(e){return e+(e>0?["th","st","nd","rd"][e>3&&e<21||e%10>3?0:e%10]:"")}function o(e){var t=i(e);return a[t.getMonth()]+" "+r(t.getDate())+", "+t.getFullYear()}},196:function(e,t,n){"use strict";n(176);var a=n(7),i=n.n(a),r=n(0),o=n.n(r),l=n(154),c=n(201),s=n.n(c),p=n(153),d=n(174),h=n(188),m=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.frontmatter,n=e.fields,a=e.id,i=e.timeToRead,r=e.excerpt,c=n.type,m=n.slug,u=t.created,f=t.title,g=t.topic,x=t.icon,y=t.tags,w=t.description,v=p.default.div.withConfig({displayName:"TextPreview__TextPreviewWrapper",componentId:"sc-1iowez4-0"})(["margin-bottom:2em;"]),b=p.default.div.withConfig({displayName:"TextPreview__Title",componentId:"sc-1iowez4-1"})(["line-height:1;a{display:inline-flex;line-height:1.5;:hover{div{transform:scaleY(0.9);}}div{transition:transform 0.3s;transform-origin:top;transform:scaleY(0);width:0.25rem;margin-left:-1em;margin-right:0.75em;background-color:",";}}h4{margin-bottom:0.125em;}"],function(e){return e.theme.text}),k=p.default.div.withConfig({displayName:"TextPreview__PreviewDescription",componentId:"sc-1iowez4-2"})(["margin-top:0.375em;"]);return o.a.createElement(v,{key:a},f&&m&&o.a.createElement(b,null,o.a.createElement(l.a,{to:""+m},o.a.createElement("div",null),o.a.createElement("h4",null,f))),c&&g&&x&&o.a.createElement(d.a,{type:"text",icon:["fas",x],texts:[g+" "+s.a.capitalize(c)],isInline:!0}),u&&o.a.createElement(d.a,{type:"text",icon:["far","calendar-alt"],texts:[Object(h.a)(Date.parse(u))],isInline:!0}),i&&o.a.createElement(d.a,{type:"text",icon:["far","clock"],texts:[i+" min read"],isInline:!0}),y&&o.a.createElement(d.a,{type:"internal",icon:["fas","tags"],texts:y,links:Array(y.length).fill("/search"),linkStates:y.map(function(e){return{tag:e}})}),o.a.createElement(k,null,r&&"article"===c&&o.a.createElement("span",null,r),w&&"article"!==c&&o.a.createElement("span",null,w)))},t}(o.a.Component);t.a=m},217:function(e,t,n){"use strict";var a=n(7),i=n.n(a),r=n(0),o=n.n(r),l=n(4),c=n.n(l),s=n(163),p=n(166),d=n.n(p),h=n(154),m=n(153),u=n(170),f=n(162),g=function(e){function t(t){var n;n=e.call(this,t)||this;var a=Object(f.f)(),i=Math.floor(Math.random()*f.c.length),r=f.c[i],o=f.c[(i+3+Math.floor(4*Math.random()))%f.c.length];return n.state={angle:a,percents:Object(f.a)((a+45)%360),firstColor:r,secondColor:o,duration:4},n}return i()(t,e),t.prototype.render=function(){var e=this.props,t=e.data,n=e.width,a=e.image,i=t.frontmatter,r=t.fields.slug,l=i.title,c=i.icon,p=i.description,g=Object(m.keyframes)(["0%{background-position:","% ","%;}50%{background-position:","% ","%;}100%{background-position:","% ","%;}"],this.state.percents[0],this.state.percents[1],this.state.percents[2],this.state.percents[3],this.state.percents[0],this.state.percents[1]),x=Object(m.default)(s.Box).withConfig({displayName:"ImagePreview__ImagePreviewWrapper",componentId:"sc-1ymef91-0"})(["transition:all 0.3s;position:relative;overflow:hidden;min-height:15em;:hover{> div:first-child{filter:blur(0);transform:scale(1.1);animation:",";}> div:nth-child(2){opacity:0.5;}> a > div:last-child > h2{transition-delay:0s;transition-timing-function:ease-out;top:0.25em;transform:translate(-50%,0.25em);}> a > div:last-child > div:nth-child(2){transition-delay:0.1s;opacity:1;}> a > div:last-child > div:last-child{transition:opacity 0.4s;opacity:1;}}*{backface-visibility:hidden;}"],a?"none":Object(m.css)([""," ","s ease infinite"],g,this.state.duration)),y=m.default.div.withConfig({displayName:"ImagePreview__PostPreview",componentId:"sc-1ymef91-1"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;color:",";"],f.b.text),w=m.default.h2.withConfig({displayName:"ImagePreview__PostTitle",componentId:"sc-1ymef91-2"})(["transition:all 0.3s;transition-delay:0.1s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 2em);margin:0;padding:0 1em;text-align:center;"]),v=m.default.div.withConfig({displayName:"ImagePreview__BackgroundFilter",componentId:"sc-1ymef91-3"})(["transition:opacity 0.3s;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.7;background-color:black;"]),b=m.default.div.withConfig({displayName:"ImagePreview__Description",componentId:"sc-1ymef91-4"})(["transition:opacity 0.3s;transition-delay:0s;flex-grow:1;display:flex;justify-content:center;align-items:center;padding:0 1em;opacity:0;font-size:1.25em;text-align:center;span{font-style:italic;}"]),k=m.default.div.withConfig({displayName:"ImagePreview__Icon",componentId:"sc-1ymef91-5"})(["transition:opacity 0.3s;position:absolute;bottom:0.125em;right:0.25em;transform:translate(-0.25em,-0.125em);opacity:0;font-size:2.25em;"]),E=a?m.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-6"})(["transition:transform 0.4s,filter 0.6s;filter:blur(0.5rem);height:100%;> div{height:100%;}"]):m.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-7"})(["height:100%;background:linear-gradient(","deg,",",",");background-size:175% 175%;"],this.state.angle,this.state.firstColor,this.state.secondColor);return o.a.createElement(x,{width:[1,1,1,n[0],n[0],n[1]]},o.a.createElement(E,null,a&&o.a.createElement(d.a,{fluid:a,alt:"Image Preview"})),o.a.createElement(v,null),o.a.createElement(h.a,{to:r},o.a.createElement(y,null,o.a.createElement(w,null,l),o.a.createElement(b,null,o.a.createElement("span",null,p)),o.a.createElement(k,null,o.a.createElement(u.a,{icon:c})))))},t}(o.a.Component);g.propTypes={data:c.a.object.isRequired,width:c.a.array.isRequired,image:c.a.object};var x=g,y=function(e){function t(){return e.apply(this,arguments)||this}return i()(t,e),t.prototype.render=function(){var e=this.props.edges,t=e.map(function(t,n){var a=t.node.frontmatter.banner,i=e.length,r=i%6,l=[.5,1/3];if(n>=i-2)if(n===i-2)switch(r){case 2:case 5:l=[.5,.5]}else if(n===i-1)switch(r){case 1:l=[1,1];break;case 2:l=[.5,.5];break;case 3:l=[1,1/3];break;case 4:l=[.5,1];break;case 5:l=[1,.5]}return o.a.createElement(x,{key:n,data:t.node,width:l,image:a?a.childImageSharp.fluid:null})});return o.a.createElement(s.Flex,{flexWrap:"wrap",width:1},t)},t}(o.a.Component);y.propTypes={edges:c.a.array.isRequired};t.a=y},632:function(e,t,n){e.exports=n.p+"static/crystalize-d516798d1ff615365468344facf82372.jpg"}}]);
//# sourceMappingURL=component---src-pages-index-js-524ae6d52a0ae4cd5b2e.js.map