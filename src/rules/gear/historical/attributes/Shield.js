import Attribute from '$classes/gear/Attribute.js'

const Shield = new Attribute({
	name: `Shield`,
	description: [
		`Absorption = Size when used as Cover.`,
		`Bonus to Block and Deflection = Size.`,
		`Allows Melee ( Block ) and Deflection to be used vs Projectile (Firearm) Attacks.`
	]
})

export default Shield
