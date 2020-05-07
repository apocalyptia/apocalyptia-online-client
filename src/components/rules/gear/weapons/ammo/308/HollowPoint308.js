import Ammo from '../Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint308 = new Ammo({
	name: `.308 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `.308`,
	attr: [
		HollowPoint,
	]
})

export default HollowPoint308