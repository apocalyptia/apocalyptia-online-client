import Rule from '../../rules/Rule'
import ReflexiveDefense from './ReflexiveDefense'


const Defense = new Rule({
	name: `Defense`, 
	desc: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks.`,
		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
		`Botching a Defense roll makes you fall Prone.`,
	]
})
Defense.subrules = [
	ReflexiveDefense
]

export default Defense