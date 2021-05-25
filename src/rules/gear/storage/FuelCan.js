import Gear from '../../../classes/Gear.js' 

const FuelCan = new Gear({
	name: `Fuel Can`,
	desc: [
		`5gal Fuel.`,
		`d6 Fire Damage/gal, 1min, 1yd/gal Blast.`,
	],
	sz: 2
})
FuelCan.slots = 5

export default FuelCan