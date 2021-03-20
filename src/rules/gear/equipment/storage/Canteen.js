import Gear from '/src/classes/Gear.js'

const Canteen = new Gear({
	id: ``,
	name: `Canteen`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
		`Metal.`,
	],
	sz: 1
})
Canteen.slots = 1

export default Canteen