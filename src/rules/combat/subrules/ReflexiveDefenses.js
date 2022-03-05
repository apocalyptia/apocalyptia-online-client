import Combat from '$classes/Combat.js'

const ReflexiveDefenses = new Combat({
	name: `Reflexive Defenses`,
	description: [
		`There are two types of Reflexive Defenses: Deflection and Evasion.`,
		`Reflexive Defenses are Properties that act as your default Defense when you do not use an Active Defense.`,
		`Deflection is equal to your Melee ( Block ) score, and it is used as your default Defense against Melee Attacks.`,
		`You may choose to use Deflection against Projectile Attacks as well if you are holding a Shield.`,
		`Evasion is equal to your Acrobatics ( Dodge ) score, and it is used as your default Defense against all Projectile Attacks.`,
		`You may choose to use Evasion against Melee Attacks as well.`,
		`Reflexive Defenses do not cost any Endurance to use.`,
		`Reflexive Defenses are reduced by Pain penalties, to a minimum of 0.`,
	],
})

export default ReflexiveDefenses
