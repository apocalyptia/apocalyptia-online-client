import Gear from '/src/classes/Gear.js'

const Lockbox = new Gear({
	id: ``,
	name: `Lockbox`,
	desc: [
		`2 Absorption.`,
		`Fire Resistance.`,
		`Larceny(Disable) 9#.`,
	],
	sz: 2
})
Lockbox.slots = 1

export default Lockbox