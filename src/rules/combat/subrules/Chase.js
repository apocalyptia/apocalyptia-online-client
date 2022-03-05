import Combat from '$classes/Combat.js'

const Chase = new Combat({
	name: `Chase`,
	description: [
		`When a combatant attempts to flee and another chooses to pursue, they make opposed Chase rolls [ ( Acrobatics, Athletics, Drive, or Tame ) + Run Speed ] once each Round as an Action.`,
		`The Skill each combatant uses for the Chase roll depends on the type of mobility they are using for that Round.`,
		`When the pursuing combatant gets a Success, they may make Attacks against their prey with any Actions they have remaining.`,
		`When the fleeing combatant has Succeeded on 3 Chase rolls in a row, the pursuer has lost them and the fleeing combatant gets away.`,
	],
})

export default Chase
