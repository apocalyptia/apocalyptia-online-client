import Rule from 'rules/Rule.js'

const FireDamage = new Rule({
	id: `0de26712-9508-40af-262e-b368e9550fa1`,
	name: `Fire Damage`, 
	desc: [
		`Each round you take Fire Damage, 1 point is permanent and never heals.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
})

export default FireDamage