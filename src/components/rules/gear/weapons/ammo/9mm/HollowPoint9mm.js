import Ammo from '../Ammo'
import HollowPoint from '../../../attributes/weapon/HollowPoint'


const HollowPoint9mm = new Ammo({
	id: `2ae93589-3bd7-4abf-a6a1-153bd1b4e7ed`,
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