import Maneuver from '/src/classes/Maneuver.js'

const Taunt = new Maneuver({
	name: `Taunt`,
	description: [
		`Roll [ Leadership vs Demeanor].`,
		`Provoke the enemy into exclusively attacking you.`,
		`The degree of Success is a penalty to the loser’s next roll.`,
		`The enemy is Stunned for 1 Round if [penalty > enemy’s Demeanor].`,
	],
	mode: `Social`,
})

export default Taunt
