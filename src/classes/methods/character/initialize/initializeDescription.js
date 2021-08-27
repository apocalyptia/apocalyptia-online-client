import Creation from '/src/rules/Creation.js'

export default (username = 'test') => {
	const newDescription = {}
	for (const description of Creation.description.list) {
		const descriptionKey = description.name.toLowerCase()
		newDescription[descriptionKey] = description
	}
	newDescription.player.value = username // TODO: tie this to user account
	return newDescription
}
