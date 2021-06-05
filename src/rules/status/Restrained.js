import Status from '/src/classes/Status.js'

const Restrained = new Status({
	name: `Restrained`,
	description: [
		`Restrained is the second step of Grappling.`,
		`While Restrained, you are considered to be Harmless and Immobilized.`
	],
	type: `Status`
})

export default Restrained
