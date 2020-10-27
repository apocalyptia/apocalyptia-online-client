import Rule from 'rules/Rule.js'

const ReflexiveDefense = new Rule({
	id: `feae7482-800b-47d1-f17c-3a103d83b70b`,
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses = the Skill Specialty they are based on.`,
		`These are your default Defenses when not actively rolling.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
})

export default ReflexiveDefense