import Gear from 'classes/Gear.js'
import Slug from 'attributes/Slug.js'

const Slug12g = new Gear({
	name: `12g Slug`,
	type: `Ammo`,
	desc: [
		`Single-projectile ammunition.`,
	],
	sz: 0.05,
	attr: [
		Slug,
	]
})
Slug12g.cal = `12g`

export default Slug12g