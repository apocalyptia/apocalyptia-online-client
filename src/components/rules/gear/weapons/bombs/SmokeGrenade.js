import Bomb from '../../../../classes/gear/weapons/Bomb'
import Blind from '../../../status/Blind'


const SmokeGrenade = new Bomb({
	name: `Smoke Grenade`, 
	desc: [
		`Visibility denial grenade.`,
	],
	sz: 1,
	dmg: `0`,
	rng: `1yd/round`,
	attr: [
		Blind,
	],
	fuse: `1 round`,
	dur: `d6mins`,
	mix: 6
})

export default SmokeGrenade