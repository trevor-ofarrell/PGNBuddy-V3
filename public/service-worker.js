if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,n,a)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const c={uri:location.origin+r.slice(1)};return Promise.all(n.map((r=>{switch(r){case"exports":return s;case"module":return c;default:return e(r)}}))).then((e=>{const r=a(...e);return s.default||(s.default=r),s}))})))}}define("./service-worker.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/MdYMuwZ3VdBrXbDIwrORL/_buildManifest.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/MdYMuwZ3VdBrXbDIwrORL/_ssgManifest.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/1d43dcd5861048775d1664faf3854f0f56fceca2.91fb4fd73ebc662f53de.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/20.8732a1b7ded83e20fa57.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/21.5af42e50d6bd991e2032.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/28cc844663324c62fc19f585c25a52f3535e5e2a.3b0a6f151f0837bf7ce7.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/391af07a.d7f03b94de0525aa7cca.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/4a3ea9cd.df20a871e8557f5cad8e.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/75fc9c18.a761c4b1d12e6d6532ec.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/c779354461cd9cce4398f42d3a8198315511dfc7.184c679fab4f0f36e17d.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/commons.b40ce2b04d30ab7fb866.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/ff239f9d.ef109edc955215a98833.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/framework.fc01a5c086e304852c6d.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/main-698c5a1fc161b5ce82ec.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/_app-17483907580f983f8362.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/_error-cd3f181b1896865c4079.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/about-5b5083fdf29ddbfd4f3d.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/dashboard-e352357d5bdf05d56b75.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/index-1681ca84eb3ccc4a09cc.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/login-8a17abd78174e07a7d11.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/player/%5BlichessUser%5D-d1737041be3ededad6c0.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/pages/signup-9ccf45d9e5aadf2785d3.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/polyfills-ad7fa6b2f983b6a0d94c.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/chunks/webpack-227ea809fe2801d9d28a.js",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/_next/static/images/pgnbuddymobile-3feb2f5c3a25f2849fddbf00907d7cce.png",revision:"MdYMuwZ3VdBrXbDIwrORL"},{url:"/chrome-extensionmanagementpage-48-48.png",revision:"5b22879a22885967c6b01ac0854f6d48"},{url:"/chrome-favicon-16-16.png",revision:"c47e882afe6be14eab389bb4ca9d5f85"},{url:"/chrome-installprocess-128-128.png",revision:"d1b778ceef4fa8136858807ad7883f70"},{url:"/howto/pgnbuddy1.jpg",revision:"dce856e8b5abe6ebff291d2512d793d1"},{url:"/howto/pgnbuddy5.jpg",revision:"60067c3363adb7fdc13acb32a954239d"},{url:"/howto/pgnbuddy6.jpg",revision:"a76aaf7f47da2078779c81023a1cfd1f"},{url:"/howto/pgnbuddy7.png",revision:"07be859d4cf669e55fc709253c0c2ac0"},{url:"/king.svg",revision:"299f465098a71a66054f26b7f104046f"},{url:"/manifest.json",revision:"01322cc19fd3fc36b3a68108dc8170a1"},{url:"/mobileicon-96-96.png",revision:"caba0f1c0e819db548a3c4957a75a58c"},{url:"/pgnbuddylogo.png",revision:"29d19307b5c384c66db15c8dfec7330c"},{url:"/pgnbuddymobile.png",revision:"193be696c1fed865809eb8f6aced0b94"},{url:"/pgnbuddymobile1.png",revision:"4d1e4196c022f077caadf45aec8bb8ec"},{url:"/pwaicon-144-144.png",revision:"45f055adf2911cf74e3d26d492fc4b92"},{url:"service-worker.js",revision:"MdYMuwZ3VdBrXbDIwrORL"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:r,event:s,state:n})=>r&&"opaqueredirect"===r.type?new Response(r.body,{status:200,statusText:"OK",headers:r.headers}):r}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const r=e.pathname;return!r.startsWith("/api/auth/")&&!!r.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
