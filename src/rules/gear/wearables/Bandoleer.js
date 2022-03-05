import Wearable from '$classes/gear/Wearable.js'

const Bandoleer = new Wearable({
	name: `Bandoleer`,
	description: [`Holds 50 bullets of any caliber.`],
	size: 0,
})
Bandoleer.slots = 1

export default Bandoleer
