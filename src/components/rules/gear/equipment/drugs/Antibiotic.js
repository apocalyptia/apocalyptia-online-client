import Gear from 'gear/Gear.js'

const Antibiotic = new Gear({
	id: `5d0b08ad-11c0-490d-00ca-6a8bbeb3b4fa`,
	name: `Antibiotic`,
	desc: [
		`Prevents infection in Recovery for 1 day.`,
	],
	sz: 0,
	type: `Drug`
})
Antibiotic.mix = 12
Antibiotic.od = false

export default Antibiotic