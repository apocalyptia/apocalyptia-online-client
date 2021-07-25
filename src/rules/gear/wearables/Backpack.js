import Wearable from '/src/classes/gear/Wearable.js'

const Backpack = new Wearable({
	name: `Backpack`,
	description: [`2 rounds to access.`],
	size: 1,
})
Backpack.slots = 30

export default Backpack
