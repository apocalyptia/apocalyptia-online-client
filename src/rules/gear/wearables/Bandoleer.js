import Gear from '../../../classes/Gear.js'

const Bandoleer = new Gear({
	name: `Bandoleer`,
	desc: [`Holds 50 bullets of any caliber.`],
	sz: 0
})
Bandoleer.slots = 1

export default Bandoleer
