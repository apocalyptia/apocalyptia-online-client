import ArmorAttr from '../../../classes/gear/attributes/ArmorAttr'


export const Camo = new ArmorAttr({
	name: `Camo`,
	desc: [
		`+1 Stealth per Location when in a given Biome.`,
	]
})

export const ColdResistance = new ArmorAttr({
	name: `Cold Resistance`,
	desc: [
		`Delay Hypothermia for 1hr per Location.`,
	]
})

export const FireResistance = new ArmorAttr({
	name: `Fire Resistance`,
	desc: [
		`Armor Damage Resistance reduces Fire Damage.`,
	]
})

export const Impermeable = new ArmorAttr({
	name: `Impermeable`,
	desc: [
		`Automatic Success to resist exposure to Diseases and Toxins.`,
	]
})

export const Mask = new ArmorAttr({
	name: `Mask`,
	desc: [
		`Obscures identity and protects face. -1 Perception.`,
	]
})


export default [
	Camo,
	ColdResistance,
	FireResistance,
	Impermeable,
	Mask,
]