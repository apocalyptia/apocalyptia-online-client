import Rule from '../../classes/Rule.js' 

const Taunt = new Rule({
	name: `Taunt`,
	desc: [
		`Roll [Leadership vs Demeanor].`,
		`Provoke the enemy into exclusively attacking you.`,
		`The degree of Success is a penalty to the loser’s next roll.`,
		`The enemy is Stunned for 1 round if [penalty > enemy’s Demeanor].`,
	],
	type: `Social`
})

export default Taunt