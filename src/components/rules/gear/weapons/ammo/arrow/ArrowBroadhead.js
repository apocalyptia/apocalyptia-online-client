import Gear from 'classes/Gear.js'
import Broadhead from 'attributes/Broadhead.js'
import Pierce from 'attributes/Pierce.js'

const ArrowBroadhead = new Gear({
	name: `Broadhead Arrow`,
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