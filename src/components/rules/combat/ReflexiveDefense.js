import Rule from 'classes/Rule.js'

const ReflexiveDefense = new Rule({
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses equal the Skill Specialty they are based on.`,
		`These are your default Defenses when not actively rolling.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
})

export default ReflexiveDefense