import Combat from '/src/classes/Combat.js'

const ReflexiveDefense = new Combat({
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses are your default Defenses when you do not spend an Action to actively roll Defense.`,
		`Reflexive Defenses are equal to the Skill Specialty score they are based on.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against Projectile Attacks.`
	]
})

export default ReflexiveDefense
