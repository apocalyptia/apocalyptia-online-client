import Drug from '/src/classes/gear/Drug.js'

const Sedative = new Drug({
	name: `Sedative`,
	desc: [`Demeanor #6 per Round to take any Action.`],
	sz: 0,
	type: `Drug`
})
Sedative.mix = 12
Sedative.od = true

export default Sedative
