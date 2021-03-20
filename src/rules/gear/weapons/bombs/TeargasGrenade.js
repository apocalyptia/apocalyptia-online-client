import Gear from '/src/classes/Gear.js'
import Blind from '/src/rules/status/Blind.js'
import Stun from '/src/rules/status/Stun.js'
import Asphyxiation from '/src/rules/needs/Asphyxiation.js'

const TeargasGrenade = new Gear({
	id: ``,
	name: `Teargas Grenade`,
	type: `Bomb`,
	desc: [
		`Chemical irritant grenade.`,
	],
	sz: 1,
	attr: [
		Blind,
		Stun,
		Asphyxiation,
	]
})
TeargasGrenade.dmg = 1
TeargasGrenade.rng = `1yd/rnd`
TeargasGrenade.fuse = 2
TeargasGrenade.dur = `1d6mins`
TeargasGrenade.mix = 15

export default TeargasGrenade