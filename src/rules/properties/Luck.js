import Property from '../../classes/Property.js'

const formula = `( Agility + Demeanor ) / 2`

const Luck = new Property({
	name: `Luck`,
	formula: formula,
	description: [
		`Luck = ${formula}`,
		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
		`You may spend 1 Luck Point per Round for one of the three effects listed below.`,
		`Spending a Luck Point does not require the use of an Action.`,
		`You regain 1 spent Luck Point per day after getting 8 hours of sleep.`,
		`• Re-roll your last roll and add a Luck roll [d6 + current Luck points] to the result as a bonus.`,
		`• Take an extra Action this Round (up to 4 Actions) without having to spend any Endurance.`,
		`• Give a Luck point to one of your Comrades.`,
	],
	type: `Property`,
})

export default Luck
