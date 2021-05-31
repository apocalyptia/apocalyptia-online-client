import Electronic from '/src/classes/gear/Electronic.js'

const Flashlight = new Electronic({
	name: `Flashlight`,
	type: `Electronics`,
	desc: [`10yd light. -3 Projectile Attack to Blind 1 Round.`],
	sz: 1
})
Flashlight.dur = 3600

export default Flashlight
