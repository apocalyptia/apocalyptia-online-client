import Drug from '$classes/gear/Drug.js'

const Antibiotic = new Drug({
	name: `Antibiotic`,
	description: [`Prevents infection in Recovery for 1 day.`],
	size: 0,
	type: `Drug`,
	mix: 12,
	overdose: false,
})

export default Antibiotic
