import Gear from '/src/classes/Gear.js'

const Hallucinogen = new Gear({
	id: ``,
	name: `Hallucinogen`,
	desc: [
		`+1 Perform and Tame, -3 to all other rolls, and -1 Psyche.`,
	],
	sz: 0,
	type: `Drug`
})
Hallucinogen.mix = 15
Hallucinogen.od = false

export default Hallucinogen