import Property from '../../classes/Property.js'

const formula = `( Brains + Constitution ) / 2`

const Deflection = new Property({
	name: `Deflection`,
	formula: formula,
	description: [
		`Deflection = ${formula}.`,
		`This is your default Defense against Melee Attacks when you do not allocate an Action to make a Melee ( Block ) roll.`,
		`Deflection does not require an Action or cost Endurance, though it is reduced by Pain penalties.`,
	],
	type: `Property`,
})

export default Deflection
