import Rule from '../../rules/Rule'


const DamageResistance = new Rule({
	name: `Damage Resistance`, 
	desc: [
		`Armor's Damage Resistance reduces the Damage inflicted by any individual Attack on that Body Part.`,
		`Reduce a piece of Armor's Damage Resistance by 1 after taking Damage that exceeds its Damage Resistance.`,
	]
})

export default DamageResistance