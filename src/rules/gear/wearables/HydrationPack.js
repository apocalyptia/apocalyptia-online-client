import Wearable from '/src/classes/gear/Wearable.js'

const HydrationPack = new Wearable({
	name: `Hydration Pack`,
	desc: [`Holds 4 units (2gal) of liquid.`],
	sz: 0
})
HydrationPack.slots = 4

export default HydrationPack
