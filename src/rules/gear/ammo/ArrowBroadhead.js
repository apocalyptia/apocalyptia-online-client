import Ammo from '/src/classes/gear/Ammo.js'
import Broadhead from '../attributes/Broadhead.js'
import Pierce from '../attributes/Pierce.js'

const ArrowBroadhead = new Ammo({
	name: `Broadhead Arrow`,
	type: `Ammo`,
	desc: [`Hunting arrow.`],
	sz: 0.1,
	attr: [Broadhead, Pierce]
})
ArrowBroadhead.cal = `Arrow`

export default ArrowBroadhead
