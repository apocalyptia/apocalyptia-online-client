import Rule from '../../rules/Rule'


const FireDamage = new Rule({
	name: `Fire Damage`, 
	desc: [
		`1 point of Fire Damage is always permanent.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
})

export default FireDamage