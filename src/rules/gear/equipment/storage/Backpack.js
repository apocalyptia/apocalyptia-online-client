import Gear from '$classes/Gear.js'

const Backpack = new Gear({
	id: ``,
	name: `Backpack`,
	desc: [
		`2 rounds to access.`,
	],
	sz: 1
})
Backpack.slots = 30

export default Backpack