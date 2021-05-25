import Gear from '../../../classes/Gear.js' 

const Painkiller = new Gear({
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