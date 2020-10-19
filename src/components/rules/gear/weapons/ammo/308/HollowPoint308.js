import Ammo from 'gear/weapons/ammo/Ammo.js'
import HollowPoint from 'gear/attributes/weapon/HollowPoint.js'


const HollowPoint308 = new Ammo({
	id: `d9ef6e71-5f4c-4372-a1fb-70ad48637276`,
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