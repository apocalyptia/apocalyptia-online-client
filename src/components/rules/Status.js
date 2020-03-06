import Rule from '../classes/Rule'

export const Bleeding = new Rule({
	name: `Bleeding`, 
	description: [
		`When you take Wounds = [Constitution] or more, you begin taking an additional 1 Wound per minute. When you take Wounds = [Constitution x 2], the rate of Bleeding increases to 1 Wound per round. Roll Medicine(First-Aid) vs Wounds to stop Bleeding.`,
	]
})

export const Blind = new Rule({
	name: `Blind`, 
	description: [
		`You are considered to be Defenseless. You automatically Fail any Perception roll that involves seeing. You have a -6 penalty to all other rolls that involve seeing. This includes Attacks, in which case all opponents are considered to be Concealed from you.`,
	]
})

export const Burning = new Rule({
	name: `Burning`, 
	description: [
		`1 Fire Damage per round. It takes a d6 rounds to stop, drop Prone, and roll Survival 6# to put out the flames.`,
	]
})

export const Concealed = new Rule({
	name: `Concealed`, 
	description: [
		`If an opponent knows your position but cannot see you, they are considered to be Blind to you. This means that their Attack is at a -6 penalty. Blasts are unaffected by this penalty, though Blast Damage may be negated or reduced if the Concealment is due to Cover. Targets are Defenseless against Attacks from Concealed opponents.`,
	]
})

export const Deaf = new Rule({
	name: `Deaf`,
	description: [
		`You automatically Fail any roll that involves hearing.`
	]
})

export const Defenseless = new Rule({
	name: `Defenseless`, 
	description: [
		`You must use a Reflexive Defense. Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`,
	]
})

export const Dehydration = new Rule({
	name: `Dehydration`, 
	description: [
		`People need 1 Water per day. 1 Pain per day without Water. This penalty is reduced by 1 per day with Water. Going without Water for a number of days = [Constitution] is lethal.`,
	]
})

export const Exhaustion = new Rule({
	name: `Exhaustion`, 
	description: [
		`People need 8 hours of sleep per day. 1 Pain per day without sufficient sleep. Go unconscious for 8 hours after days = [Constitution] without sleep. Penalties go away after 8 hours of sleep.`,
	]
})

export const Falling = new Rule({
	name: `Falling`, 
	description: [
		`1 Wound per 2yds. Roll [Acrobatics # = yds] as a Defense Action to halve Falling Damage.`,
	]
})

export const Grabbed = new Rule({
	name: `Grabbed`,
	description: [
		`A Grabbed opponent is considered to be Immobilized.`,
	]
})

export const Harmless = new Rule({
	name: `Harmless`,
	description: [
		`You cannot Attack.`,
	]
})

export const Hypothermia = new Rule({
	name: `Hypothermia`, 
	description: [
		`People need warmth to stay alive. 1 Pain per hour of Hypothermia.  Reduce penalty by 1 per hour of warmth. Hypothermia for hours = [Constitution] is lethal.`,
	]
})

export const Immobilized = new Rule({
	name: `Immobilized`,
	description: [
		`Your Speed is temporarily considered to be 0.`
	]
})

export const OffHand = new Rule({
	name: `Off-Hand`, 
	description: [
		`-3 penalty to Attack with your Off-Hand.`,
	]
})

export const Pinned = new Rule({
	name: `Pinned`,
	description: [
		`Pinned is the third and final step of Grappling. While Pinned, you are considered to be Defenseless, Harmless, Immobilized, and Prone. The Attacker is also considered to be Immobilized and Prone.`,
	]
})

export const Prone = new Rule({
	name: `Prone`, 
	description: [
		`You may drop Prone at any time for free on your turn or as part of a Dodge action. Standing up takes 1 Action.`,
		`The benefits of being Prone are that you get +3 Ranged and +3 Stealth, and attackers take a -3 Ranged penalty to hit you.`,
		`The drawbacks of being Prone are that your Speed drops to 1yrd and attackers get a +3 Melee bonus to hit you.`,
	]
})

export const Restrained = new Rule({
	name: `Restrained`,
	description: [
		`Restrained is the second step of Grappling. While Restrained, you are considered to be Harmless and Immobilized.`,
	]
})

export const Starvation = new Rule({
	name: `Starvation`, 
	description: [
		`People need 1 Food per day. 1 Pain per week without Food. This penalty is reduced by 1 per day with Food. Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
})

export const Stun = new Rule({
	name: `Stun`, 
	description: [
		`Defenseless, Harmless, and Immobilized. You fall Prone if Stunned for longer than 1 round.`,
	]
})

export const Asphyxiation = new Rule({
	name: `Asphyxiation`, 
	description: [
		`People need constant air supply. 1 Pain per minute without air. This penalty is reduced by 1 per minute with air. Going without air for a number of minutes = [Constitution] is lethal.`,
	]
})

export const Unarmed = new Rule({
	name: `Unarmed`, 
	description: [
		`Successful Unarmed Attacks do Damage = [(Attack - Defense) / 2]. Always round down. Damage Resistance is not depleted.`,
	]
})

export const Unconscious = new Rule({
	name: `Unconscious`, 
	description: [
		`Unaware and unable to do anything. You are considered to be Blind, Harmless, Immobilized, Prone, and have a Reflexive Defense of 0.`,
	]
})

export const Unstable = new Rule({
	name: `Unstable`, 
	description: [
		`-3 penalty to Agility or Constitution Skill rolls. Ranged Attacks targeting you take a -3 penalty.`,
	]
})

export const Needs = new Rule({
	name: `Needs`, 
	description: [
		`1 Pain for each lacking Need over a given period of time:`,
	],
	subrules: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation
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
		Needs,
		OffHand,
		Pinned,
		Prone,
		Restrained,
		Stun,
		Unarmed,
		Unconscious,
		Unstable
	]
}