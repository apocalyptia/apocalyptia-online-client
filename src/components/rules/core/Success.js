import Rule from 'rules/Rule.js'
import Cooperation from 'core/Cooperation.js'
import RoteActions from 'core/RoteActions.js'

const Success = new Rule({
	id: `2fdf085b-6ec7-4b82-7442-9ecf516664aa`,
	name: `Success`,
	desc: [
		`Your roll is a Success when if the Result is greater than or equal to the Difficulty.`,
		`Re-roll ties on opposed rolls.`,
		`The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks.`,
	]
})
Success.subrules = [
	RoteActions,
	Cooperation,
]

export default Success