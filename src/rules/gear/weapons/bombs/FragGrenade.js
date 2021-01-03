import Gear from 'classes/Gear.js'
import Blast from 'rules/gear/attributes/Blast.js'
import Pierce from 'rules/gear/attributes/Pierce.js'

const FragGrenade = new Gear({
	name: `Frag Grenade`,
	type: `Bomb`,
	desc: [
		`Explosive fragmentation grenade.`,
	],
	sz: 1,
	attr: [
		Blast,
		Pierce,
	]
})
FragGrenade.dmg = `3d6`
FragGrenade.rng = 15
FragGrenade.fuse = 2
FragGrenade.dur = 1
FragGrenade.mix = 9

export default FragGrenade