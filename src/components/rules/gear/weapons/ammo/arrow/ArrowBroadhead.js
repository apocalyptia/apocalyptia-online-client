import Ammo from '../Ammo'
import Broadhead from '../../../attributes/weapon/Broadhead'
import Pierce from '../../../attributes/weapon/Pierce'


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