import Drug from '/src/classes/gear/Drug.js'

const Sedative = new Drug({
	name: `Sedative`,
	description: [`Demeanor #6 per Round to take any Action.`],
	size: 0,
	type: `Drug`,
	mix: 12,
	overdose: true
})

export default Sedative
