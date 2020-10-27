import Gear from 'gear/Gear.js'
import Blind from 'rules/status/Blind.js'
import Stun from 'rules/status/Stun.js'
import Asphyxiation from 'rules/needs/Asphyxiation.js'

const TeargasGrenade = new Gear({
	id: `892817b8-625f-4ef8-a6be-08716a6267c5`,
	name: `Teargas Grenade`,
	desc: [
		`Non-lethal chemical irritant grenade.`,
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