import Gear from 'gear/Gear.js'

const WaterBottle = new Gear({
	id: `ce28fa26-8497-4234-b2df-2b0560f8d76b`,
	name: `Water Bottle`,
	desc: [
		`Holds 1 unit (.5gal) of liquid.`,
	],
	sz: 1
})
WaterBottle.slots = 1

export default WaterBottle