import Gear from '/src/classes/Gear.js'
import Broadhead from '/src/rules/gear/attributes/Broadhead.js'
import Pierce from '/src/rules/gear/attributes/Pierce.js'

const ArrowBroadhead = new Gear({
	id: ``,
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