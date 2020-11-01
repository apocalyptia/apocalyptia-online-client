import Gear from 'classes/Gear.js'

const HydrationPack = new Gear({
	id: `5287fe67-386f-43e1-9e65-5be527769990`,
	name: `Hydration Pack`,
	desc: [
		`Holds 4 units (2gal) of liquid.`,
	],
	sz: 1
})
HydrationPack.slots = 4

export default HydrationPack