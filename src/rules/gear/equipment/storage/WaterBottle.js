import Gear from 'classes/Gear.js'

const WaterBottle = new Gear({
	id: ``,
	name: `Water Bottle`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
	],
	sz: 1
})
WaterBottle.slots = 1

export default WaterBottle