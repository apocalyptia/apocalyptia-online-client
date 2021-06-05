import Combat from '/src/classes/Combat.js'
import ActiveDefense from './subrules/ActiveDefense.js'
import ReflexiveDefense from './subrules/ReflexiveDefense.js'

const Defense = new Combat({
	name: `Defense`,
	description: [
		`Defense sets the Difficulty for an Attack against you.`,
		`There are two modes of Defense: Active and Reflexive.`,
		`When you allocate your Actions for the Round, any unallocated Actions are assumed to be reserved to use on Active Defense rolls if needed.`,
		`If you are targeted by an Attack, you may choose which type of valid Active Defense roll you would like to make in response (Block or Dodge).`,
		`If you do not use an Action for active Defense, then you must chose which type of valid Reflexive Defense you will use (Deflection or Evasion).`
	]
})
Defense.subrules = [ActiveDefense, ReflexiveDefense]

export default Defense
