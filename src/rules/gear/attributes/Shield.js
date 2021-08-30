import Attribute from '/src/classes/gear/Attribute.js'

const Shield = new Attribute({
	name: `Shield`,
	description: [
		`Absorption = Size when used as Cover.`,
		`Bonus to Block = Size.`,
		`Allows Melee (Block) and Deflect to be used vs Projectile (Firearm) Attacks.`
	]
})

export default Shield
