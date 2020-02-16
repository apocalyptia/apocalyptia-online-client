import ArmorAttribute from '../../../classes/ArmorAttribute'


export const Camo = new ArmorAttribute({
	name: 'Camo',
	description: [
		'+1 Stealth per Location when in a given Biome.',
	]
})

export const CR = new ArmorAttribute({
	name: 'CR',
	description: [
		'Delay Hypothermia for 1hr per Location.',
	]
})

export const FireResistance = new ArmorAttribute({
	name: 'Fire Resistance',
	description: [
		'Armor Damage Resistance reduces Fire Damage.',
	]
})

export const Impermeable = new ArmorAttribute({
	name: 'Impermeable',
	description: [
		'Automatic Success to resist exposure to Diseases and Toxins.',
	]
})

export const Mask = new ArmorAttribute({
	name: 'Mask',
	description: [
		'Obscures identity and protects face. -1 Perception.',
	]
})


export default [
	Camo,
	CR,
	FireResistance,
	Impermeable,
	Mask,
]