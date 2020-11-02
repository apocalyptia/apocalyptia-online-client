import Rule from 'classes/Rule.js'

const DamageResistance = new Rule({
	name: `Damage Resistance`, 
	desc: [
		`Damage Resistance reduces the Damage inflicted to any Body Part the Armor covers.`,
		`Armor loses 1 level of Damage Resistance each time it takes Damage that exceeds it's Damage Resistance.`,
	]
})

export default DamageResistance