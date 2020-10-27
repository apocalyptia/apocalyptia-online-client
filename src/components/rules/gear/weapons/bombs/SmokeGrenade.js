import Gear from 'gear/Gear.js'
import Blind from 'rules/status/Blind.js'

const SmokeGrenade = new Gear({
	id: `aacd8692-39c0-4be9-b0cf-342d9ea24761`,
	name: `Smoke Grenade`, 
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