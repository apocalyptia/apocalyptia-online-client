import Rule from './Rule'
import { Bleeding } from './Situations'


// Single Rules

export const Attack = new Rule(
	`Attack`, 
	[`There are MATKs (Melee) and RATKs (Ranged). Roll [d6 + MATK or RATK] vs Defense (DEF). Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`]
)

export const Burning = new Rule(
	`Burning`, 
	[`If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`]
)

export const Communication = new Rule(
	`Communication`, 
	[`You can speak or shout up to 6 words per round.`]
)

export const Conditions = new Rule(
	`Conditions`, 
	[`-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`]
)

export const DamageReduction = new Rule(
	`Damage Reduction`, 
	[`DR reduces DMG. Armor is reduced by -1 DR after taking DMG that exceeds its DR.`]
)

export const FireDamage = new Rule(
	`Fire Damage`, 
	[`Whenever you take FDMG, 1 Wound is permanent. Only Fire-Resistant (FR) Armor reduces FDMG.`]
)

export const Initiative = new Rule(
	`Initiative`, 
	[`Everyone in combat rolls [d6 + A] to determine the turn order at the start of each new rnd.`]
)

export const Movement = new Rule(
	`Movement`, 
	[`Spend 1 Action to move up to your Speed [A + C], or 2 Actions to Run up to [Speed x 3]. Spend 1 Action to go Prone or stand.`]
)

export const Occupants = new Rule(
	`Occupants`, 
	[`Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`]
)

export const Pain = new Rule(
	`Pain`, 
	[`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if [Pain > D].`]
)

export const Pedestrians = new Rule(
	`Pedestrians`, 
	[`Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`]
)

export const Prepare = new Rule(
	`Prepare`, 
	[`You may spend 1 Action on your turn to declare and hold a specific Action to occur on a later turn to preempt a triggering event that you describe. Prepared Actions resolve before other Actions in the order that they are triggered. You may choose to abandon a Prepared Action at any time. If you are still waiting with a Prepared Action on your next turn, you can continue holding that Prepared Action.`]
)

export const Recovery = new Rule(
	`Recovery`, 
	[`After a day of rest, roll [C vs total Wounds] to heal 1HP. On a Fail, take 1 Wound from infection.`]
)

export const Reflex = new Rule(
	`Reflex`, 
	[`[Perception / 2]. This is your default DEF. Reflex is never rolled. It is a static Difficulty for enemy ATKs.`]
)

export const Rounds = new Rule(
	`Rounds`, 
	[`Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn each rnd.`]
)

export const Tires = new Rule(
	`Tires`, 
	[`Roll [-3 ATK vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`]
)

export const Wreck = new Rule(
	`Wreck`, 
	[`The vehicle comes to a violent stop suddenly this rnd. Occupants take [d6 DMG per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the DMG is halved and they remain in their seats.`]
)


// Compound Rules

export const Actions = new Rule(
	`Actions`, 
	[`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`], 
	[Prepare]
)

export const Damage = new Rule(
	`Damage`, 
	[`Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`],
	[DamageReduction, FireDamage, Pain]
)

export const Defense = new Rule(
	`Defense`, 
	[`You get 2 Defense Actions per round that you may spend to roll on your enemy's turn to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging, or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must use Reflex for DEF.`], 
	[Reflex]
)

export const Health = new Rule(
	`Health`, 
	[`[C x 2]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding when you take Wounds = [Health / 2] and you die when you take Wounds = Health.`],
	[Bleeding, Recovery]
)

export const Vehicles = new Rule(
	`Vehicles`, 
	[`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`],
	[Conditions, Occupants, Pedestrians, Tires, Wreck, Burning]
)


// Rule List

export const Combat = [
	Rounds,
	Initiative,
	Actions,
	Communication,
	Movement,
	Attack,
	Defense,
	Health,
	Damage,
	Vehicles
]