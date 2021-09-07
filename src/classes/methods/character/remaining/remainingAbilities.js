import Abilities from '/src/rules/Abilities.js'

export default function() {
	return Object.values(Abilities).filter((r) => {
		return (
			!this.abilities.some((a) => a.name === r.name) &&
			r.experience <= this.properties.experience.current
		)
	})
}