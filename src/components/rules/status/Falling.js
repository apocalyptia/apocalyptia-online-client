import Rule from '../../rules/Rule'


const Falling = new Rule({
	name: `Falling`, 
	desc: [
		`1 Blunt Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Location.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
})

export default Falling