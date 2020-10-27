import Rule from 'rules/Rule.js'

const Blast = new Rule({
	id: `e0084114-b6d8-49fa-7b0f-d550d69e0590`,
	name: `Blast`,
	desc: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
})

export default Blast