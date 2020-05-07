import Property from './Property'


const Luck = new Property({
	name: `Luck`,
	desc: [
		`Luck = Demeanor`,
		`Luck rolls [d6 + current Luck points] are made to determine your fate in matters of pure chance.`,
		`You may spend 1 Luck Point per round in a dramatic moment for one of the three effects listed below.`,
		`You regain 1 spent Luck Point at dawn each day.`,
		`• Re-roll the last die you rolled with a +6 bonus.`,
		`• Take an extra Action on your turn.`,
		`• Give a Luck point to a Comrade.`,
	],
	formula: (c) => {
		c.props.luck.score = c.traits.demeanor.score
		c.props.luck.current = c.traits.demeanor.score
	}
})

export default Luck