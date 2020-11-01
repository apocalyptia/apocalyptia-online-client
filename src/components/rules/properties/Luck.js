import Rule from 'classes/Rule.js'

const Luck = new Rule({
	id: `58641270-0e30-4ca9-9986-7c9da1cc4d28`,
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
	},
	type: `Property`
})

export default Luck