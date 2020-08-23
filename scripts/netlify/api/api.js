const createCharacter = (user, character) => {
	console.log('API CREATE CHARACTER')
	console.log(character)
	return fetch(`/.netlify/functions/character-create/${user}/${character.id}`, {
		body: character,
		method: `POST`
	}).then(res => res.json())
}

const readCharacter = (user, character) => {
	return fetch(`/.netlify/functions/character-read/${user}/${character.id}`, {
		method: `POST`
	}).then(res => res.json())
}

const updateCharacter = (user, character) => {
	return fetch(`/.netlify/functions/character-update/${user}/${character.id}`, {
		body: JSON.stringify(data),
		method: `POST`
	}).then(res => res.json())
}

const deleteCharacter = (user, character) => {
	return fetch(`/.netlify/functions/character-delete/${user}/${character.id}`, {
		method: `POST`
	}).then(res => res.json())
}

export const api = {
	createCharacter: createCharacter,
	readCharacter: readCharacter,
	updateCharacter: updateCharacter,
	deleteCharacter: deleteCharacter,
}