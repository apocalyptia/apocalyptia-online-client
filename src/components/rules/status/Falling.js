import Rule from '../../classes/Rule'


const Falling = new Rule({
	name: `Falling`, 
	desc: [
		`1 Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Location.`,
		`Multiple points of Falling Damage on the same Location count as a single Wound.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
})

export default Falling