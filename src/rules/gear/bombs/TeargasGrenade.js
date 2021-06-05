import Bomb from '/src/classes/gear/Bomb.js'
import Blind from '../../status/Blind.js'
import Stun from '../../status/Stun.js'
import Asphyxiation from '../../needs/Asphyxiation.js'

const TeargasGrenade = new Bomb({
	name: `Teargas Grenade`,
	type: `Bomb`,
	description: [`Chemical irritant grenade.`],
	size: 1,
	attributes: [Blind, Stun, Asphyxiation],
	damage: 1,
	range: `1yd/rnd`,
	fuse: 2,
	duration: `1d6mins`,
	mix: 15
})

export default TeargasGrenade
