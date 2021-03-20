import Gear from '/src/classes/Gear.js'

const Painkiller = new Gear({
	id: ``,
	name: `Painkiller`,
	desc: [
		`Ignore 1 Pain penalty.`,
	],
	sz: 0,
	type: `Drug`
})
Painkiller.mix = 9
Painkiller.od = true

export default Painkiller