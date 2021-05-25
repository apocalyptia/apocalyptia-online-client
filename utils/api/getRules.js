export default async (
	chapter='',
	section='',
	item='',
	key=''
) => {
	// let url = `http://50.116.45.55/rules`
	let url = `http://localhost:3000/rules`
	if (chapter) {
		url += `/${chapter}`
		if (section) {
			url += `/${section}`
			if (item) {
				url += `/${item}`
				if (key) {
					url += `/${key}`
				}
			}
		}
	}
	console.log(`Request: ${url}`)
	return await fetch(url)
					.then(res => res.json())
					.catch(err => console.log(err))
}