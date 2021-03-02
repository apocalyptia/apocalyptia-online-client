import Rule from 'classes/Rule.js'

const Discipline = new Rule({
	name: `Discipline`,
	desc: [
		`Discipline = (Constitution + Demeanor) / 2.`,
		`This is the amount of Pain you can ignore before you start taking penalties.`
	],
	formula: (c) => c.properties.discipline.score = Math.floor((c.traits.constitution.score + c.traits.demeanor.score) / 2),
	type: `Property`
})

export default Discipline