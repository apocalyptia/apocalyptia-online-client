import Property from './Property'


const Psyche = new Property({
	id: `59f47468-200a-45ab-b8ca-a3cfa78ab1f8`,
	name: `Psyche`,
	desc: [
		`Psyche = Demeanor x 3`,
		`This is a measure of how much Trauma you can withstand.`,
		`Any number of horrible events can cause Trauma.`,
		`When Trauma = [Demeanor x 3] you lose all hope and seek out death at the earliest opportunity.`,
		`Someone must protect you from yourself until you have Recovered from at least 1 Trauma.`,
	],
	formula: (c) => {
		c.props.psyche.score = c.traits.demeanor.score * 3
		c.props.psyche.current = c.traits.demeanor.score * 3
	}
})

export default Psyche