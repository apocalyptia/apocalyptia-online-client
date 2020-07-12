const newCollection = (user) => {
	return fetch(
		`/.netlify/functions/new-collection/${user}`, {
			body: user,
			method: `POST`
		}
	).then(res => res.json())
}

const checkCollection = (user) => {
	return fetch(
		`/.netlify/functions/check-collection/${user}`, {
			body: user,
			method: `POST`
		}
	).then(res => res.json())
}

const createCharacter = (user, character) => {
	return fetch(`/.netlify/functions/create-character/${user}/${character.id}`, {
		body: character,
		method: `POST`
	}).then(res => res.json())
}

const readCharacter = (user, character) => {
	return fetch(`/.netlify/functions/read-character/${user}/${character.id}`, {
		method: `POST`
	}).then(res => res.json())
}

const updateCharacter = (user, character) => {
	return fetch(`/.netlify/functions/update-character/${user}/${character.id}`, {
		body: JSON.stringify(data),
		method: `POST`
	}).then(res => res.json())
}

const deleteCharacter = (user, character) => {
	return fetch(`/.netlify/functions/delete-character/${user}/${character.id}`, {
		method: `POST`
	}).then(res => res.json())
}

export default {
	new: newCollection,
	check: checkCollection,
	create: createCharacter,
	read: readCharacter,
	update: updateCharacter,
	delete: deleteCharacter,
}