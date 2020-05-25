import Ammo from '../Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint22 = new Ammo({
	id: `af1d4448-b795-4340-b1d6-2eeb601eeea7`,
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