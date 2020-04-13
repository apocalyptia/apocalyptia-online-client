import WeaponAttribute from '../../../classes/gear/WeaponAttribute'
import { Unarmed } from '../../Status'


export const OneHanded = new WeaponAttribute({
	name: `1h`,
	description: [
		`Used one-handed.`,
	]
})

export const TwoHanded = new WeaponAttribute({
	name: `2h`,
	description: [
		`Must be used two-handed.`,
		`Can be used one-handed at a penalty = Size.`,
	]
})

export const Auto = new WeaponAttribute({
	name: `Auto`,
	description: [
		`Choose either Burst or Spray.`,
		`Burst: +3 Ranged Attack vs one target.`,
		`Spray: 3yd Blast Attack.`,
		`Uses 10 bullets.`,
	]
})

export const Blast = new WeaponAttribute({
	name: `Blast`,
	description: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
})

export const Blunt = new WeaponAttribute({
	name: `Blunt`,
	description: [
		`Does not cause Bleeding.`,
	]
})

export const Chop = new WeaponAttribute({
	name: `Chop`,
	description: [
		`+1 Damage to Locations with no Armor.`,
	]
})

export const FireDamage = new WeaponAttribute({
	name: `Fire Damage`,
	description: [
		`Fire Damage can only be prevented with Fire Resistant Armor.`,
	]
})

export const Pierce = new WeaponAttribute({
	name: `Pierce`,
	description: [
		`+1 Damage to Locations with Armor.`,
	]
})

export const Rapid = new WeaponAttribute({
	name: `Rapid`,
	description: [
		`2 Attacks for 1 Action.`,
	]
})

export const ShortBarrel = new WeaponAttribute({
	name: `Short-Barrel`,
	description: [
		`[Range / 2] and [Size / 2].`,
	]
})

export const Scatter = new WeaponAttribute({
	name: `Scatter`,
	description: [
		`Ignore Range penalties.`,
		`-1 Damage per extended Range.`,
	]
})

export const Shield = new WeaponAttribute({
	name: `Shield`,
	description: [
		`Provides 3 Damage Resistance Cover.`,
		`+3 to Block.`,
	]
})

export const Slow = new WeaponAttribute({
	name: `Slow`,
	description: [
		`Penalty to Speed = Size.`,
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
	Scatter,
	ShortBarrel,
	Slow,
	Unarmed,
]