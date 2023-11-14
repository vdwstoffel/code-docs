"use strict";(self.webpackChunkcode_docs=self.webpackChunkcode_docs||[]).push([[2437],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},s=Object.keys(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)r=s[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),i=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},p=function(e){var t=i(e.components);return n.createElement(l.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,s=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=i(r),f=a,m=u["".concat(l,".").concat(f)]||u[f]||d[f]||s;return r?n.createElement(m,o(o({ref:t},p),{},{components:r})):n.createElement(m,o({ref:t},p))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var s=r.length,o=new Array(s);o[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,o[1]=c;for(var i=2;i<s;i++)o[i]=r[i];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},7420:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>c,toc:()=>i});var n=r(7462),a=(r(7294),r(3905));const s={sidebar_label:"Examples"},o="Examples",c={unversionedId:"javascript/databases/examples",id:"javascript/databases/examples",title:"Examples",description:"Advance filtering Express + Mongoose",source:"@site/docs/javascript/databases/examples.md",sourceDirName:"javascript/databases",slug:"/javascript/databases/examples",permalink:"/javascript/databases/examples",draft:!1,editUrl:"https://github.com/vdwstoffel/code_docs/blob/main/docs/javascript/databases/examples.md",tags:[],version:"current",frontMatter:{sidebar_label:"Examples"},sidebar:"tutorialSidebar",previous:{title:"Databases",permalink:"/javascript/databases/"},next:{title:"DOM",permalink:"/javascript/dom"}},l={},i=[{value:"Advance filtering Express + Mongoose",id:"advance-filtering-express--mongoose",level:2}],p={toc:i},u="wrapper";function d(e){let{components:t,...r}=e;return(0,a.kt)(u,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"examples"},"Examples"),(0,a.kt)("h2",{id:"advance-filtering-express--mongoose"},"Advance filtering Express + Mongoose"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"/api/tours?difficulty=easy&price[lt]=1500\n\ndifficulty = easy\nprice[lt] = 1500\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},'app.get(\'/api/tours\' async (req, res) => {\n  try {\n    //Build Query\n    let queryObj = { ...req.query }; // destructure to create new copy\n    const excludeFields = ["page", "sort", "limit", "fields"]; // exclude from the params\n    excludeFields.forEach((el) => delete queryObj[el]); // delete from the object\n\n    let queryStr = JSON.stringify(queryObj); // turn into string to use js replace\n    // use regex to transform lt into $lt (mongodb for less than)\n    queryStr = queryStr.replace(/\\b(gte|gt|lte|lt)\\b/g, (match) => `$${match}`);\n    queryObj = JSON.parse(queryStr); // convert back into object\n\n    console.log(queryObj);\n    const query = Tour.find(queryObj);\n\n    // Execute Query\n    const tours = await query;\n\n    // Send response\n    res.status(200).json(tours);\n  } catch (err) {\n    res.status(400).json({ status: "error", message: err });\n  }\n});\n')))}d.isMDXComponent=!0}}]);