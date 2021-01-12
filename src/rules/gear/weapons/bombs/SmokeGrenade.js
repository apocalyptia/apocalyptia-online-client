import Gear from 'classes/Gear.js'
import Blind from 'rules/status/Blind.js'

const SmokeGrenade = new Gear({
	id: ``,
	name: `Smoke Grenade`,
	type: `Bomb`,
	desc: [
		`Visibility denial grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
	]
})
SmokeGrenade.dmg = 0
SmokeGrenade.rng = `1yd/rnd`
SmokeGrenade.fuse = 2
SmokeGrenade.dur = `1d6mins`
SmokeGrenade.mix = 6

export default SmokeGrenade