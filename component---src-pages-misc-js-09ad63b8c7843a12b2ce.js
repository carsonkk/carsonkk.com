(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{135:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return p});var i=a(6),r=a.n(i),n=a(0),s=a.n(n),o=a(145),l=a(161),d=a(163),c=a(162),u=a(214),f=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data.allMarkdownRemark.edges,t=o.default.div.withConfig({displayName:"misc__ShadowWrapper",componentId:"sc-1jdv9r-0"})(["flex:1;position:relative;z-index:1;min-height:1em;box-shadow:0em 0em 1em 0 black;"]);return s.a.createElement(d.a,null,s.a.createElement(c.a,{pathname:this.props.location.pathname,title:"Misc",description:"Miscellaneous things"}),s.a.createElement(l.Flex,{flexDirection:"column",width:1},s.a.createElement(u.a,{edges:e}),s.a.createElement(t,null)))},t}(s.a.Component);t.default=f;var p="521460879"},157:function(e,t,a){"use strict";var i=a(7);t.__esModule=!0,t.default=void 0;var r,n=i(a(6)),s=i(a(48)),o=i(a(197)),l=i(a(150)),d=i(a(0)),c=i(a(4)),u=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},p=function(e){var t=u(e),a=t.fluid?t.fluid.src:t.fixed.src;return!!f[a]||(f[a]=!0,!1)},h=[];var m=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){h.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),h.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",i=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+a+"/>":"",r=e.srcSet?'<source srcSet="'+e.srcSet+'" '+a+"/>":"",n=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+i+r+"<img "+o+l+t+s+n+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=d.default.forwardRef(function(e,t){var a=e.style,i=e.onLoad,r=e.onError,n=(0,o.default)(e,["style","onLoad","onError"]);return d.default.createElement("img",(0,l.default)({},n,{onLoad:i,onError:r,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},a)}))});y.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var b=function(e){function t(t){var a;a=e.call(this,t)||this;var i=!0,r=!0,n=!1,o=t.fadeIn,l=p(t);!l&&"undefined"!=typeof window&&window.IntersectionObserver&&(i=!1,r=!1,n=!0),"undefined"==typeof window&&(i=!1,r=!1),t.critical&&(i=!0,r=!1,n=!1);var c=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:i,imgLoaded:r,IOSupported:n,fadeIn:o,hasNoScript:c,seenBefore:l},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,s.default)((0,s.default)(a))),a.handleRef=a.handleRef.bind((0,s.default)((0,s.default)(a))),a}(0,n.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&m(e,function(){t.setState({isVisible:!0})})},a.handleImageLoaded=function(){this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=u(this.props),t=e.title,a=e.alt,i=e.className,r=e.style,n=void 0===r?{}:r,s=e.imgStyle,o=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,h=e.fluid,m=e.fixed,b=e.backgroundColor,w=e.Tag,v="boolean"==typeof b?"lightgray":b,E=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},o,f),S=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},o),I={title:t,alt:this.state.isVisible?"":a,style:E,className:p};if(h){var k=h;return d.default.createElement(w,{className:(i||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(k.srcSet)},d.default.createElement(w,{style:{width:"100%",paddingBottom:100/k.aspectRatio+"%"}}),k.base64&&d.default.createElement(y,(0,l.default)({src:k.base64},I)),k.tracedSVG&&d.default.createElement(y,(0,l.default)({src:k.tracedSVG},I)),v&&d.default.createElement(w,{title:t,style:{backgroundColor:v,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&d.default.createElement("picture",null,k.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:k.srcSetWebp,sizes:k.sizes}),d.default.createElement("source",{srcSet:k.srcSet,sizes:k.sizes}),d.default.createElement(y,{alt:a,title:t,src:k.src,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t},k))}}))}if(m){var R=m,L=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:R.width,height:R.height},n);return"inherit"===n.display&&delete L.display,d.default.createElement(w,{className:(i||"")+" gatsby-image-wrapper",style:L,ref:this.handleRef,key:"fixed-"+JSON.stringify(R.srcSet)},R.base64&&d.default.createElement(y,(0,l.default)({src:R.base64},I)),R.tracedSVG&&d.default.createElement(y,(0,l.default)({src:R.tracedSVG},I)),v&&d.default.createElement(w,{title:t,style:{backgroundColor:v,width:R.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:R.height}}),this.state.isVisible&&d.default.createElement("picture",null,R.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:R.srcSetWebp,sizes:R.sizes}),d.default.createElement("source",{srcSet:R.srcSet,sizes:R.sizes}),d.default.createElement(y,{alt:a,title:t,width:R.width,height:R.height,src:R.src,style:S,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t,width:R.width,height:R.height},R))}}))}return null},t}(d.default.Component);b.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var w=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string}),v=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string});b.propTypes={resolutions:w,sizes:v,fixed:w,fluid:v,fadeIn:c.default.bool,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,Tag:c.default.string};var E=b;t.default=E},214:function(e,t,a){"use strict";var i=a(6),r=a.n(i),n=a(0),s=a.n(n),o=a(4),l=a.n(o),d=a(161),c=a(157),u=a.n(c),f=a(146),p=a(145),h=a(160),m=a(153),g=function(e){function t(t){var a;a=e.call(this,t)||this;var i=Object(m.e)();return a.state={angle:i,percents:Object(m.a)((i+45)%360),lightColor:Object(m.f)(),darkColor:Object(m.f)(),duration:Object(m.h)(4,8)},a}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.data,a=e.width,i=e.image,r=t.frontmatter,n=t.fields.slug,o=r.title,l=r.icon,c=r.description,g=Object(p.default)(d.Box).withConfig({displayName:"ImagePreview__ImagePreviewWrapper",componentId:"sc-1ymef91-0"})(["transition:all 0.3s;position:relative;overflow:hidden;min-height:15em;:hover{> div:first-child{filter:blur(0);transform:scale(1.1);}> div:nth-child(2){opacity:0.5;}> a > div:last-child > h2{transition-delay:0s;transition-timing-function:ease-out;top:0.25em;transform:translate(-50%,0.25em);}> a > div:last-child > div:nth-child(2){transition-delay:0.1s;opacity:1;}> a > div:last-child > div:last-child{transition:opacity 0.4s;opacity:1;}}*{backface-visibility:hidden;}"]),y=p.default.div.withConfig({displayName:"ImagePreview__PostPreview",componentId:"sc-1ymef91-1"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;color:",";"],m.b.text),b=p.default.h2.withConfig({displayName:"ImagePreview__PostTitle",componentId:"sc-1ymef91-2"})(["transition:all 0.3s;transition-delay:0.1s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 2em);margin:0;padding:0 1em;text-align:center;"]),w=p.default.div.withConfig({displayName:"ImagePreview__BackgroundFilter",componentId:"sc-1ymef91-3"})(["transition:opacity 0.3s;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.7;background-color:black;"]),v=p.default.div.withConfig({displayName:"ImagePreview__Description",componentId:"sc-1ymef91-4"})(["transition:opacity 0.3s;transition-delay:0s;flex-grow:1;display:flex;justify-content:center;align-items:center;padding:0 1em;opacity:0;font-size:1.25em;text-align:center;span{font-style:italic;}"]),E=p.default.div.withConfig({displayName:"ImagePreview__Icon",componentId:"sc-1ymef91-5"})(["transition:opacity 0.3s;position:absolute;bottom:0.125em;right:0.25em;transform:translate(-0.25em,-0.125em);opacity:0;font-size:2.25em;"]),S=Object(p.keyframes)(["0%{background-position:","% ","%;}50%{background-position:","% ","%;}100%{background-position:","% ","%;}"],this.state.percents[0],this.state.percents[1],this.state.percents[2],this.state.percents[3],this.state.percents[0],this.state.percents[1]),I=i?p.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-6"})(["transition:transform 0.4s,filter 0.6s;filter:blur(0.5rem);height:100%;> div{height:100%;}"]):p.default.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-7"})(["height:100%;background:linear-gradient(","deg,",",",");background-size:400% 400%;animation:"," ","s ease infinite;"],this.state.angle,this.state.lightColor,this.state.darkColor,S,this.state.duration);return s.a.createElement(g,{width:[1,1,1,a[0],a[0],a[1]]},s.a.createElement(I,null,i&&s.a.createElement(u.a,{fluid:i,alt:"Image Preview"})),s.a.createElement(w,null),s.a.createElement(f.Link,{to:n},s.a.createElement(y,null,s.a.createElement(b,null,o),s.a.createElement(v,null,s.a.createElement("span",null,c)),s.a.createElement(E,null,s.a.createElement(h.a,{icon:l})))))},t}(s.a.Component);g.propTypes={data:l.a.object.isRequired,width:l.a.array.isRequired,image:l.a.object};var y=g,b=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.edges,t=e.map(function(t,a){var i=t.node.frontmatter.banner,r=e.length,n=r%6,o=[.5,1/3];if(a>=r-2)if(a===r-2)switch(n){case 2:case 5:o=[.5,.5]}else if(a===r-1)switch(n){case 1:o=[1,1];break;case 2:o=[.5,.5];break;case 3:o=[1,1/3];break;case 4:o=[.5,1];break;case 5:o=[1,.5]}return s.a.createElement(y,{key:a,data:t.node,width:o,image:i?i.childImageSharp.fluid:null})});return s.a.createElement(d.Flex,{flexWrap:"wrap",width:1},t)},t}(s.a.Component);b.propTypes={edges:l.a.array.isRequired};t.a=b}}]);
//# sourceMappingURL=component---src-pages-misc-js-09ad63b8c7843a12b2ce.js.map