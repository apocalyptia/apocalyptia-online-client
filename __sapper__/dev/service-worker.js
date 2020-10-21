(function () {
	'use strict';

	// This file is generated by Sapper — do not edit it!
	const timestamp = 1603238435960;

	const files = [
		"/service-worker-index.html",
		"/404.svg",
		"/__index.html",
		"/favicon.gif",
		"/global.css",
		"/logo-192.png",
		"/logo-512.png",
		"/manifest.json",
		"/robots.txt"
	];

	const shell = [
		"/client/client.73d5843b.js",
		"/client/inject_styles.5607aec6.js",
		"/client/index.051cdcd5.js",
		"/client/index.a4ed1688.js",
		"/client/BackButton.9ac42e05.js",
		"/client/characterStore.ba941a33.js",
		"/client/CharacterSheet.a0540ba2.js",
		"/client/BombList.4927c2b7.js",
		"/client/StorageList.71288974.js",
		"/client/AppendToGUUID.176d1458.js",
		"/client/Skills.35c4252b.js",
		"/client/Abilities.5f272c11.js",
		"/client/SWBodyguard.54177d3a.js",
		"/client/Speed.66ad8113.js",
		"/client/RangedWeaponList.4703ea51.js",
		"/client/Thermite.a457c57f.js",
		"/client/GearBlock.ce0e0264.js",
		"/client/RandomRoll.f18d347c.js",
		"/client/Specialty.adf26afb.js",
		"/client/Traits.2656d3ca.js",
		"/client/ConstitutionSkills.56e093ee.js",
		"/client/_layout.c665480b.js",
		"/client/description.f789cc7d.js",
		"/client/Description.8a5b4d62.js",
		"/client/properties.5e509fa7.js",
		"/client/Properties.2daf5f2c.js",
		"/client/abilities.b8e7cb65.js",
		"/client/skills.da651c2b.js",
		"/client/Slider.8677f536.js",
		"/client/traits.f3cb3814.js",
		"/client/sheet.efdda654.js",
		"/client/gear.55652700.js",
		"/client/RandomStartingGear.1aaace4b.js",
		"/client/d6.b655a31f.js",
		"/client/load.90a13f8d.js",
		"/client/new.817a1cd2.js",
		"/client/index.33d433fa.js",
		"/client/index.2ebc61e3.js",
		"/client/ManSubRule.b38c241d.js",
		"/client/[chapter].5ce25aa9.js",
		"/client/index.7e09cbcd.js",
		"/client/Spinner.044c8890.js",
		"/client/index.8f081854.js",
		"/client/recover.e1b34107.js",
		"/client/sapper-dev-client.1e7a4a5e.js"
	];

	const ASSETS = `cache${timestamp}`;

	// `shell` is an array of all the files generated by the bundler,
	// `files` is an array of everything in the `static` directory
	const to_cache = shell.concat(files);
	const cached = new Set(to_cache);

	self.addEventListener('install', event => {
		event.waitUntil(
			caches
				.open(ASSETS)
				.then(cache => cache.addAll(to_cache))
				.then(() => {
					self.skipWaiting();
				})
		);
	});

	self.addEventListener('activate', event => {
		event.waitUntil(
			caches.keys().then(async keys => {
				// delete old caches
				for (const key of keys) {
					if (key !== ASSETS) await caches.delete(key);
				}

				self.clients.claim();
			})
		);
	});

	self.addEventListener('fetch', event => {
		if (event.request.method !== 'GET' || event.request.headers.has('range')) return;

		const url = new URL(event.request.url);

		// don't try to handle e.g. data: URIs
		if (!url.protocol.startsWith('http')) return;

		// ignore dev server requests
		if (url.hostname === self.location.hostname && url.port !== self.location.port) return;

		// always serve static files and bundler-generated assets from cache
		if (url.host === self.location.host && cached.has(url.pathname)) {
			event.respondWith(caches.match(event.request));
			return;
		}

		// for pages, you might want to serve a shell `service-worker-index.html` file,
		// which Sapper has generated for you. It's not right for every
		// app, but if it's right for yours then uncomment this section
		/*
		if (url.origin === self.origin && routes.find(route => route.pattern.test(url.pathname))) {
			event.respondWith(caches.match('/service-worker-index.html'));
			return;
		}
		*/

		if (event.request.cache === 'only-if-cached') return;

		// for everything else, try the network first, falling back to
		// cache if the user is offline. (If the pages never change, you
		// might prefer a cache-first approach to a network-first one.)
		event.respondWith(
			caches
				.open(`offline${timestamp}`)
				.then(async cache => {
					try {
						const response = await fetch(event.request);
						cache.put(event.request, response.clone());
						return response;
					} catch(err) {
						const response = await cache.match(event.request);
						if (response) return response;

						throw err;
					}
				})
		);
	});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ub2RlX21vZHVsZXMvQHNhcHBlci9zZXJ2aWNlLXdvcmtlci5qcyIsIi4uLy4uL3NyYy9zZXJ2aWNlLXdvcmtlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGlzIGZpbGUgaXMgZ2VuZXJhdGVkIGJ5IFNhcHBlciDigJQgZG8gbm90IGVkaXQgaXQhXG5leHBvcnQgY29uc3QgdGltZXN0YW1wID0gMTYwMzIzODQzNTk2MDtcblxuZXhwb3J0IGNvbnN0IGZpbGVzID0gW1xuXHRcIi9zZXJ2aWNlLXdvcmtlci1pbmRleC5odG1sXCIsXG5cdFwiLzQwNC5zdmdcIixcblx0XCIvX19pbmRleC5odG1sXCIsXG5cdFwiL2Zhdmljb24uZ2lmXCIsXG5cdFwiL2dsb2JhbC5jc3NcIixcblx0XCIvbG9nby0xOTIucG5nXCIsXG5cdFwiL2xvZ28tNTEyLnBuZ1wiLFxuXHRcIi9tYW5pZmVzdC5qc29uXCIsXG5cdFwiL3JvYm90cy50eHRcIlxuXTtcbmV4cG9ydCB7IGZpbGVzIGFzIGFzc2V0cyB9OyAvLyBsZWdhY3lcblxuZXhwb3J0IGNvbnN0IHNoZWxsID0gW1xuXHRcIi9jbGllbnQvY2xpZW50LjczZDU4NDNiLmpzXCIsXG5cdFwiL2NsaWVudC9pbmplY3Rfc3R5bGVzLjU2MDdhZWM2LmpzXCIsXG5cdFwiL2NsaWVudC9pbmRleC4wNTFjZGNkNS5qc1wiLFxuXHRcIi9jbGllbnQvaW5kZXguYTRlZDE2ODguanNcIixcblx0XCIvY2xpZW50L0JhY2tCdXR0b24uOWFjNDJlMDUuanNcIixcblx0XCIvY2xpZW50L2NoYXJhY3RlclN0b3JlLmJhOTQxYTMzLmpzXCIsXG5cdFwiL2NsaWVudC9DaGFyYWN0ZXJTaGVldC5hMDU0MGJhMi5qc1wiLFxuXHRcIi9jbGllbnQvQm9tYkxpc3QuNDkyN2MyYjcuanNcIixcblx0XCIvY2xpZW50L1N0b3JhZ2VMaXN0LjcxMjg4OTc0LmpzXCIsXG5cdFwiL2NsaWVudC9BcHBlbmRUb0dVVUlELjE3NmQxNDU4LmpzXCIsXG5cdFwiL2NsaWVudC9Ta2lsbHMuMzVjNDI1MmIuanNcIixcblx0XCIvY2xpZW50L0FiaWxpdGllcy41ZjI3MmMxMS5qc1wiLFxuXHRcIi9jbGllbnQvU1dCb2R5Z3VhcmQuNTQxNzdkM2EuanNcIixcblx0XCIvY2xpZW50L1NwZWVkLjY2YWQ4MTEzLmpzXCIsXG5cdFwiL2NsaWVudC9SYW5nZWRXZWFwb25MaXN0LjQ3MDNlYTUxLmpzXCIsXG5cdFwiL2NsaWVudC9UaGVybWl0ZS5hNDU3YzU3Zi5qc1wiLFxuXHRcIi9jbGllbnQvR2VhckJsb2NrLmNlMGUwMjY0LmpzXCIsXG5cdFwiL2NsaWVudC9SYW5kb21Sb2xsLmYxOGQzNDdjLmpzXCIsXG5cdFwiL2NsaWVudC9TcGVjaWFsdHkuYWRmMjZhZmIuanNcIixcblx0XCIvY2xpZW50L1RyYWl0cy4yNjU2ZDNjYS5qc1wiLFxuXHRcIi9jbGllbnQvQ29uc3RpdHV0aW9uU2tpbGxzLjU2ZTA5M2VlLmpzXCIsXG5cdFwiL2NsaWVudC9fbGF5b3V0LmM2NjU0ODBiLmpzXCIsXG5cdFwiL2NsaWVudC9kZXNjcmlwdGlvbi5mNzg5Y2M3ZC5qc1wiLFxuXHRcIi9jbGllbnQvRGVzY3JpcHRpb24uOGE1YjRkNjIuanNcIixcblx0XCIvY2xpZW50L3Byb3BlcnRpZXMuNWU1MDlmYTcuanNcIixcblx0XCIvY2xpZW50L1Byb3BlcnRpZXMuMmRhZjVmMmMuanNcIixcblx0XCIvY2xpZW50L2FiaWxpdGllcy5iOGU3Y2I2NS5qc1wiLFxuXHRcIi9jbGllbnQvc2tpbGxzLmRhNjUxYzJiLmpzXCIsXG5cdFwiL2NsaWVudC9TbGlkZXIuODY3N2Y1MzYuanNcIixcblx0XCIvY2xpZW50L3RyYWl0cy5mM2NiMzgxNC5qc1wiLFxuXHRcIi9jbGllbnQvc2hlZXQuZWZkZGE2NTQuanNcIixcblx0XCIvY2xpZW50L2dlYXIuNTU2NTI3MDAuanNcIixcblx0XCIvY2xpZW50L1JhbmRvbVN0YXJ0aW5nR2Vhci4xYWFhY2U0Yi5qc1wiLFxuXHRcIi9jbGllbnQvZDYuYjY1NWEzMWYuanNcIixcblx0XCIvY2xpZW50L2xvYWQuOTBhMTNmOGQuanNcIixcblx0XCIvY2xpZW50L25ldy44MTdhMWNkMi5qc1wiLFxuXHRcIi9jbGllbnQvaW5kZXguMzNkNDMzZmEuanNcIixcblx0XCIvY2xpZW50L2luZGV4LjJlYmM2MWUzLmpzXCIsXG5cdFwiL2NsaWVudC9NYW5TdWJSdWxlLmIzOGMyNDFkLmpzXCIsXG5cdFwiL2NsaWVudC9bY2hhcHRlcl0uNWNlMjVhYTkuanNcIixcblx0XCIvY2xpZW50L2luZGV4LjdlMDljYmNkLmpzXCIsXG5cdFwiL2NsaWVudC9TcGlubmVyLjA0NGM4ODkwLmpzXCIsXG5cdFwiL2NsaWVudC9pbmRleC44ZjA4MTg1NC5qc1wiLFxuXHRcIi9jbGllbnQvcmVjb3Zlci5lMWIzNDEwNy5qc1wiLFxuXHRcIi9jbGllbnQvc2FwcGVyLWRldi1jbGllbnQuMWU3YTRhNWUuanNcIlxuXTtcblxuZXhwb3J0IGNvbnN0IHJvdXRlcyA9IFtcblx0eyBwYXR0ZXJuOiAvXlxcLyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9jaGFyYWN0ZXJcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2NyZWF0b3JcXC9kZXNjcmlwdGlvblxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvY2hhcmFjdGVyXFwvY3JlYXRvclxcL3Byb3BlcnRpZXNcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2NyZWF0b3JcXC9hYmlsaXRpZXNcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2NyZWF0b3JcXC9za2lsbHNcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2NyZWF0b3JcXC90cmFpdHNcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2NyZWF0b3JcXC9zaGVldFxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvY2hhcmFjdGVyXFwvY3JlYXRvclxcL2dlYXJcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL2xvYWRcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2NoYXJhY3RlclxcL25ld1xcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvZ2VuZXJhdG9yXFwvPyQvIH0sXG5cdHsgcGF0dGVybjogL15cXC9tYW51YWxcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL21hbnVhbFxcLyhbXlxcL10rPylcXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL3NpZ251cFxcLz8kLyB9LFxuXHR7IHBhdHRlcm46IC9eXFwvbG9naW5cXC8/JC8gfSxcblx0eyBwYXR0ZXJuOiAvXlxcL2xvZ2luXFwvcmVjb3ZlclxcLz8kLyB9XG5dOyIsImltcG9ydCB7IHRpbWVzdGFtcCwgZmlsZXMsIHNoZWxsLCByb3V0ZXMgfSBmcm9tICdAc2FwcGVyL3NlcnZpY2Utd29ya2VyJztcblxuY29uc3QgQVNTRVRTID0gYGNhY2hlJHt0aW1lc3RhbXB9YDtcblxuLy8gYHNoZWxsYCBpcyBhbiBhcnJheSBvZiBhbGwgdGhlIGZpbGVzIGdlbmVyYXRlZCBieSB0aGUgYnVuZGxlcixcbi8vIGBmaWxlc2AgaXMgYW4gYXJyYXkgb2YgZXZlcnl0aGluZyBpbiB0aGUgYHN0YXRpY2AgZGlyZWN0b3J5XG5jb25zdCB0b19jYWNoZSA9IHNoZWxsLmNvbmNhdChmaWxlcyk7XG5jb25zdCBjYWNoZWQgPSBuZXcgU2V0KHRvX2NhY2hlKTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKCdpbnN0YWxsJywgZXZlbnQgPT4ge1xuXHRldmVudC53YWl0VW50aWwoXG5cdFx0Y2FjaGVzXG5cdFx0XHQub3BlbihBU1NFVFMpXG5cdFx0XHQudGhlbihjYWNoZSA9PiBjYWNoZS5hZGRBbGwodG9fY2FjaGUpKVxuXHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRzZWxmLnNraXBXYWl0aW5nKCk7XG5cdFx0XHR9KVxuXHQpO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBldmVudCA9PiB7XG5cdGV2ZW50LndhaXRVbnRpbChcblx0XHRjYWNoZXMua2V5cygpLnRoZW4oYXN5bmMga2V5cyA9PiB7XG5cdFx0XHQvLyBkZWxldGUgb2xkIGNhY2hlc1xuXHRcdFx0Zm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuXHRcdFx0XHRpZiAoa2V5ICE9PSBBU1NFVFMpIGF3YWl0IGNhY2hlcy5kZWxldGUoa2V5KTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZi5jbGllbnRzLmNsYWltKCk7XG5cdFx0fSlcblx0KTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoJywgZXZlbnQgPT4ge1xuXHRpZiAoZXZlbnQucmVxdWVzdC5tZXRob2QgIT09ICdHRVQnIHx8IGV2ZW50LnJlcXVlc3QuaGVhZGVycy5oYXMoJ3JhbmdlJykpIHJldHVybjtcblxuXHRjb25zdCB1cmwgPSBuZXcgVVJMKGV2ZW50LnJlcXVlc3QudXJsKTtcblxuXHQvLyBkb24ndCB0cnkgdG8gaGFuZGxlIGUuZy4gZGF0YTogVVJJc1xuXHRpZiAoIXVybC5wcm90b2NvbC5zdGFydHNXaXRoKCdodHRwJykpIHJldHVybjtcblxuXHQvLyBpZ25vcmUgZGV2IHNlcnZlciByZXF1ZXN0c1xuXHRpZiAodXJsLmhvc3RuYW1lID09PSBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lICYmIHVybC5wb3J0ICE9PSBzZWxmLmxvY2F0aW9uLnBvcnQpIHJldHVybjtcblxuXHQvLyBhbHdheXMgc2VydmUgc3RhdGljIGZpbGVzIGFuZCBidW5kbGVyLWdlbmVyYXRlZCBhc3NldHMgZnJvbSBjYWNoZVxuXHRpZiAodXJsLmhvc3QgPT09IHNlbGYubG9jYXRpb24uaG9zdCAmJiBjYWNoZWQuaGFzKHVybC5wYXRobmFtZSkpIHtcblx0XHRldmVudC5yZXNwb25kV2l0aChjYWNoZXMubWF0Y2goZXZlbnQucmVxdWVzdCkpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vIGZvciBwYWdlcywgeW91IG1pZ2h0IHdhbnQgdG8gc2VydmUgYSBzaGVsbCBgc2VydmljZS13b3JrZXItaW5kZXguaHRtbGAgZmlsZSxcblx0Ly8gd2hpY2ggU2FwcGVyIGhhcyBnZW5lcmF0ZWQgZm9yIHlvdS4gSXQncyBub3QgcmlnaHQgZm9yIGV2ZXJ5XG5cdC8vIGFwcCwgYnV0IGlmIGl0J3MgcmlnaHQgZm9yIHlvdXJzIHRoZW4gdW5jb21tZW50IHRoaXMgc2VjdGlvblxuXHQvKlxuXHRpZiAodXJsLm9yaWdpbiA9PT0gc2VsZi5vcmlnaW4gJiYgcm91dGVzLmZpbmQocm91dGUgPT4gcm91dGUucGF0dGVybi50ZXN0KHVybC5wYXRobmFtZSkpKSB7XG5cdFx0ZXZlbnQucmVzcG9uZFdpdGgoY2FjaGVzLm1hdGNoKCcvc2VydmljZS13b3JrZXItaW5kZXguaHRtbCcpKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Ki9cblxuXHRpZiAoZXZlbnQucmVxdWVzdC5jYWNoZSA9PT0gJ29ubHktaWYtY2FjaGVkJykgcmV0dXJuO1xuXG5cdC8vIGZvciBldmVyeXRoaW5nIGVsc2UsIHRyeSB0aGUgbmV0d29yayBmaXJzdCwgZmFsbGluZyBiYWNrIHRvXG5cdC8vIGNhY2hlIGlmIHRoZSB1c2VyIGlzIG9mZmxpbmUuIChJZiB0aGUgcGFnZXMgbmV2ZXIgY2hhbmdlLCB5b3Vcblx0Ly8gbWlnaHQgcHJlZmVyIGEgY2FjaGUtZmlyc3QgYXBwcm9hY2ggdG8gYSBuZXR3b3JrLWZpcnN0IG9uZS4pXG5cdGV2ZW50LnJlc3BvbmRXaXRoKFxuXHRcdGNhY2hlc1xuXHRcdFx0Lm9wZW4oYG9mZmxpbmUke3RpbWVzdGFtcH1gKVxuXHRcdFx0LnRoZW4oYXN5bmMgY2FjaGUgPT4ge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZXZlbnQucmVxdWVzdCk7XG5cdFx0XHRcdFx0Y2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BvbnNlLmNsb25lKCkpO1xuXHRcdFx0XHRcdHJldHVybiByZXNwb25zZTtcblx0XHRcdFx0fSBjYXRjaChlcnIpIHtcblx0XHRcdFx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhY2hlLm1hdGNoKGV2ZW50LnJlcXVlc3QpO1xuXHRcdFx0XHRcdGlmIChyZXNwb25zZSkgcmV0dXJuIHJlc3BvbnNlO1xuXG5cdFx0XHRcdFx0dGhyb3cgZXJyO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHQpO1xufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0NBQUE7Q0FDTyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDdkM7Q0FDTyxNQUFNLEtBQUssR0FBRztDQUNyQixDQUFDLDRCQUE0QjtDQUM3QixDQUFDLFVBQVU7Q0FDWCxDQUFDLGVBQWU7Q0FDaEIsQ0FBQyxjQUFjO0NBQ2YsQ0FBQyxhQUFhO0NBQ2QsQ0FBQyxlQUFlO0NBQ2hCLENBQUMsZUFBZTtDQUNoQixDQUFDLGdCQUFnQjtDQUNqQixDQUFDLGFBQWE7Q0FDZCxDQUFDLENBQUM7QUFFRjtDQUNPLE1BQU0sS0FBSyxHQUFHO0NBQ3JCLENBQUMsNEJBQTRCO0NBQzdCLENBQUMsbUNBQW1DO0NBQ3BDLENBQUMsMkJBQTJCO0NBQzVCLENBQUMsMkJBQTJCO0NBQzVCLENBQUMsZ0NBQWdDO0NBQ2pDLENBQUMsb0NBQW9DO0NBQ3JDLENBQUMsb0NBQW9DO0NBQ3JDLENBQUMsOEJBQThCO0NBQy9CLENBQUMsaUNBQWlDO0NBQ2xDLENBQUMsbUNBQW1DO0NBQ3BDLENBQUMsNEJBQTRCO0NBQzdCLENBQUMsK0JBQStCO0NBQ2hDLENBQUMsaUNBQWlDO0NBQ2xDLENBQUMsMkJBQTJCO0NBQzVCLENBQUMsc0NBQXNDO0NBQ3ZDLENBQUMsOEJBQThCO0NBQy9CLENBQUMsK0JBQStCO0NBQ2hDLENBQUMsZ0NBQWdDO0NBQ2pDLENBQUMsK0JBQStCO0NBQ2hDLENBQUMsNEJBQTRCO0NBQzdCLENBQUMsd0NBQXdDO0NBQ3pDLENBQUMsNkJBQTZCO0NBQzlCLENBQUMsaUNBQWlDO0NB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
