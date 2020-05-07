import Rule from '../../rules/Rule'


const Defenseless = new Rule({
	name: `Defenseless`, 
	desc: [
		`You must use a Reflexive Defense.`,
		`Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
	]
})

export default Defenseless