import Ammo from '../../../../../classes/gear/weapons/Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint357 = new Ammo({
	name: `.357 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.01,
	cal: `.357`,
	attr: [
		HollowPoint,
	]
})

export default HollowPoint357