import Gear from '$classes/Gear.js'

const HydrationPack = new Gear({
	id: ``,
	name: `Hydration Pack`,
	desc: [
		`Holds 4 units (2gal) of liquid.`,
	],
	sz: 1
})
HydrationPack.slots = 4

export default HydrationPack