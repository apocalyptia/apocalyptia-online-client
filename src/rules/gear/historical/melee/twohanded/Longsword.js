import Gear from '$classes/Gear.js'

const LongSword = new Gear({
	id: ``,
	name: `Long Sword`,
	type: `Melee Weapon`,
	sz: 3,
	attr: []
})
LongSword.dmg = 3
LongSword.rng = 3

export default LongSword