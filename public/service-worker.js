if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let i=Promise.resolve();return s[e]||(i=new Promise((async i=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=i}else importScripts(e),i()}))),i.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},i=(i,s)=>{Promise.all(i.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(i)};self.define=(i,n,a)=>{s[i]||(s[i]=Promise.resolve().then((()=>{let s={};const c={uri:location.origin+i.slice(1)};return Promise.all(n.map((i=>{switch(i){case"exports":return s;case"module":return c;default:return e(i)}}))).then((e=>{const i=a(...e);return s.default||(s.default=i),s}))})))}}define("./service-worker.js",["./workbox-7797d470"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/M-GR2cYvCaVMiAfNnjivg/_buildManifest.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/M-GR2cYvCaVMiAfNnjivg/_ssgManifest.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/45978c36.daea0084ee5a4b25c2aa.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/4a3ea9cd.e9683f527221538d00f8.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/75fc9c18.1c4adbd2984e23e1808a.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/a1cb37427693185d08a85a44c8cd65cfdacfc877.11950b29110b7d72d5cb.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/aa629c312957180add7e4ca4ea2122300b61129b.f3e2eae5a0feac2cd9fa.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/c2bc4e2f630583a78fe46a8d089559ba1faa24ea.445b8c6984d8a9e0a8f0.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/commons.461d8983c20edbd5cb8d.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/d91e9ae9.b6b865338f9762fbd9c8.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/ff239f9d.b27f2798982cec6397ba.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/main-19f73bde1458cefca0d6.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/_app-4d1abaca229a0e3a11e8.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/_error-bbc39182b3841a6554b5.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/dashboard-1da105f77f5d6514e382.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/exportall-c55119abd3b78d788076.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/exportpgn-53a0b55209538e4eb97a.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/index-ab6734e7dd138ddb4e8d.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/login-f16eb00196d26287b2f3.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-7dfa717480601605d190.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/pages/signup-c649eed6c6d7304ecdaa.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/polyfills-78cde1760acba30b47d6.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"M-GR2cYvCaVMiAfNnjivg"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/darkbg.png",revision:"eed95fd6287aa93425502feffa94f7f3"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"50c93edabdeaf164cc714c6be9d91e9c"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"service-worker.js",revision:"M-GR2cYvCaVMiAfNnjivg"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
