import Gear from 'classes/Gear.js'

const Canteen = new Gear({
	id: `a61e20a4-89c8-438e-b483-9da4de93d112`,
	name: `Canteen`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
		`Metal.`,
	],
	sz: 1
})
Canteen.slots = 1

export default Canteen