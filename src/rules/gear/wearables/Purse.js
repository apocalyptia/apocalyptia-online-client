import Wearable from '/src/classes/gear/Wearable.js'

const Purse = new Wearable({
	name: `Purse`,
	desc: [`1 Round to access.`],
	sz: 1
})
Purse.slots = 3

export default Purse
