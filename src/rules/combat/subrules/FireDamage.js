import Rule from '/src/classes/Rule.js'

const FireDamage = new Rule({
	name: `Fire Damage`, 
	desc: [
		`Each round you take Fire Damage, 1 point is permanent and never heals.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
})

export default FireDamage