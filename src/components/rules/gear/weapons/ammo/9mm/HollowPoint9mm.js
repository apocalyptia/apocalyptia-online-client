import Ammo from '../../../../../classes/gear/weapons/Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint9mm = new Ammo({
	name: `9mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `9mm`,
	attr: [
		HollowPoint,
	]
})

export default HollowPoint9mm