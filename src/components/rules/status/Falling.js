import Rule from 'classes/Rule.js'

const Falling = new Rule({
	name: `Falling`,
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Body Part.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	],
	type: `Status`
})

export default Falling