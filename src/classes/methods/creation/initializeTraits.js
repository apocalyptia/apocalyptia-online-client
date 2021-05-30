import Traits from '/src/rules/Traits.js'

export default () => {
	const traits = {}
	for (const trait of Object.values(Traits)) {
		const traitKey = trait.name.toLowerCase()
		traits[traitKey] = {
			name: trait.name,
			score: 1
		}
	}
	return traits
}
