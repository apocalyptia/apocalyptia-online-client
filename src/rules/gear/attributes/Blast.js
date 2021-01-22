import Rule from '$classes/Rule.js'

const Blast = new Rule({
	id: ``,
	name: `Blast`,
	desc: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
})

export default Blast