import Status from '/src/classes/Status.js'

const Immobilized = new Status({
	name: `Immobilized`,
	desc: [`Your Speed is temporarily considered to be 0.`],
	type: `Status`
})

export default Immobilized
