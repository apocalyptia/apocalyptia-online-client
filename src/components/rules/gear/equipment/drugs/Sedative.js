import Gear from 'gear/Gear.js'

const Sedative = new Gear({
	id: `4fb51505-52ff-45a1-5b73-129aabc09b83`,
	name: `Sedative`,
	desc: [
		`Demeanor#6/round to take any action.`,
	],
	sz: 0,
	type: `Drug`
})
Sedative.mix = 12
Sedative.od = true

export default Sedative