import Gear from 'gear/Gear.js'
import Broadhead from 'attributes/Broadhead.js'
import Pierce from 'attributes/Pierce.js'

const ArrowBroadhead = new Gear({
	id: `b157becd-2144-4e55-9e3b-be88089ec6fe`,
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