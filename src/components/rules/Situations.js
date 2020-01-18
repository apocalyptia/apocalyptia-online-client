import Rule from './Rule'
import CoverTable from './tables/CoverTable.svelte'


export const Bleeding = new Rule({
	name: `Bleeding`, 
	description: [
		`When you take Wounds = [C] or more, you begin taking an additional 1 Wound per minute. When you take Wounds = [Cx2], the rate of Bleeding increases to 1 Wound per rnd. Roll Medicine(First-Aid) vs Wounds to stop Bleeding.`
	]
})

export const Blind = new Rule({
	name: `Blind`, 
	description: [
		`-6 to sight-based rolls, including ATK and DEF.`
	]
})

export const Burning = new Rule({
	name: `Burning`, 
	description: [
		`1 FDMG per rnd. It takes a d6rnds to stop, drop Prone, and roll Survival 6# to put out the flames.`
	]
})

export const Chase = new Rule({
	name: `Chase`, 
	description: [
		`Roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Speed] each rnd. Chase ends when one side gets 3 Successes over the other.`
	]
})

export const Concealed = new Rule({
	name: `Concealed`, 
	description: [
		`If an opponent knows your position but cannot see you, their ATK is at a -6 penalty. Blasts are unaffected. Targets are Defenseless against ATKs from Concealed opponents.`
	]
})

export const Cover = new Rule({
	name: `Cover`, 
	description: [
		`You can lean in and out of Cover to ATK as part of an Action. All Cover except Glass makes you Concealed. If an opponent holds a Prepared Attack until you lean out of Cover, they must make a Called Shot to hit an exposed Location. All DMG is negated against targets that are behind Cover if the Material DR is >= the weapon’s base DMG. If weapon DMG exceeds the Material DR, the Material DR acts as an Armor bonus for DMG reduction.`
	],
	table: CoverTable
})

export const Defenseless = new Rule({
	name: `Defenseless`, 
	description: [
		`You must use a Reflexive Defense. Use your Block score against Melee Attacks and you Dodge score against Ranged Attacks.`
	]
})

export const Dehydration = new Rule({
	name: `Dehydration`, 
	description: [
		`People need 1 Water per day. 1 Pain per day without Water. This penalty is reduced by 1 per day with Water. Going without Water for a number of days = [C] is lethal.`
	]
})

export const Exhaustion = new Rule({
	name: `Exhaustion`, 
	description: [
		`People need 8 hours of sleep per day. 1 Pain per day without sufficient sleep. Go unconscious for 8 hours after days = [C] without sleep. Penalties go away after 8 hours of sleep.`
	]
})

export const Falling = new Rule({
	name: `Falling`, 
	description: [
		`1 Wound per 2yds. Roll [Acrobatics # = yds] as a Defense Action to halve Falling DMG.`
	]
})

export const FriendlyFire = new Rule({
	name: `Friendly Fire`, 
	description: [
		`-3 RATK against targets within 1yd of your ally. If the RATK Fails, re-roll the RATK vs the ally’s Reflexive Dodge.`
	]
})

export const Hypothermia = new Rule({
	name: `Hypothermia`, 
	description: [
		`People need warmth to stay alive. 1 Pain per hour of Hypothermia.  Reduce penalty by 1 per hour of warmth. Hypothermia for hours = [C] is lethal.`
	]
})

export const OffHand = new Rule({
	name: `Off-Hand`, 
	description: [
		`-3 penalty to ATK with your Off-Hand.`
	]
})

export const Prone = new Rule({
	name: `Prone`, 
	description: [
		`You may drop Prone as part of your Movement. Standing up costs 1AP. +1 RATK. +3 Stealth. Speed 1yd.`
	]
})

export const Range = new Rule({
	name: `Range`, 
	description: [
		`RATKs take a -1 penalty per additional RNG increment. MATKs take a modifier against Melee weapons that have a different RNG = [your weapon’s RNG - enemy weapon’s RNG].`
	]
})

export const Starvation = new Rule({
	name: `Starvation`, 
	description: [
		`People need 1 Food per day. 1 Pain per week without Food. This penalty is reduced by 1 per day with Food. Going without Food for a number of weeks = [C] is lethal.`
	]
})

export const Stun = new Rule({
	name: `Stun`, 
	description: [
		`Defenseless and cannot take Actions. Prone if [Stunned > 1rnd].`
	]
})

export const Suffocation = new Rule({
	name: `Suffocation`, 
	description: [
		`People need constant air supply. 1 Pain per minute without air. This penalty is reduced by 1 per minute with air. Going without air for a number of minutes = [C] is lethal.`
	]
})

export const Unarmed = new Rule({
	name: `Unarmed`, 
	description: [
		`Successful Unarmed ATKs do DMG = [(ATK - DEF) / 2]. Always round down. DR is not depleted.`
	]
})

export const Unconscious = new Rule({
	name: `Unconscious`, 
	description: [
		`Unaware and unable to take Actions. 0 DEF. Prone.`
	]
})

export const Unstable = new Rule({
	name: `Unstable`, 
	description: [
		`-3 penalty to physical rolls. -3 to RATKs at or from you.`
	]
})

export const Visibility = new Rule({
	name: `Visibility`, 
	description: [
		`-1 to -6 (Blind) to sight-based rolls, including ATK and DEF.`
	]
})


export const Needs = new Rule({
	name: `Needs`, 
	description: [
		`1 Pain for each lacking Need over a given period of time:`
	],
	subrules: [
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
		Suffocation
	]
})


export const Situations = [
	Bleeding,
	Blind,
	Burning,
	Chase,
	Concealed,
	Cover,
	Defenseless,
	Falling,
	FriendlyFire,
	Needs,
	OffHand,
	Prone,
	Range,
	Stun,
	Unarmed,
	Unconscious,
	Unstable,
	Visibility
]