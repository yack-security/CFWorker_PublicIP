addEventListener('fetch', event => {
	event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
	const { pathname } = new URL(request.url)
	const ip = request.headers.get('cf-connecting-ip')

	const headers_plain = {
		'Content-Type': 'text/plain; charset=utf-8',
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'X-Content-Type-Options': 'nosniff'
	}
	const headers_json = {
		'Content-Type': 'application/json',
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'X-Content-Type-Options': 'nosniff'
	}

	// If request is not a GET request, return 405 Method Not Allowed
	if (request.method !== 'GET') {
		return new Response('Method Not Allowed', {
			status: 405,
			headers: headers_plain
		})
	}

	// If path is empty, return the IP in plain text
	if (pathname === '/') {
		return new Response(ip, {
			status: 200,
			headers: headers_plain
		})
	}

	// If path ends with /json, return the complex response in JSON
	if (pathname === '/json') {
		const data = {
			ip: ip,
			latitude: request.cf.latitude,
			longitude: request.cf.longitude,
			asn: request.cf.asn,
			asOrganization: request.cf.asOrganization,
			region: request.cf.region,
			regionCode: request.cf.regionCode,
			city: request.cf.city,
			postalCode: request.cf.postalCode,
			country: request.cf.country,
			timezone: request.cf.timezone,
			colo: request.cf.colo,
			metroCode: request.cf.metroCode,
			tlsVersion: request.cf.tlsVersion,
			httpProtocol: request.cf.httpProtocol
		}
		return new Response(JSON.stringify(data, null, 2), {
			status: 200,
			headers: headers_json
		})
	}

	// If path is anything else, return 404 Not Found
	return new Response('Not Found', {
		status: 404,
		headers: headers_plain
	})
}
