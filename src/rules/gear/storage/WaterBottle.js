import Storage from '/src/classes/gear/Storage.js'

const WaterBottle = new Storage({
	name: `Water Bottle`,
	desc: [`Holds 1 unit (.5gal) of liquid.`],
	sz: 1
})
WaterBottle.slots = 1

export default WaterBottle
