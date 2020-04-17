import Rule from '../classes/Rule'


export const Bleeding = new Rule({
	name: `Bleeding`, 
	desc: [
		`Whenever you get a new Wound, you begin taking an additional 1 Damage per minute to the Torso.`,
		`Bleeding Damage can only heal from natural Recovery or from a blood donation using a Transfusion Kit.`,
		`Roll Medicine(First-Aid) vs Damage to stop a Wound from Bleeding.`,
	]
})

export const Blind = new Rule({
	name: `Blind`, 
	desc: [
		`You are considered to be Defenseless.`,
		`You automatically Fail any Perception roll that involves seeing.`,
		`You have a -6 penalty to all other rolls that involve seeing.`,
		`This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
})

export const Burning = new Rule({
	name: `Burning`, 
	desc: [
		`1 Fire Damage per round.`,
		`It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
})

export const Concealed = new Rule({
	name: `Concealed`, 
	desc: [
		`If an opponent cannot see you, they are considered to be Blind to you.`,
		`Any Attack they make targeting you is at a -6 penalty.`,
		`Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover.`,
		`Targets are Defenseless against Attacks from Concealed opponents.`,
	]
})

export const Deaf = new Rule({
	name: `Deaf`,
	desc: [
		`You automatically Fail any roll that involves hearing.`
	]
})

export const Defenseless = new Rule({
	name: `Defenseless`, 
	desc: [
		`You must use a Reflexive Defense.`,
		`Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
	]
})

export const Falling = new Rule({
	name: `Falling`, 
	desc: [
		`1 Damage per 2yds.`,
		`Each point of Falling Damage is inflicted on a random Location.`,
		`Multiple points of Falling Damage on the same Location count as a single Wound.`,
		`Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
})

export const Grabbed = new Rule({
	name: `Grabbed`,
	desc: [
		`A Grabbed opponent is considered to be Immobilized.`,
	]
})

export const Harmless = new Rule({
	name: `Harmless`,
	desc: [
		`You cannot Attack.`,
	]
})

export const Immobilized = new Rule({
	name: `Immobilized`,
	desc: [
		`Your Speed is temporarily considered to be 0.`
	]
})

export const OffHand = new Rule({
	name: `Off-Hand`, 
	desc: [
		`-3 penalty to Attack with your Off-Hand.`,
	]
})

export const Pinned = new Rule({
	name: `Pinned`,
	desc: [
		`Pinned is the third and final step of Grappling.`,
		`While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone.`,
		`The Attacker is also considered to be Immobilized and Prone.`,
	]
})

export const Prone = new Rule({
	name: `Prone`, 
	desc: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action.`,
		`Standing up takes 1 Action.`,
		`The benefits of being Prone are that you get +3 Ranged and +3 Stealth, and attackers take a -3 Ranged penalty to hit you.`,
		`The drawbacks of being Prone are that your Speed drops to 1yrd and attackers get a +3 Melee bonus to hit you.`,
	]
})

export const Restrained = new Rule({
	name: `Restrained`,
	desc: [
		`Restrained is the second step of Grappling.`,
		`While Restrained, you are considered to be Harmless and Immobilized.`,
	]
})

export const Stun = new Rule({
	name: `Stun`, 
	desc: [
		`Defenseless, Harmless, and Immobilized.`,
		`You fall Prone if Stunned for longer than 1 round.`,
	]
})

export const Unarmed = new Rule({
	name: `Unarmed`, 
	desc: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2] (always round down).`,
		`Damage Resistance is not depleted.`,
	]
})

export const Unconscious = new Rule({
	name: `Unconscious`, 
	desc: [
		`Unaware and unable to do anything.`,
		`You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`,
	]
})

export const Unstable = new Rule({
	name: `Unstable`, 
	desc: [
		`-3 penalty to Agility or Constitution Skill rolls.`,
		`Ranged Attacks targeting you take a -3 penalty.`,
	]
})


export default {
	name: `Status`,
	list: [
		Bleeding,
		Blind,
		Burning,
		Concealed,
		Deaf,
		Defenseless,
		Falling,
		Grabbed,
		Harmless,
		Immobilized,
		OffHand,
		Pinned,
		Prone,
		Restrained,
		Stun,
		Unarmed,
		Unconscious,
		Unstable,
	]
}