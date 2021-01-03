import Gear from 'classes/Gear.js'
import Broadhead from 'rules/gear/attributes/Broadhead.js'
import Pierce from 'rules/gear/attributes/Pierce.js'

const ArrowBroadhead = new Gear({
	name: `Broadhead Arrow`,
	type: `Ammo`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	attr: [
		Broadhead,
		Pierce,
	],
})
ArrowBroadhead.cal = `Arrow`

export default ArrowBroadhead