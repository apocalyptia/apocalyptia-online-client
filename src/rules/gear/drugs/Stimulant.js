import Drug from '/src/classes/gear/Drug.js'

const Stimulant = new Drug({
	name: `Stimulant`,
	description: [`Ignore Exhaustion penalties for 6hrs.`],
	size: 0,
	type: `Drug`,
	mix: 9,
	overdose: true,
})

export default Stimulant
