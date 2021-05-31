import Wearable from '/src/classes/gear/Wearable.js'

const MessengerBag = new Wearable({
	name: `Messenger Bag`,
	desc: [`1 Round to access.`],
	sz: 1
})
MessengerBag.slots = 4

export default MessengerBag
