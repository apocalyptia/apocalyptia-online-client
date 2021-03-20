import Gear from '/src/classes/Gear.js'

const Thermometer = new Gear({
	id: ``,
	name: `Thermometer`,
	type: `Medical`,
	desc: [
		`+1 Medicine.`,
		`Accurately reads temperature.`,
	],
	sz: 0
})

export default Thermometer