if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,n,t)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return i;case"module":return a;default:return e(s)}}))).then((e=>{const s=t(...e);return i.default||(i.default=s),i}))})))}}define("./service-worker.js",["./workbox-7797d470"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/3a210a0859f14a5276dea45e73653dfc7dde1cf5.d8a1ebb722e0ac65451e.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/4a3ea9cd.940fd541f556de0995ca.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/7478f67e8d9e7732a1a9e3739f1dd06099d7987b.3ca5bb0b6f274ab8acfa.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/75fc9c18.00e031310bab8b846c16.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/a1cb37427693185d08a85a44c8cd65cfdacfc877.b298b56a9c10ce225674.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/aa629c312957180add7e4ca4ea2122300b61129b.02e1e29e477a1b4996cd.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/c2bc4e2f630583a78fe46a8d089559ba1faa24ea.6934ec81afb8adb4beba.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/commons.981f18807ea2c87b437a.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/ff239f9d.b27f2798982cec6397ba.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/main-d413f6f34dc2e4f610cc.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/_app-5fbb89d854c38c7ba4b8.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/_error-877e0f2e9e9390f2e5e8.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/dashboard-a512b3672e2ee0f36361.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/exportall-031e7be615966353b8c9.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/exportpgn-c0f26ad2c9d527295a57.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/index-956707b60bb6d3554c75.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/login-75c6c8371928053b20b1.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-da0f20caa7ed40eaeeaf.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/pages/signup-f4d6a3995f28eeefa30c.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/polyfills-78cde1760acba30b47d6.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/w2tiYO55YjxBEj1I8w44I/_buildManifest.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/_next/static/w2tiYO55YjxBEj1I8w44I/_ssgManifest.js",revision:"w2tiYO55YjxBEj1I8w44I"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/darkbg.png",revision:"eed95fd6287aa93425502feffa94f7f3"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"0252e225763c860dfe4391cfaa47bbe9"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"service-worker.js",revision:"w2tiYO55YjxBEj1I8w44I"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
