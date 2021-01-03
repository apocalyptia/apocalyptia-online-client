import Rule from 'classes/Rule.js'

const Psyche = new Rule({
	name: `Psyche`,
	desc: [
		`Psyche = Demeanor x 3`,
		`Psyche is a measure of how much Trauma your mind can withstand.`,
	],
	formula: (c) => {
		c.properties.psyche.score = c.traits.demeanor.score * 3
		if (c.properties.psyche.current == null) {
			c.properties.psyche.current = c.traits.demeanor.score * 3
		}
	},
	type: `Property`
})

export default Psyche