import Rule from 'rules/Rule.js'


const Falling = new Rule({
	id: `064cb25d-caff-4c33-944a-849604861561`,
	name: `Falling`,
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Body Part.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
})

export default Falling