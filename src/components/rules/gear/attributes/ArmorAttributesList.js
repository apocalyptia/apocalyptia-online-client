import ArmorAttribute from '../../../classes/ArmorAttribute'


export const Camo = new ArmorAttribute({
	name: 'Camo',
	description: [
		'+1 Stealth per Location when in a given Biome.'
	]
})

export const CR = new ArmorAttribute({
	name: 'CR',
	description: [
		'Delay Hypothermia for 1hr per Location.'
	]
})

export const FR = new ArmorAttribute({
	name: 'FR',
	description: [
		'Armor DR reduces FDMG.'
	]
})

export const Impermeable = new ArmorAttribute({
	name: 'Impermeable',
	description: [
		'Automatic Success to resist exposure to Diseases and Toxins.'
	]
})

export const Mask = new ArmorAttribute({
	name: 'Mask',
	description: [
		'Obscures identity and protects face. -1 Perception.'
	]
})


const ArmorAttributesList = [
	Camo,
	CR,
	FR,
	Impermeable,
	Mask
]

export default ArmorAttributesList