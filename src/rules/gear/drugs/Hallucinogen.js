import Drug from '/src/classes/gear/Drug.js'

const Hallucinogen = new Drug({
	name: `Hallucinogen`,
	desc: [`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`],
	sz: 0,
	type: `Drug`
})
Hallucinogen.mix = 15
Hallucinogen.od = false

export default Hallucinogen
