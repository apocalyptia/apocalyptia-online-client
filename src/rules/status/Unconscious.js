import Status from '/src/classes/Status.js'

const Unconscious = new Status({
	name: `Unconscious`,
	desc: [
		`Unaware and unable to do anything.`,
		`You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`
	],
	type: `Status`
})

export default Unconscious
