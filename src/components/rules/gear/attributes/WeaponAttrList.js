import WeaponAttr from '../../../classes/gear/attributes/WeaponAttr'
import { Unarmed } from '../../Status'


export const OneHanded = new WeaponAttr({
	name: `1h`,
	desc: [
		`Used one-handed.`,
	]
})

export const TwoHanded = new WeaponAttr({
	name: `2h`,
	desc: [
		`Must be used two-handed.`,
		`Can be used one-handed at a penalty = Size.`,
	]
})

export const Auto = new WeaponAttr({
	name: `Auto`,
	desc: [
		`Choose either Burst or Spray.`,
		`Burst: +3 Ranged Attack vs one target.`,
		`Spray: 3yd Blast Attack.`,
		`Uses 10 bullets.`,
	]
})

export const Blast = new WeaponAttr({
	name: `Blast`,
	desc: [
		`Roll [d6 vs Reflexive Dodge] against everyone in the Blast radius.`,
		`[Damage / 2] on a miss (minimum 1).`,
	]
})

export const Blunt = new WeaponAttr({
	name: `Blunt`,
	desc: [
		`Does not cause Bleeding.`,
	]
})

export const Chop = new WeaponAttr({
	name: `Chop`,
	desc: [
		`+1 Damage to Locations with no Armor.`,
	]
})

export const FireDamage = new WeaponAttr({
	name: `Fire Damage`,
	desc: [
		`Fire Damage can only be prevented with Fire Resistant Armor.`,
	]
})

export const Pierce = new WeaponAttr({
	name: `Pierce`,
	desc: [
		`+1 Damage to Locations with Armor.`,
	]
})

export const Rapid = new WeaponAttr({
	name: `Rapid`,
	desc: [
		`2 Attacks for 1 Action.`,
	]
})

export const ShortBarrel = new WeaponAttr({
	name: `Short-Barrel`,
	desc: [
		`[Range / 2] and [Size / 2].`,
	]
})

export const Scatter = new WeaponAttr({
	name: `Scatter`,
	desc: [
		`Ignore Range penalties.`,
		`-1 Damage per extended Range.`,
	]
})

export const Shield = new WeaponAttr({
	name: `Shield`,
	desc: [
		`Provides 3 Damage Resistance Cover.`,
		`+3 to Block.`,
	]
})

export const Slow = new WeaponAttr({
	name: `Slow`,
	desc: [
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