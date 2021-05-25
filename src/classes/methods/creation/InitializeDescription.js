export default (rules, username='test') => {
	const description = {}
	for (const desc of rules.list.creation.description.list) {
		const descKey = desc.name.toLowerCase()
		description[descKey] = desc
	}
	description.player.value = username // TODO: tie this to user account
	return description
}