const createCharacter = (character) => {
	return fetch('/.netlify/functions/character-create', {
		body: character,
		method: 'POST'
	}).then(response => {
		console.log('CREATE CHARACTER! => ', response.json())
		return response.json()
	})
}

const readCharacter = (user) => {
	return fetch(`/.netlify/functions/character-read/${user}`, {
		mothod: 'POST',
	}).then(response => {
		return response.json()
	})
}

const updateCharacter = (user, character) => {
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