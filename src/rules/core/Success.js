import Rule from '/src/classes/Rule.js'
import Cooperation from '/src/rules/core/subrules/Cooperation.js'
import RoteActions from '/src/rules/core/subrules/RoteActions.js'

const Success = new Rule({
	name: `Success`,
	desc: [
		`Your roll is a Success when if the Result is greater than or equal to the Difficulty.`,
		`Re-roll ties on opposed rolls.`,
		`The degree of Success (the amount by which the Result exceeded the Difficulty) is important for some rolls, such as Attacks when calculating Damage.`,
	]
})
Success.subrules = [
	RoteActions,
	Cooperation,
]

export default Success