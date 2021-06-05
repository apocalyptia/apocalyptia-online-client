import Bomb from '/src/classes/gear/Bomb.js'
import Blast from '../attributes/Blast.js'

const FragGrenade = new Bomb({
	name: `Frag Grenade`,
	type: `Bomb`,
	description: [`Explosive fragmentation grenade.`],
	size: 1,
	attributes: [Blast],
	damage: `3d6`,
	range: 15,
	fuse: 2,
	duration: 1,
	mix: 9
})

export default FragGrenade
