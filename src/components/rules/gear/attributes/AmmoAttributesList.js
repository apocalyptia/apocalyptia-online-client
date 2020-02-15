import AmmoAttribute from '../../../classes/AmmoAttribute'


export const ArmorPiercing = new AmmoAttribute({
	name: 'Armor Piercing',
	description: [
		'Pierce.',
	],
	calibers: [
		'5.56',
		'.308',
	]
})

export const Broadhead = new AmmoAttribute({
	name: 'Broadhead',
	description: [
		'+1 Damage. Pierce',
	],
	calibers: [
		'Arrow',
	]
})

export const Buckshot = new AmmoAttribute({
	name: 'Buckshot',
	description: [
		'Scatter.',
	],
	calibers: [
		'12g',
	]
})

export const HollowPoint = new AmmoAttribute({
	name: 'Hollow Point',
	description: [
		'+1 Damage.',
	],
	calibers: [
		'.22',
		'9mm',
		'.357',
		'5.56',
		'.308',
		'12g',
	]
})

export const Match = new AmmoAttribute({
	name: 'Match',
	description: [
		'+1 Ranged Attack.',
	],
	calibers: [
		'.22',
		'9mm',
		'.357',
		'5.56',
		'.308',
	]
})

export const Slug = new AmmoAttribute({
	name: 'Slug',
	description: [
		'RNG x2.',
	],
	calibers: [
		'12g',
	]
})


export default [
	ArmorPiercing,
	Broadhead,
	Buckshot,
	HollowPoint,
	Match,
	Slug,
]