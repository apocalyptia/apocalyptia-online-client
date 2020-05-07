import Ammo from '../Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint22 = new Ammo({
	name: `.22 Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: .005,
	cal: `.22`,
	attr: [
		HollowPoint,
	],
})

export default HollowPoint22