import Rule from '../../rules/Rule'


const DamageResistance = new Rule({
	id: `c5d2503f-cc78-45c6-3b23-02f4f37d54b9`,
	name: `Damage Resistance`, 
	desc: [
		`Armor's Damage Resistance reduces the Damage inflicted by any individual Attack on that Body Part.`,
		`Reduce a piece of Armor's Damage Resistance by 1 after taking Damage that exceeds its Damage Resistance.`,
	]
})

export default DamageResistance