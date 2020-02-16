import WeaponAttribute from '../../../classes/WeaponAttribute'
import { Unarmed } from '../../Situations'


export const OneHanded = new WeaponAttribute({
	name: '1h',
	description: [
		'Used one-handed. +1 Ranged Attack if used with both hands.',
	]
})

export const TwoHanded = new WeaponAttribute({
	name: '2h',
	description: [
		'Used two-handed. Penalty = [Sz] if used one-handed.',
	]
})

export const Auto = new WeaponAttribute({
	name: 'Auto',
	description: [
		'[+3 Ranged Attack vs one target] or 3yd Blast. Uses 10 bullets.',
	]
})

export const Blast = new WeaponAttribute({
	name: 'Blast',
	description: [
		'[d6 vs Reflexive Dodge] in radius. [Damage / 2] on a miss (minimum 1).',
	]
})

export const Blunt = new WeaponAttribute({
	name: 'Blunt',
	description: [
		'Does not cause Bleeding.',
	]
})

export const Chop = new WeaponAttribute({
	name: 'Chop',
	description: [
		'+1 Damage to Locations with no Armor.',
	]
})

export const FireDamage = new WeaponAttribute({
	name: 'Fire Damage',
	description: [
		'Fire Damage. Fire Damage can only be prevented with FR Armor.',
	]
})

export const Pierce = new WeaponAttribute({
	name: 'Pierce',
	description: [
		'+1 Damage to Locations with Armor.',
	]
})

export const Rapid = new WeaponAttribute({
	name: 'Rapid',
	description: [
		'2 AttackS for 1 Action.',
	]
})

export const Sawnoff = new WeaponAttribute({
	name: 'Sawn-off',
	description: [
		'[Range / 2] and -1 Size.',
	]
})

export const Scatter = new WeaponAttribute({
	name: 'Scatter',
	description: [
		'Ignore Range penalties. -1 Damage per extended Range.',
	]
})

export const Shield = new WeaponAttribute({
	name: 'Shield',
	description: [
		'Provides 3DR Cover. +3 to Block.',
	]
})

export const Slow = new WeaponAttribute({
	name: 'Slow',
	description: [
		'Penalty to Speed = Size.',
	]
})


export default [
	OneHanded,
	TwoHanded,
	Auto,
	Blast,
	Blunt,
	Chop,
	FireDamage,
	Pierce,
	Rapid,
	Shield,
	Sawnoff,
	Scatter,
	Slow,
	Unarmed,
]