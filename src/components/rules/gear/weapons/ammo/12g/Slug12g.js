import Gear from 'gear/Gear.js'
import Slug from 'attributes/Slug.js'

const Slug12g = new Gear({
	id: `3d42c43d-4507-4c35-9bcf-88fee3cdb943`,
	name: `12g Slug`,
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