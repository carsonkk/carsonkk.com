(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{135:function(e,t,i){"use strict";i.r(t),i.d(t,"pageQuery",function(){return f});var a=i(6),r=i.n(a),n=i(0),s=i.n(n),o=i(145),l=i(162),d=i(161),c=i(211),u=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.data,t=o.d.div.withConfig({displayName:"misc__MiscPageWrapper",componentId:"sc-1jdv9r-0"})(["flex:1;display:flex;flex-direction:column;"]),i=o.d.div.withConfig({displayName:"misc__ShadowWrapper",componentId:"sc-1jdv9r-1"})(["flex:1;position:relative;z-index:1;min-height:1rem;box-shadow:0rem 0rem 1rem 0 black;"]);return s.a.createElement(l.a,null,s.a.createElement(d.a,{pathname:this.props.location.pathname,title:"Misc",description:"Miscellaneous things"}),s.a.createElement(t,null,s.a.createElement(c.a,{posts:e.allMarkdownRemark.edges,placeholders:e}),s.a.createElement(i,null)))},t}(s.a.Component);t.default=u;var f="2847642012"},156:function(e,t,i){"use strict";var a=i(7);t.__esModule=!0,t.default=void 0;var r,n=a(i(6)),s=a(i(48)),o=a(i(194)),l=a(i(149)),d=a(i(0)),c=a(i(4)),u=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},f={},p=function(e){var t=u(e),i=t.fluid?t.fluid.src:t.fixed.src;return!!f[i]||(f[i]=!0,!1)},h=[];var m=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){h.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),h.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',i=e.sizes?'sizes="'+e.sizes+'" ':"",a=e.srcSetWebp?"<source type='image/webp' srcSet=\""+e.srcSetWebp+'" '+i+"/>":"",r=e.srcSet?'<source srcSet="'+e.srcSet+'" '+i+"/>":"",n=e.title?'title="'+e.title+'" ':"",s=e.alt?'alt="'+e.alt+'" ':'alt="" ',o=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+a+r+"<img "+o+l+t+s+n+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=d.default.forwardRef(function(e,t){var i=e.style,a=e.onLoad,r=e.onError,n=(0,o.default)(e,["style","onLoad","onError"]);return d.default.createElement("img",(0,l.default)({},n,{onLoad:a,onError:r,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))});y.propTypes={style:c.default.object,onError:c.default.func,onLoad:c.default.func};var b=function(e){function t(t){var i;i=e.call(this,t)||this;var a=!0,r=!0,n=!1,o=t.fadeIn,l=p(t);!l&&"undefined"!=typeof window&&window.IntersectionObserver&&(a=!1,r=!1,n=!0),"undefined"==typeof window&&(a=!1,r=!1),t.critical&&(a=!0,r=!1,n=!1);var c=!(i.props.critical&&!i.props.fadeIn);return i.state={isVisible:a,imgLoaded:r,IOSupported:n,fadeIn:o,hasNoScript:c,seenBefore:l},i.imageRef=d.default.createRef(),i.handleImageLoaded=i.handleImageLoaded.bind((0,s.default)((0,s.default)(i))),i.handleRef=i.handleRef.bind((0,s.default)((0,s.default)(i))),i}(0,n.default)(t,e);var i=t.prototype;return i.componentDidMount=function(){if(this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},i.handleRef=function(e){var t=this;this.state.IOSupported&&e&&m(e,function(){t.setState({isVisible:!0})})},i.handleImageLoaded=function(){this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},i.render=function(){var e=u(this.props),t=e.title,i=e.alt,a=e.className,r=e.style,n=void 0===r?{}:r,s=e.imgStyle,o=void 0===s?{}:s,c=e.placeholderStyle,f=void 0===c?{}:c,p=e.placeholderClassName,h=e.fluid,m=e.fixed,b=e.backgroundColor,v=e.Tag,w="boolean"==typeof b?"lightgray":b,S=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},o,f),I=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},o),E={title:t,alt:this.state.isVisible?"":i,style:S,className:p};if(h){var k=h;return d.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},n),ref:this.handleRef,key:"fluid-"+JSON.stringify(k.srcSet)},d.default.createElement(v,{style:{width:"100%",paddingBottom:100/k.aspectRatio+"%"}}),k.base64&&d.default.createElement(y,(0,l.default)({src:k.base64},E)),k.tracedSVG&&d.default.createElement(y,(0,l.default)({src:k.tracedSVG},E)),w&&d.default.createElement(v,{title:t,style:{backgroundColor:w,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&d.default.createElement("picture",null,k.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:k.srcSetWebp,sizes:k.sizes}),d.default.createElement("source",{srcSet:k.srcSet,sizes:k.sizes}),d.default.createElement(y,{alt:i,title:t,src:k.src,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:i,title:t},k))}}))}if(m){var _=m,R=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:_.width,height:_.height},n);return"inherit"===n.display&&delete R.display,d.default.createElement(v,{className:(a||"")+" gatsby-image-wrapper",style:R,ref:this.handleRef,key:"fixed-"+JSON.stringify(_.srcSet)},_.base64&&d.default.createElement(y,(0,l.default)({src:_.base64},E)),_.tracedSVG&&d.default.createElement(y,(0,l.default)({src:_.tracedSVG},E)),w&&d.default.createElement(v,{title:t,style:{backgroundColor:w,width:_.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:_.height}}),this.state.isVisible&&d.default.createElement("picture",null,_.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:_.srcSetWebp,sizes:_.sizes}),d.default.createElement("source",{srcSet:_.srcSet,sizes:_.sizes}),d.default.createElement(y,{alt:i,title:t,width:_.width,height:_.height,src:_.src,style:I,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:i,title:t,width:_.width,height:_.height},_))}}))}return null},t}(d.default.Component);b.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var v=c.default.shape({width:c.default.number.isRequired,height:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string}),w=c.default.shape({aspectRatio:c.default.number.isRequired,src:c.default.string.isRequired,srcSet:c.default.string.isRequired,sizes:c.default.string.isRequired,base64:c.default.string,tracedSVG:c.default.string,srcWebp:c.default.string,srcSetWebp:c.default.string});b.propTypes={resolutions:v,sizes:w,fixed:v,fluid:w,fadeIn:c.default.bool,title:c.default.string,alt:c.default.string,className:c.default.oneOfType([c.default.string,c.default.object]),critical:c.default.bool,style:c.default.object,imgStyle:c.default.object,placeholderStyle:c.default.object,placeholderClassName:c.default.string,backgroundColor:c.default.oneOfType([c.default.string,c.default.bool]),onLoad:c.default.func,onError:c.default.func,Tag:c.default.string};var S=b;t.default=S},211:function(e,t,i){"use strict";var a=i(6),r=i.n(a),n=i(0),s=i.n(n),o=i(4),l=i.n(o),d=i(145),c=i(156),u=i.n(c),f=i(146),p=i(159),h=i(153),m=function(e){function t(t){var i;i=e.call(this,t)||this;var a=Object(h.e)();return i.state={angle:a,percents:Object(h.a)((a+45)%360),lightColor:Object(h.f)(),darkColor:Object(h.f)(),duration:Object(h.h)(4,10)},i}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.data,i=e.image,a=t.frontmatter,r=t.fields.slug,n=a.title,o=a.icon,l=a.description,c=d.d.div.withConfig({displayName:"ImagePreview__ImagePreviewWrapper",componentId:"sc-1ymef91-0"})(["transition:all 0.3s;flex:1 0 ","%;position:relative;overflow:hidden;:hover{> div:first-child{filter:blur(0);transform:scale(1.1);}> div:nth-child(2){opacity:0.5;}> a > div:last-child > h2{transition-delay:0s;top:2%;transform:translate(-50%,2%);}> a > div:last-child > div:nth-child(2){transition-delay:0.1s;opacity:1;}> a > div:last-child > div:last-child{transition:opacity 0.4s;opacity:1;}}*{backface-visibility:hidden;}"],100/3),m=d.d.div.withConfig({displayName:"ImagePreview__PostPreview",componentId:"sc-1ymef91-1"})(["display:flex;flex-direction:column;justify-content:center;position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;color:",";"],h.b.text),g=d.d.h2.withConfig({displayName:"ImagePreview__PostTitle",componentId:"sc-1ymef91-2"})(["transition:all 0.3s;transition-delay:0.1s;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:calc(100% - 2rem);margin:0;padding:0 1rem;font-size:2.5em;text-align:center;"]),y=d.d.div.withConfig({displayName:"ImagePreview__BackgroundFilter",componentId:"sc-1ymef91-3"})(["transition:opacity 0.3s;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0.7;background-color:black;"]),b=d.d.div.withConfig({displayName:"ImagePreview__Description",componentId:"sc-1ymef91-4"})(["transition:opacity 0.3s;transition-delay:0s;flex-grow:1;display:flex;justify-content:center;align-items:center;padding:0 1rem;opacity:0;text-align:center;span{font-style:italic;}"]),v=d.d.div.withConfig({displayName:"ImagePreview__Icon",componentId:"sc-1ymef91-5"})(["transition:opacity 0.3s;position:absolute;top:98%;left:98%;transform:translate(-98%,-98%);opacity:0;font-size:2rem;"]),w=Object(d.e)(["0%{background-position:","% ","%;}50%{background-position:","% ","%;}100%{background-position:","% ","%;}"],this.state.percents[0],this.state.percents[1],this.state.percents[2],this.state.percents[3],this.state.percents[0],this.state.percents[1]),S=a.bSingle?d.d.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-6"})(["transition:transform 0.4s,filter 0.6s;filter:blur(0.25rem);"]):d.d.div.withConfig({displayName:"ImagePreview__BackgroundImage",componentId:"sc-1ymef91-7"})(["background:linear-gradient(","deg,",",",");background-size:400% 400%;animation:"," ","s ease infinite;img{display:none;}"],this.state.angle,this.state.lightColor,this.state.darkColor,w,this.state.duration);return s.a.createElement(c,null,s.a.createElement(S,null,s.a.createElement(u.a,{fluid:i,alt:"Image Preview"})),s.a.createElement(y,null),s.a.createElement(f.Link,{to:r},s.a.createElement(m,null,s.a.createElement(g,null,n),s.a.createElement(b,null,s.a.createElement("span",null,l)),s.a.createElement(v,null,s.a.createElement(p.a,{icon:o})))))},t}(s.a.Component);m.propTypes={data:l.a.object.isRequired,image:l.a.object.isRequired};var g=m,y=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props,t=e.placeholders,i=e.posts,a=t.pSingle,r=t.pDouble,n=t.pTriple,o=i.map(function(e,t){var o=e.node.frontmatter,l=o.bSingle,d=o.bDouble,c=o.bTriple,u=l?l.childImageSharp.fluid:a.fluid;return i.length%3==2&&t>=i.length-2?u=d?d.childImageSharp.fluid:r.fluid:i.length%3==1&&t===i.length-1&&(u=c?c.childImageSharp.fluid:n.fluid),s.a.createElement(g,{key:e.node.id,data:e.node,image:u})}),l=d.d.div.withConfig({displayName:"ImagePreviewSection__ImagePreviewSectionWrapper",componentId:"sc-2cf92k-0"})(["display:flex;flex-wrap:wrap;justify-content:center;"]);return s.a.createElement(l,null,o)},t}(s.a.Component);y.propTypes={placeholders:l.a.object.isRequired,posts:l.a.array.isRequired};t.a=y}}]);
//# sourceMappingURL=component---src-pages-misc-js-8cf55c6211cac9c4f66f.js.map