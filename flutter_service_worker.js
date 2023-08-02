'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "f53a8150cdf84f06aeb5af333c9e1f52",
"assets/AssetManifest.json": "484246d291c8dcedd1e1dd7f00b5e39d",
"assets/assets/bankk.png": "a22240b066def7ac256593923059f250",
"assets/assets/BR.jpg": "d4e957f9ceedd178e56890cbe71d8e12",
"assets/assets/card.jpg": "3ab12e6e3bf184315dd6bae5ae473cb3",
"assets/assets/cardone.png": "8be07b2229761881b063c42f5f92f1ae",
"assets/assets/cardtwo.png": "836e152d71041cc4c0cd84f06e27e47e",
"assets/assets/CC.jpg": "bcb8603d35354cf4c29fd1f213ecf8b2",
"assets/assets/cc.png": "6262da4489f3868832a38e760ac56cba",
"assets/assets/customer.jpg": "45fc053488bc0dea8acf009de4e20723",
"assets/assets/customer.png": "fe511d4c1070e530363c3e0fa638edd7",
"assets/assets/d.png": "fe511d4c1070e530363c3e0fa638edd7",
"assets/assets/fingerprint.jpg": "3871d3c12e30b82b2e683fab7a836d0e",
"assets/assets/forex.jpg": "7771c4032e7674caa3b9e69777bd4bd7",
"assets/assets/forex.png": "debc85276795c7f7560ceb6e7b25aa8b",
"assets/assets/Header.png": "9e688555e9bf7e99ee99c09aafaac16c",
"assets/assets/HL.jpg": "9afbe048e2a55802ae101105523be2cb",
"assets/assets/homePage.png": "c9593549ae5d9cd667fb05cef7a5206f",
"assets/assets/home_loan.png": "49d269eccea688df07ae40e7f546d89f",
"assets/assets/icon_test.png": "729fea573721984cdd88841df703d05a",
"assets/assets/loader.gif": "9cb95f504a4005b87503f6b0a97944d0",
"assets/assets/pay_later.jpg": "44bf05383b0899a14e6d5d7302ca3d37",
"assets/assets/pay_later.png": "8f4a50911d3d7ee9dcb88ff04967f824",
"assets/assets/personal.png": "72c4ebf2489a39449ca13dde11017a7c",
"assets/assets/PL.jpg": "48b47cc9d8e4f6797e14e5f8f3040d6e",
"assets/assets/rocket.gif": "216a3c54c5d995948cb4b1248e1a87ef",
"assets/assets/savings.jpg": "54e4b873a1a91fa9c56f9a64c90e6955",
"assets/assets/savings.png": "8615aae071642fd96b168149d8da312f",
"assets/assets/success.gif": "897f6df275d190307f6e46eb540d20d5",
"assets/assets/Vector.png": "fe511d4c1070e530363c3e0fa638edd7",
"assets/assets/vector_test.png": "fe511d4c1070e530363c3e0fa638edd7",
"assets/assets/video.dart": "823b3f2181a1efa488eb2e6949ce7c0e",
"assets/assets/vkyc.png": "d3967b636220565a4ade045561c84ab7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "2fc3d33d382c620262667a3647d5e88e",
"assets/NOTICES": "2257c578b23c0e8dc14f8455cf451839",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "57d849d738900cfd590e9adc7e208250",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "56e2c9cedd97f10e7e5f1cebd85d53e3",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "76f7d822f42397160c5dfc69cbc9b2de",
"canvaskit/canvaskit.wasm": "f48eaf57cada79163ec6dec7929486ea",
"canvaskit/chromium/canvaskit.js": "8c8392ce4a4364cbb240aa09b5652e05",
"canvaskit/chromium/canvaskit.wasm": "fc18c3010856029414b70cae1afc5cd9",
"canvaskit/skwasm.js": "1df4d741f441fa1a4d10530ced463ef8",
"canvaskit/skwasm.wasm": "6711032e17bf49924b2b001cef0d3ea3",
"canvaskit/skwasm.worker.js": "19659053a277272607529ef87acf9d8a",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "e5e7cd67d1b50ca9df647a1fab977129",
"/": "e5e7cd67d1b50ca9df647a1fab977129",
"main.dart.js": "a7d870fb4558e57b15aa4cebb919cac5",
"manifest.json": "170ce09b9864cb36d7c3db9b3e1dab1d",
"version.json": "5b287ad162173429b5360d9cf0fc9b5e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
