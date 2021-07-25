import Drug from '/src/classes/gear/Drug.js'

const Painkiller = new Drug({
	name: `Painkiller`,
	description: [`Ignore 1 Pain penalty.`],
	size: 0,
	type: `Drug`,
	mix: 9,
	overdose: true,
})

export default Painkiller
