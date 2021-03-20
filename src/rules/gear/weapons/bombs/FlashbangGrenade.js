import Gear from '/src/classes/Gear.js'
import Blind from '/src/rules/status/Blind.js'
import Stun from '/src/rules/status/Stun.js'

const FlashbangGrenade = new Gear({
	id: ``,
	name: `Flashbang Grenade`,
	type: `Bomb`,
	desc: [
		`Stun grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
		Stun,
	]
})
FlashbangGrenade.dmg = 0
FlashbangGrenade.rng = 6
FlashbangGrenade.fuse = 2
FlashbangGrenade.dur = `1d6`
FlashbangGrenade.mix = 9

export default FlashbangGrenade