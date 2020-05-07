import Storage from './Storage'


const FuelCan = new Storage({
	name: `Fuel Can`,
	desc: [
		`5gal Fuel.`,
		`d6 Fire Damage/gal, 1min, 1yd/gal Blast.`,
	],
	sz: 2,
	slots: 5
})

export default FuelCan