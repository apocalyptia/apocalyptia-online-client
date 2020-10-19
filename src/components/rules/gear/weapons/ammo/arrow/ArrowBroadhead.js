import Ammo from 'gear/weapons/ammo/Ammo.js'
import Broadhead from 'gear/attributes/weapon/Broadhead.js'
import Pierce from 'gear/attributes/weapon/Pierce.js'


const ArrowBroadhead = new Ammo({
	id: `b157becd-2144-4e55-9e3b-be88089ec6fe`,
	name: `Broadhead Arrow`,
	desc: [
		`Hunting arrow.`,
	],
	sz: 0.1,
	cal: `Arrow`,
	attr: [
		Broadhead,
		Pierce,
	],
})

export default ArrowBroadhead