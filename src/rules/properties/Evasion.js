import Property from '../../classes/Property.js'

const formula = `( Agility + Brains ) / 2`

const Evasion = new Property({
	name: `Evasion`,
	formula: formula,
	desc: [
		`Evasion = ${formula}.`,
		`This is your default Defense against Projectile Attacks when you do not spend an Action to make an Acrobatics(Dodge) roll.`,
		`Evasion does not require an Action or cost Endurance, though it is reduced by Pain penalties.`
	],
	type: `Property`
})

export default Evasion
