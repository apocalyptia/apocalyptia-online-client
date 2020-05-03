import Rule from '../../classes/Rule'


const Unstable = new Rule({
	name: `Unstable`, 
	desc: [
		`-3 penalty to Agility or Constitution Skill rolls.`,
		`Ranged Attacks targeting you take a -3 penalty.`,
	]
})

export default Unstable