export default (action, user, character) => {
	return fetch(`/.netlify/functions/${action}`, {
		body: {
			user: user,
			character: character
		},
		method: `POST`
	}).then(res => res.json())
}