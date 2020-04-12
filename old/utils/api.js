const createCharacter = (data) => {
	return fetch('/.netlify/functions/character-create', {
		body: JSON.stringify(data),
		method: 'POST'
	}).then(response => {
		return response.json()
	})
}

const readCharacter = (characterId) => {
	return fetch(`/.netlify/functions/character-read/${characterId}`, {
		mothod: 'POST',
	}).then(response => {
		return response.json()
	})
}

const updateCharacter = (characterId, data) => {
	return fetch(`/.netlify/functions/character-update/${characterId}`, {
		body: JSON.stringify(data),
		method: 'POST'
	}).then(response => {
		return response.json()
	})
}

const deleteCharacter = (characterId) => {
	return fetch(`/.netlify/functions/character-delete/${characterId}`, {
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