import Ammo from '/src/classes/gear/Ammo.js'
import Slug from '../attributes/Slug.js'

const Slug12g = new Ammo({
	accuracy: 0,
	attributes: [ Slug],
	caliber: `12g`,
	description: [`Single-projectile ammunition.`],
	damage: 0,
	name: `12g Slug`,
	penetration: 0,
	size: 0.05,
	type: `Ammo`,
})

export default Slug12g
