import Gear from 'gear/Gear.js'
import Blind from 'rules/status/Blind.js'
import Stun from 'rules/status/Stun.js'

const FlashbangGrenade = new Gear({
	id: `f158de9a-ef27-4c24-9d38-6a2f665c941e`,
	name: `Flashbang Grenade`,
	desc: [
		`Non-lethal stun grenade.`,
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