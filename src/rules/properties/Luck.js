import Property from '../../classes/Property.js' 

const formula = `( Agility + Demeanor ) / 2`

const Luck = new Property({
	name: `Luck`,
	formula: formula,
	desc: [
		`Luck = ${formula}`,
		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
		`You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.`,
		`You regain 1 spent Luck Point at dawn each day.`,
		`• Re-roll the last die you rolled with a +6 bonus.`,
		`• Take an extra Action on your turn.`,
		`• Give a Luck point to a Comrade.`,
	],
	type: `Property`
})

export default Luck