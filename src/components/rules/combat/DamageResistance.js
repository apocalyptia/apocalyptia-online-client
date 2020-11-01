import Rule from 'classes/Rule.js'

const DamageResistance = new Rule({
	id: `c5d2503f-cc78-45c6-3b23-02f4f37d54b9`,
	name: `Damage Resistance`, 
	desc: [
		`Damage Resistance reduces the Damage inflicted to any Body Part the Armor covers.`,
		`Armor loses 1 level of Damage Resistance each time it takes Damage that exceeds it's Damage Resistance.`,
	]
})

export default DamageResistance