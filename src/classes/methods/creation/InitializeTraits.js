export default (rules) => {
	const traits = {}
	for (const trait of Object.values(rules.list.traits)) {
		const traitKey = trait.name.toLowerCase()
		traits[traitKey] = {
			name: trait.name,
			score: 1
		}
	}
	return traits
}