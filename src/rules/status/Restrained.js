import Rule from 'classes/Rule.js'

const Restrained = new Rule({
	name: `Restrained`,
	desc: [
		`Restrained is the second step of Grappling.`,
		`While Restrained, you are considered to be Harmless and Immobilized.`,
	],
	type: `Status`
})

export default Restrained