import Ammo from '../Ammo'
import Slug from '../../../attributes/weapon/Slug'


const Slug12g = new Ammo({
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