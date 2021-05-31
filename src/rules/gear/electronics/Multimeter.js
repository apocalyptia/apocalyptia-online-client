import Electronic from '/src/classes/gear/Electronic.js'

const Multimeter = new Electronic({
	name: `Multimeter`,
	type: `Electronics`,
	desc: [`+3 Science(Technology).`, `Detects voltage, battery life, and closed circuits.`],
	sz: 1
})
Multimeter.dur = 57600

export default Multimeter
