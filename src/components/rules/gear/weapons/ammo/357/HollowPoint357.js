import Ammo from 'gear/weapons/ammo/Ammo.js'
import HollowPoint from 'gear/attributes/weapon/HollowPoint.js'


const HollowPoint357 = new Ammo({
	id: `798c6783-f44b-447f-9f9b-8332bd4ab74e`,
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