import Attribute from '/src/classes/gear/Attribute.js'

const Auto = new Attribute({
	name: `Auto`,
	description: [
		`Choose either Burst or Spray.`,
		`Burst: +3 Projectile Attack vs one target.`,
		`Spray: 3yd Blast Attack.`,
		`Uses 10 bullets.`
	]
})

export default Auto
