import Rule from './Rule'
import CoverTable from './CoverTable.svelte'


export const Bleeding = new Rule(
	`Bleeding`, 
	`When you take Wounds = [Health / 2] or more, you begin taking an additional 1 Wound per minute. Roll Medicine(First-Aid) vs Wounds to stop Bleeding.`
)

export const Burning = new Rule(
	`Burning`, 
	`1 FDMG per rnd. It takes a d6rnds to stop, drop Prone, and roll Survival 6# to put out the flames.`
)

export const Chase = new Rule(
	`Chase`, 
	`Roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Speed] each rnd. Chase ends when one side gets 3 Successes over the other.`
)

export const Concealed = new Rule(
	`Concealed`, 
	`If an opponent knows your position but cannot see you, their ATK is at a -6 penalty. Blasts are unaffected. Targets are Defenseless against ATKs from Concealed opponents.`
)

export const Cover = new Rule(
	`Cover`, 
	`You can lean in and out of Cover to ATK as part of an Action. All Cover except Glass makes you Concealed. If an opponent Waits until you lean out of Cover, they must make a Called Shot to hit an exposed Location. All DMG is negated against targets that are behind Cover if the Material DR is >= the weapon’s base DMG. If weapon DMG exceeds the Material DR, the Material DR acts as an Armor bonus for DMG reduction.`,
	[],
	CoverTable
)

export const Defenseless = new Rule(
	`Defenseless`, 
	`Use Reflex [Perception / 2] for DEF.`
)

export const Dehydration = new Rule(
	`Dehydration`, 
	`People need 1 Water per day. 1 Pain per day without Water. This penalty is reduced by 1 per day with Water. Going without Water for a number of days = C is lethal.`
)

export const Exhaustion = new Rule(
	`Exhaustion`, 
	`People need 8 hours of sleep per day. 1 Pain per day without sufficient sleep. Go unconscious for 8 hours after days = C without sleep. Penalties go away after 8 hours of sleep.`
)

export const Falling = new Rule(
	`Falling`, 
	`1DMG per 2yds. Roll [Acrobatics # = yds] to halve Falling DMG.`
)

export const FriendlyFire = new Rule(
	`Friendly Fire`, 
	`-3 RATK against targets within 1yd of your ally. If the RATK Fails, re-roll the RATK vs the ally’s Reflex.`
)

export const Hypothermia = new Rule(
	`Hypothermia`, 
	`People need warmth to stay alive. 1 Pain per hour of Hypothermia.  Reduce penalty by 1 per hour of warmth. Hypothermia for hours = C is lethal.`
)

export const OffHand = new Rule(
	`Off-Hand`, 
	`-3 penalty to ATK with your Off-Hand.`
)

export const Prone = new Rule(
	`Prone`, 
	`You may drop Prone as part of your Movement. Standing up costs 1AP. +1 RATK. +3 Stealth. Speed 1yd.`
)

export const Range = new Rule(
	`Range`, 
	`RATKs take a -1 penalty per additional RNG increment. MATKs take a modifier against Melee weapons that have a different RNG = [your weapon’s RNG - enemy weapon’s RNG].`
)

export const Starvation = new Rule(
	`Starvation`, 
	`People need 1 Food per day. 1 Pain per week without Food. This penalty is reduced by 1 per day with Food. Going without Food for a number of weeks = C is lethal.`
)

export const Stun = new Rule(
	`Stun`, 
	`Defenseless and cannot take Actions. Prone if [Stunned > 1rnd].`
)

export const Suffocation = new Rule(
	`Suffocation`, 
	`People need constant air supply. 1 Pain per minute without air. This penalty is reduced by 1 per minute with air. Going without air for a number of minutes = C is lethal.`
)

export const Unarmed = new Rule(
	`Unarmed`, 
	`If the target is conscious, the target rolls C vs DMG to avoid being knocked Unconscious. If the target is Unconscious, the target takes DMG = Melee score. DR is not depleted.`
)

export const Unconscious = new Rule(
	`Unconscious`, 
	`Unaware and unable to take Actions. 0 DEF. Prone.`
)

export const Unstable = new Rule(
	`Unstable`, 
	`-3 penalty to physical rolls. -3 to RATKs at or from you.`
)

export const Visibility = new Rule(
	`Visibility`, 
	`-1 to -6 (Blind) to sight-based rolls, including ATK and DEF.`
)


export const Needs = new Rule(
	`Needs`, 
	`1 Pain for each lacking Need over a given period of time:`,
	[Dehydration, Exhaustion, Hypothermia, Starvation, Suffocation]
)


export const Situations = [
	Bleeding,
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