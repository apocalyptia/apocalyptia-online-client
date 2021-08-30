import Bomb from '/src/classes/gear/Bomb.js'
import Blast from '../attributes/Blast.js'
import Fire from '../attributes/Fire.js'

const Thermite = new Bomb({
	name: `Thermite`,
	type: `Bomb`,
	description: [`High-temperature incendiary bomb.`],
	size: 1,
	attributes: [ Blast, Fire ],
	damage: `6d6`,
	range: 1,
	fuse: 2,
	duration: 6,
	mix: 6,
})

export default Thermite
