import Wearable from '$classes/gear/Wearable.js'

const MessengerBag = new Wearable({
	name: `Messenger Bag`,
	description: [`1 Round to access.`],
	size: 1,
})
MessengerBag.slots = 4

export default MessengerBag
