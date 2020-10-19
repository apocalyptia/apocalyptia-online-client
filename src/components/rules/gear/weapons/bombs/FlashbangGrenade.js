import Bomb from 'gear/weapons/bombs/Bomb.js'
import Blind from 'rules/status/Blind.js'
import Stun from 'rules/status/Stun.js'


const FlashbangGrenade = new Bomb({
	id: `f158de9a-ef27-4c24-9d38-6a2f665c941e`,
	name: `Flashbang Grenade`,
	desc: [
		`Non-lethal stun grenade.`,
	],
	sz: 1,
	dmg: `0`,
	rng: `6yd`,
	attr: [
		Blind,
		Stun,
	],
	fuse: `1 round`,
	dur: `d6 rounds`,
	mix: 9
})

export default FlashbangGrenade