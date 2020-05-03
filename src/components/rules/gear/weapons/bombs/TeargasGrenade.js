import Bomb from '../../../../classes/gear/weapons/Bomb'
import Blind from '../../../status/Blind'
import Stun from '../../../status/Stun'
import Asphyxiation from '../../../needs/Asphyxiation'


const TeargasGrenade = new Bomb({
	name: `Teargas Grenade`,
	desc: [
		`Non-lethal chemical irritant grenade.`,
	],
	sz: 1,
	dmg: `1`,
	rng: `1yd/round`,
	attr: [
		Blind,
		Stun,
		Asphyxiation,
	],
	fuse: `1 round`,
	dur: `d6mins`,
	mix: 15
})

export default TeargasGrenade