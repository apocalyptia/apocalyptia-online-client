import Ammo from '../Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint556 = new Ammo({
	name: `5.56mm Hollow Point`,
	desc: [
		`Self-defense ammunition.`,
	],
	sz: 0.02,
	cal: `5.56`,
	attr: [
		HollowPoint,
	]
})

export default HollowPoint556