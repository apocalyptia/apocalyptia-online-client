import Electronic from '/src/classes/gear/Electronic.js'

const Flashlight = new Electronic({
	name: `Flashlight`,
	type: `Electronics`,
	description: [`10yd light. -3 Projectile Attack to Blind 1 Round.`],
	duration: 3600,
	size: 1,
})

export default Flashlight
