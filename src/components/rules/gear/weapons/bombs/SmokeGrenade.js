import Bomb from './Bomb'
import Blind from '../../../status/Blind'


const SmokeGrenade = new Bomb({
	id: `aacd8692-39c0-4be9-b0cf-342d9ea24761`,
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