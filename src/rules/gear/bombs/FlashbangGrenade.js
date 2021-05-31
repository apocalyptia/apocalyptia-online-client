import Bomb from '/src/classes/gear/Bomb.js'
import Blind from '../../status/Blind.js'
import Stun from '../../status/Stun.js'

const FlashbangGrenade = new Bomb({
	name: `Flashbang Grenade`,
	type: `Bomb`,
	desc: [`Stun grenade.`],
	sz: 1,
	attr: [Blind, Stun]
})
FlashbangGrenade.dmg = 0
FlashbangGrenade.rng = 6
FlashbangGrenade.fuse = 2
FlashbangGrenade.dur = `1d6`
FlashbangGrenade.mix = 9

export default FlashbangGrenade
