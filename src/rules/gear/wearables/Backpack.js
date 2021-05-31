import Wearable from '/src/classes/gear/Wearable.js'

const Backpack = new Wearable({
	name: `Backpack`,
	desc: [`2 rounds to access.`],
	sz: 1
})
Backpack.slots = 30

export default Backpack
