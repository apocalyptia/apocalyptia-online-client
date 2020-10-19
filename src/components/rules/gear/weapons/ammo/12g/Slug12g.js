import Ammo from 'gear/weapons/ammo/Ammo.js'
import Slug from 'gear/attributes/weapon/Slug.js'


const Slug12g = new Ammo({
	id: `3d42c43d-4507-4c35-9bcf-88fee3cdb943`,
	name: `12g Slug`,
	desc: [
		`Single-projectile ammunition.`,
	],
	sz: 0.05,
	cal: `12g`,
	attr: [
		Slug,
	]
})

export default Slug12g