import Wearable from '/src/classes/gear/Wearable.js'

const Bandoleer = new Wearable({
	name: `Bandoleer`,
	desc: [`Holds 50 bullets of any caliber.`],
	sz: 0
})
Bandoleer.slots = 1

export default Bandoleer
