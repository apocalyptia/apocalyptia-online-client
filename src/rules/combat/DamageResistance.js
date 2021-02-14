import Rule from 'classes/Rule.js'

const DamageResistance = new Rule({
	name: `Damage Resistance`, 
	desc: [
		`Every piece of Armor offers some amount of Damage Resistance`,
		`That Damage Resistance reduces the amount of Damage inflicted on any Body Part that piece of Armor is worn upon.`,
		`Armor loses 1 point of Damage Resistance each time it takes Damage that exceeds it's current Damage Resistance.`,
	]
})

export default DamageResistance