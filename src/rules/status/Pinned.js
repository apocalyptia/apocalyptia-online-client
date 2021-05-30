import Rule from '../../classes/Rule.js'

const Pinned = new Rule({
	name: `Pinned`,
	desc: [
		`Pinned is the third and final step of Grappling.`,
		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
		`The Attacker is also considered to be Immobilized and Prone.`
	],
	type: `Status`
})

export default Pinned
