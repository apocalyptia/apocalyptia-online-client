import Ammo from 'gear/weapons/ammo/Ammo.js'
import HollowPoint from 'gear/attributes/weapon/HollowPoint.js'


const HollowPoint556 = new Ammo({
	id: `f6f0b22f-df8c-4604-ae1e-1f381ea60e4a`,
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