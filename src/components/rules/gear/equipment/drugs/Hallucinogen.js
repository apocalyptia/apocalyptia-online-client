import Gear from 'gear/Gear.js'

const Hallucinogen = new Gear({
	id: `462f38ee-ef66-4f76-9110-95802de92a6b`,
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