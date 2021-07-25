import Bomb from '/src/classes/gear/Bomb.js'
import Blind from '../../status/Blind.js'
import Stun from '../../status/Stun.js'

const FlashbangGrenade = new Bomb({
	name: `Flashbang Grenade`,
	type: `Bomb`,
	description: [`Stun grenade.`],
	size: 1,
	attributes: [Blind, Stun],
	damage: 0,
	range: 6,
	fuse: 2,
	duration: `1d6`,
	mix: 9,
})

export default FlashbangGrenade
