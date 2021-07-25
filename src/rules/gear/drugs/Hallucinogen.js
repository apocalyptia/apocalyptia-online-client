import Drug from '/src/classes/gear/Drug.js'

const Hallucinogen = new Drug({
	name: `Hallucinogen`,
	description: [`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`],
	size: 0,
	type: `Drug`,
	mix: 15,
	overdose: false,
})

export default Hallucinogen
