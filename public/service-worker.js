if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return n[e]||(s=new Promise((async s=>{if("document"in self){const n=document.createElement("script");n.src=e,document.head.appendChild(n),n.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!n[e])throw new Error(`Module ${e} didn’t register its module`);return n[e]}))},s=(s,n)=>{Promise.all(s.map(e)).then((e=>n(1===e.length?e[0]:e)))},n={require:Promise.resolve(s)};self.define=(s,t,a)=>{n[s]||(n[s]=Promise.resolve().then((()=>{let n={};const c={uri:location.origin+s.slice(1)};return Promise.all(t.map((s=>{switch(s){case"exports":return n;case"module":return c;default:return e(s)}}))).then((e=>{const s=a(...e);return n.default||(n.default=s),n}))})))}}define("./service-worker.js",["./workbox-7797d470"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/5KtQmp6Jsh9Q58C1NMNk9/_buildManifest.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/5KtQmp6Jsh9Q58C1NMNk9/_ssgManifest.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/3a210a0859f14a5276dea45e73653dfc7dde1cf5.d8a1ebb722e0ac65451e.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/4a3ea9cd.940fd541f556de0995ca.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/7478f67e8d9e7732a1a9e3739f1dd06099d7987b.ad23be6d0bb041d239c5.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/75fc9c18.00e031310bab8b846c16.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/a1cb37427693185d08a85a44c8cd65cfdacfc877.b298b56a9c10ce225674.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/aa629c312957180add7e4ca4ea2122300b61129b.02e1e29e477a1b4996cd.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/c2bc4e2f630583a78fe46a8d089559ba1faa24ea.6934ec81afb8adb4beba.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/commons.981f18807ea2c87b437a.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/ff239f9d.b27f2798982cec6397ba.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/framework.9707fddd9ae5927c17c3.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/main-d413f6f34dc2e4f610cc.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/_app-2e3380480e72fce1cc50.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/_error-877e0f2e9e9390f2e5e8.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/dashboard-08501100108d8300cc08.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/exportall-fb89ab16571a3ed8d0dd.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/exportpgn-0891d1f2e7415ae7cbf8.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/index-b490118bc6a0cfba29f4.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/login-75c6c8371928053b20b1.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-f93b65f0d61d32b2120f.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/pages/signup-f4d6a3995f28eeefa30c.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/polyfills-78cde1760acba30b47d6.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/_next/static/chunks/webpack-eb080e3f091731f228fb.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/darkbg.png",revision:"eed95fd6287aa93425502feffa94f7f3"},{url:"/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/manifest.json",revision:"0252e225763c860dfe4391cfaa47bbe9"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"},{url:"service-worker.js",revision:"5KtQmp6Jsh9Q58C1NMNk9"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
