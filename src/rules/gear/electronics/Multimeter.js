import Electronic from '$classes/gear/Electronic.js'

const Multimeter = new Electronic({
	name: `Multimeter`,
	type: `Electronics`,
	description: [`+3 Science (Technology).`, `Detects voltage, battery life, and closed circuits.`],
	duration: 57600,
	size: 1,
})

export default Multimeter
