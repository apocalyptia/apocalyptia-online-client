import Gear from '../../../classes/Gear.js' 

const Sedative = new Gear({
	name: `Sedative`,
	desc: [
		`Demeanor #6 per round to take any action.`,
	],
	sz: 0,
	type: `Drug`
})
Sedative.mix = 12
Sedative.od = true

export default Sedative