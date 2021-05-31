import Drug from '/src/classes/gear/Drug.js'

const Painkiller = new Drug({
	name: `Painkiller`,
	desc: [`Ignore 1 Pain penalty.`],
	sz: 0,
	type: `Drug`
})
Painkiller.mix = 9
Painkiller.od = true

export default Painkiller
