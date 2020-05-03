import Bomb from '../../../../classes/gear/weapons/Bomb'
import Blind from '../../../status/Blind'
import Stun from '../../../status/Stun'


const FlashbangGrenade = new Bomb({
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