import Creation from '/src/rules/Creation.js'

export default (username='test') => {
	const description = {}
	for (const desc of Creation.description.list) {
		const descKey = desc.name.toLowerCase()
		description[descKey] = desc
	}
	description.player.value = username // TODO: tie this to user account
	return description
}