import Wearable from '$classes/gear/Wearable.js'

const HydrationPack = new Wearable({
	name: `Hydration Pack`,
	description: [`Holds 4 units (2gal) of liquid.`],
	size: 0,
})
HydrationPack.slots = 4

export default HydrationPack
