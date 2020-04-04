import Maneuver from '../../classes/Maneuver'
import { acrobatics, melee } from '../Skills'


export const Block = new Maneuver({
	category: `Defensive`,
	name: melee.specialties.block.name, 
	description: melee.specialties.block.description
})

export const Dodge = new Maneuver({
	category: `Defensive`,
	name: acrobatics.specialties.dodge.name, 
	description: acrobatics.specialties.dodge.description
})

export const Duck = new Maneuver({
	category: `Defensive`,
	name: `Duck`, 
	description: [
		`You may roll [Dodge vs Attack] to move up to your Speed to get behind Cover.`,
		`This is the only way to Dodge a Ranged(Shoot) Attack.`,
		`As part of this Dodge, you may elect to go Prone.`,
		`If the Attack still hits, the Cover Material’s Damage Resistance reduces the Damage.`,
		`You will keep the benefits of Cover as long as it remains between you and the opponent.`,
	]
})

export const Hide = new Maneuver({
	category: `Defensive`,
	name: `Hide`, 
	description: [
		`Roll [Stealth vs Perception] to be Concealed.`,
		`Your Speed is 0.`,
		`+3 Stealth if Prone.`,
	]
})

export const Protect = new Maneuver({
	category: `Defensive`,
	name: `Protect`, 
	description: [
		`You become the new target of all Attacks targeting someone you choose within 1yd of you for 1 round.`,
		`You may still Block, but you cannot Dodge the Attack.`,
		// How does this work with Reflexive Defenses?
	]
})

export const Sneak = new Maneuver({
	category: `Defensive`,
	name: `Sneak`, 
	description: [
		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
	]
})




export default [
	Block,
	Dodge,
	Duck,
	Hide,
	Protect,
	Sneak
]