"use strict";(self.webpackChunkcode_docs=self.webpackChunkcode_docs||[]).push([[3965],{3905:(e,t,r)=>{r.d(t,{Zo:()=>c,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var p=n.createContext({}),i=function(e){var t=n.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},c=function(e){var t=i(e.components);return n.createElement(p.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),u=i(r),m=a,f=u["".concat(p,".").concat(m)]||u[m]||d[m]||s;return r?n.createElement(f,o(o({ref:t},c),{},{components:r})):n.createElement(f,o({ref:t},c))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l[u]="string"==typeof e?e:a,o[1]=l;for(var i=2;i<s;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},8659:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>p,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>i});var n=r(7462),a=(r(7294),r(3905));const s={sidebar_label:"Examples",sidebar_position:2},o="Examples",l={unversionedId:"javascript/express/examples",id:"javascript/express/examples",title:"Examples",description:"Upload Files (Backend)",source:"@site/docs/javascript/express/examples.md",sourceDirName:"javascript/express",slug:"/javascript/express/examples",permalink:"/javascript/express/examples",draft:!1,editUrl:"https://github.com/vdwstoffel/code_docs/blob/main/docs/javascript/express/examples.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_label:"Examples",sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Templates",permalink:"/javascript/express/templates"},next:{title:"More Info",permalink:"/javascript/express/more_info"}},p={},i=[{value:"Upload Files (Backend)",id:"upload-files-backend",level:2}],c={toc:i},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"examples"},"Examples"),(0,a.kt)("h2",{id:"upload-files-backend"},"Upload Files (Backend)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm i multer\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="upload.js"',title:'"upload.js"'},'const multer = require("multer");\n\n// Set up storage for uploaded files\nconst storage = multer.diskStorage({\n  destination: (req, file, cb) => {\n    cb(null, "uploads/"); // folder to save files\n  },\n  filename: (req, file, cb) => {\n    cb(null, file.originalname); // filename\n  },\n});\n\n// Create the multer instance\nconst upload = multer({ storage: storage });\n\nmodule.exports = upload;\n')),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js",metastring:'title="main.js"const express = require("express");',title:'"main.js"const',express:!0,"":"",'require("express");':!0},'const app = express();\n\n// Require the upload middleware\nconst upload = require("./upload");\n\n// Set up a route for file uploads\napp.post("/upload", upload.single("file"), (req, res) => {\n  // Handle the uploaded file\n  res.json({ message: "File uploaded successfully!" });\n});\n\n// Start the server\nconst port = process.env.PORT || 3000;\napp.listen(port);\n')))}d.isMDXComponent=!0}}]);