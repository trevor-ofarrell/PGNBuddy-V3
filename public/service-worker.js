if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return o[e]||(s=new Promise((async s=>{if("document"in self){const o=document.createElement("script");o.src=e,document.head.appendChild(o),o.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!o[e])throw new Error(`Module ${e} didn’t register its module`);return o[e]}))},s=(s,o)=>{Promise.all(s.map(e)).then((e=>o(1===e.length?e[0]:e)))},o={require:Promise.resolve(s)};self.define=(s,n,a)=>{o[s]||(o[s]=Promise.resolve().then((()=>{let o={};const r={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return o;case"module":return r;default:return e(s)}}))).then((e=>{const s=a(...e);return o.default||(o.default=s),o}))})))}}define("./service-worker.js",["./workbox-7797d470"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/45978c36.e23f0bb83a4fb170ebfb.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/4a3ea9cd.e9683f527221538d00f8.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/75fc9c18.1c4adbd2984e23e1808a.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/aa629c312957180add7e4ca4ea2122300b61129b.8369537d0e693a1f4063.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/c2bc4e2f630583a78fe46a8d089559ba1faa24ea.445b8c6984d8a9e0a8f0.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/commons.461d8983c20edbd5cb8d.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/d91e9ae9.f152cc4ef61e19b74970.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/ff239f9d.b27f2798982cec6397ba.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/main-3a55184fe763023fcec7.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/_app-93ccd109fa31a90f5fb9.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/_error-7cbe35e10ff41fbc6215.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/dashboard-1ccd3eea436ca2cca869.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/exportall-5a4c5ff944698b84633b.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/exportpgn-3f8b8bc550fed0f31ce2.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/index-cced524a0895d622b3ab.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/login-61c07aad5da18754a037.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-dbe90cd8d7a7191b9bac.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/pages/signup-4aca53647ae8de9b00ea.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/polyfills-45b5f73cfa7813dc2df8.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/uod8F5o4vszwzHNCoslJQ/_buildManifest.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/_next/static/uod8F5o4vszwzHNCoslJQ/_ssgManifest.js",revision:"uod8F5o4vszwzHNCoslJQ"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/darkbg.png",revision:"eed95fd6287aa93425502feffa94f7f3"},{url:"/king.svg",revision:"299f465098a71a66054f26b7f104046f"},{url:"/manifest.json",revision:"50c93edabdeaf164cc714c6be9d91e9c"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"service-worker.js",revision:"uod8F5o4vszwzHNCoslJQ"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
