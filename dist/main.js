"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var React=_interopDefault(require("react"));function classNames(...e){return e.filter(Boolean).join(" ")}const blackList=new Set(["defaultProps","tag","displayName","propTypes","getDefaultProps","getDerivedStateFromProps","isReactClassApproved","prototype","contextType","contextTypes","name","PropTypes"]);function createAttributesProxy(e){const t={className:void 0};return new Proxy(t=>React.createElement(e,Object.assign({},t)),{get:function e(r,a){if(a in r||"string"!=typeof a||blackList.has(a))return r[a];t.className=classNames(t.className,a);const s=r;return new Proxy(e=>React.createElement(s,Object.assign({},t,e)),{get:e})}})}const Retagger=new Proxy({},{get:(e,t)=>createAttributesProxy(t)});module.exports=Retagger;
