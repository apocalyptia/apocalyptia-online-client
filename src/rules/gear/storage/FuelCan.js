import Storage from '/src/classes/gear/Storage.js'

const FuelCan = new Storage({
	name: `Fuel Can`,
	desc: [`5gal Fuel.`, `d6 Fire Damage/gal, 1min, 1yd/gal Blast.`],
	sz: 2
})
FuelCan.slots = 5

export default FuelCan
