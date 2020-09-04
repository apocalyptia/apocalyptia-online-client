export default (action, user, character) => {
	const data = { user, character }
	return fetch(`/.netlify/functions/${action}`, {
		body: JSON.stringify(data),
		method: `POST`
	}).then(res => res.json())
}