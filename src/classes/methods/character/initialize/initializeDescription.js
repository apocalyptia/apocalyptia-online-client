import CreationProcess from '$rules/CreationProcess.js'

export default (username = 'test') => {
	const newDescription = {}
	for (const description of CreationProcess.description.list) {
		const descriptionKey = description.name.toLowerCase()
		newDescription[descriptionKey] = description
	}
	newDescription.player.value = username // TODO: tie this to user account
	return newDescription
}
