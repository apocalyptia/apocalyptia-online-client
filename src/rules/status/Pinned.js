import Status from '/src/classes/Status.js'

const Pinned = new Status({
	name: `Pinned`,
	description: [
		`Pinned is the third and final step of Grappling.`,
		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
		`The Attacker is also considered to be Immobilized and Prone.`,
	],
	type: `Status`,
})

export default Pinned
