import Wearable from '/src/classes/gear/Wearable.js'

const Purse = new Wearable({
	name: `Purse`,
	description: [`1 Round to access.`],
	size: 1
})
Purse.slots = 3

export default Purse
