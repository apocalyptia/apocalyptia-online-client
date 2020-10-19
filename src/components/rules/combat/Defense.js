import Rule from 'rules/Rule.js'
import ReflexiveDefense from './ReflexiveDefense'


const Defense = new Rule({
	id: `69987b3f-518a-4f96-643c-c82cbd1c1a98`,
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