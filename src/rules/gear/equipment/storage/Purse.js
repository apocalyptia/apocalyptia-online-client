import Gear from '/src/classes/Gear.js'

const Purse = new Gear({
	id: ``,
	name: `Purse`,
	desc: [
		`1 round to access.`,
	],
	sz: 1
})
Purse.slots = 3

export default Purse