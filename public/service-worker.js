if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,a,r)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const i={uri:location.origin+s.slice(1)};return Promise.all(a.map((s=>{switch(s){case"exports":return n;case"module":return i;default:return e(s)}}))).then((e=>{const s=r(...e);return n.default||(n.default=s),n}))})))}}define("./service-worker.js",["./workbox-a8b10d99"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/J_eK-DyHRWNxuq_DUspjw/_buildManifest.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/J_eK-DyHRWNxuq_DUspjw/_ssgManifest.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/09f2bf2d.add584a6f8f5c2099614.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/4a3ea9cd.e9683f527221538d00f8.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/75fc9c18.1c4adbd2984e23e1808a.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/aa629c312957180add7e4ca4ea2122300b61129b.6a604703fb78fd8ecbd3.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/c2bc4e2f630583a78fe46a8d089559ba1faa24ea.fce66f724ea226f01819.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/commons.0bd3846e29df0a74b958.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/d91e9ae9.5d204d8dcf45e8d83648.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/ff239f9d.2e1d531278bd77adaf77.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/main-dae1338a92fc3cd371b6.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/_app-56392197c7f9b5a63461.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/_error-28a447d50d37195a6a58.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/dashboard-216c06e2b7b053c55d4f.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/exportall-98df0065f2023280c42b.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/exportpgn-283a46b1b181f2c53eea.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/index-0ea48ae2f2dae3244e43.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/login-60eeb103c60c1845367e.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-cb13c0fbdaa2a6c59279.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/pages/signup-ba7e616ad4420c47de97.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/polyfills-45b5f73cfa7813dc2df8.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"J_eK-DyHRWNxuq_DUspjw"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/darkbg.png",revision:"eed95fd6287aa93425502feffa94f7f3"},{url:"/king.svg",revision:"299f465098a71a66054f26b7f104046f"},{url:"/manifest.json",revision:"d25f4f1f1b7a652fd24a64e2018c8a37"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"service-worker.js",revision:"J_eK-DyHRWNxuq_DUspjw"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
