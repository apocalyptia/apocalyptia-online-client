import Status from '/src/classes/Status.js'

const Stun = new Status({
	name: `Stun`,
	desc: [`Defenseless, Harmless, and Immobilized.`, `You fall Prone if Stunned for longer than 1 Round.`],
	type: `Status`
})

export default Stun
