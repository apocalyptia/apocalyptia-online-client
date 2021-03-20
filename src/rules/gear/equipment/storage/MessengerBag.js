import Gear from '/src/classes/Gear.js'

const MessengerBag = new Gear({
	id: ``,
	name: `Messenger Bag`,
	desc: [
		`1 round to access.`,
	],
	sz: 1
})
MessengerBag.slots = 4

export default MessengerBag