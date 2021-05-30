import Rule from '../../classes/Rule.js'

const Radiation = new Rule({
	name: `Radiation`,
	desc: [
		`Permanently reduces Constitution by 1 per year, month, week, day, hour, or minute depending on dosage.`,
		`Each lost point of Constitution also counts as a permanent Pain penalty.`,
		`You die when Constitution drops to 0.`
	],
	type: `Hazard`
})

export default Radiation
