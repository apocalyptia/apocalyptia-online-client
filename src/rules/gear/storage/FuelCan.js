import Storage from '$classes/gear/Storage.js'

const FuelCan = new Storage({
	name: `Fuel Can`,
	description: [`5gal Fuel.`, `d6 Fire Damage/gal, 1min, 1yd/gal Blast.`],
	slots: 5,
	size: 2,
})

export default FuelCan
