import Property from '../../classes/Property.js'

const formula = `( Brains + Constitution ) / 2`

const Deflection = new Property({
	name: `Deflection`,
	formula: formula,
	desc: [
		`Deflection = ${formula}.`,
		`This is your default Defense against Melee Attacks when you do not spend and Action to make a Melee(Block) roll.`
	],
	type: `Property`
})

export default Deflection
