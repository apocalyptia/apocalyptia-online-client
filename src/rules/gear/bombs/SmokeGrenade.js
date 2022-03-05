import Bomb from '$classes/gear/Bomb.js'
import Blind from '../../status/Blind.js'

const SmokeGrenade = new Bomb({
	name: `Smoke Grenade`,
	type: `Bomb`,
	description: [`Visibility denial grenade.`],
	size: 1,
	attributes: [ Blind],
	damage: 0,
	range: `1yd/rnd`,
	fuse: 2,
	duration: `1d6mins`,
	mix: 6,
})

export default SmokeGrenade
