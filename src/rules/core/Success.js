import Rule from '../../classes/Rule.js' 
import Cooperation from './subrules/Cooperation.js' 
import RoteActions from './subrules/RoteActions.js' 

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