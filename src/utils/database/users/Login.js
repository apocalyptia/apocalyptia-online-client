export default async _ => {
	try {
		let data = await fetch('http://localhost:3666/', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(msg)
		}).then(res => res.json())
		console.log(data)
	}
	catch (err) { console.log('something went wrong', err) }
}