export default async _ => {
	try {
		let data = await fetch('http://localhost:5000/', {
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
			body: JSON.stringify(msg)
		}).then(res => res.json())
		console.log(data)
	}
	catch (err) { console.log('something went wrong', err) }
}