const createCharacter = (character) => {
	return fetch('/.netlify/lambdas/character-create', {
		body: character,
		method: 'POST'
	}).then(response => {
		return response.json()
	})
}

const readCharacter = (user) => {
	return fetch(`/.netlify/lambdas/character-read/${user}`, {
		method: 'POST',
	}).then(response => {
		return response.json()
	})
}

const updateCharacter = (user, character) => {
	return fetch(`/.netlify/lambdas/character-update/${characterId}`, {
		body: JSON.stringify(data),
		method: 'POST'
	}).then(response => {
		return response.json()
	})
}

const deleteCharacter = (characterId) => {
	return fetch(`/.netlify/lambdas/character-delete/${characterId}`, {
		method: 'POST',
	}).then(response => {
		return response.json()
	})
}

export default {
	create: createCharacter,
	read: readCharacter,
	update: updateCharacter,
	delete: deleteCharacter,
}