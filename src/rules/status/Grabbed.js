import Rule from '$classes/Rule.js'

const Grabbed = new Rule({
	name: `Grabbed`,
	desc: [
		`A Grabbed opponent is considered to be Immobilized.`,
	],
	type: `Status`
})

export default Grabbed