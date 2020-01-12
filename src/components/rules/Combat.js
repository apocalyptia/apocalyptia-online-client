import Rule from './Rule'
import { Bleeding } from './Situations'


// Single Rules

export const Attack = new Rule({
	name: `Attack`, 
	description: [
		`There are MATKs (Melee) and RATKs (Ranged). Roll [d6 + MATK or RATK] vs Defense (DEF). Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`
	]
})

export const Burning = new Rule({
	name: `Burning`, 
	description: [
		`If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`
	]
})

export const Communication = new Rule({
	name: `Communication`, 
	description: [
		`You can speak or shout up to 6 words per round.`
	]
})

export const Conditions = new Rule({
	name: `Conditions`, 
	description: [
		`-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`
	]
})

export const DamageReduction = new Rule({
	name: `Damage Reduction`, 
	description: [
		`DR reduces DMG. Armor is reduced by -1 DR after taking DMG that exceeds its DR.`
	]
})

export const FireDamage = new Rule({
	name: `Fire Damage`, 
	description: [
		`Whenever you take FDMG, 1 Wound is permanent. Only Fire-Resistant (FR) Armor reduces FDMG.`
	]
})

export const Initiative = new Rule({
	name: `Initiative`, 
	description: [
		`Everyone in combat rolls [d6 + A] to determine the turn order at the start of each new rnd.`
	]
})

export const Movement = new Rule({
	name: `Movement`, 
	description: [
		`Spend 1 Action to move up to your Speed [A + C], or 2 Actions to Run up to [Speed x 3]. Spend 1 Action to go Prone or stand.`
	]
})

export const Occupants = new Rule({
	name: `Occupants`, 
	description: [
		`Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`
	]
})

export const Pain = new Rule({
	name: `Pain`, 
	description: [
		`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain. You go unconscious if [Pain > D].`
	]
})

export const Pedestrians = new Rule({
	name: `Pedestrians`, 
	description: [
		`Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`
	]
})

export const Prepare = new Rule({
	name: `Prepare`, 
	description: [
		`You may spend 1 Action on your turn to declare and hold a specific Action to occur on a later turn to preempt a triggering event that you describe. Prepared Actions resolve before other Actions in the order that they are triggered. You may choose to abandon a Prepared Action at any time. If you are still waiting with a Prepared Action on your next turn, you can continue holding that Prepared Action.`
	]
})

export const Recovery = new Rule({
	name: `Recovery`, 
	description: [
		`After 3 days of rest, roll [C vs total Wounds] to heal 1HP. On a Fail, take 1 Wound from infection.`
	]
})

export const ReflexiveDefense = new Rule({
	name: `Reflexive Defense`, 
	description: [
		`[Acrobatics or Melee]. There is one Reflexive form of each Defense Action. They are used as your default DEF, equal to your Acrobatics score (for Dodge) and your Melee score (for Block). They act as static Difficulties for enemy ATKs after you have already used your Defense Actions in that rnd. Use Reflexive Dodge against Ranged Attacks and Reflexive Block against Melee Attacks.`
	]
})

export const Rounds = new Rule({
	name: `Rounds`, 
	description: [
		`Combat time occurs in 3-second “rounds” (rnds). Each Player gets a turn each rnd.`
	]
})

export const Tires = new Rule({
	name: `Tires`, 
	description: [
		`Roll [-3 ATK vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck. If a front tire gets destroyed, the vehicle Wrecks automatically.`
	]
})

export const Wreck = new Rule({
	name: `Wreck`, 
	description: [
		`The vehicle comes to a violent stop suddenly this rnd. Occupants take [d6 DMG per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the DMG is halved and they remain in their seats.`
	]
})


// Compound Rules

export const Actions = new Rule({
	name: `Actions`, 
	description: [
		`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`
	], 
	subrules: [
		Prepare
	]
})

export const Damage = new Rule({
	name: `Damage`, 
	description: [
		`Damage causes Wounds, which could eventually kill you. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`
	],
	subrules: [
		DamageReduction,
		FireDamage,
		Pain
	]
})

export const Defense = new Rule({
	name: `Defense`, 
	description: [
		`You get 2 Defense Actions per round that you may spend to roll on your enemy's turn to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging, or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must the appropriate Reflexive Defense.`
	], 
	subrules: [
		ReflexiveDefense
	]
})

export const Health = new Rule({
	name: `Health`, 
	description: [
		`[C x 3]. This is a measure of how many Wounds you can withstand. Damage causes Wounds. You start Bleeding 1 Wound/min when you have Wounds = [C]. The rate of Bleeding increases to 1 Wound/rnd and you fall Unconscious when you have Wounds = [C x 2]. You die when you have Wounds = [C x 3].`
	],
	subrules: [
		Bleeding,
		Recovery
	]
})

export const Vehicles = new Rule({
	name: `Vehicles`, 
	description: [
		`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s DR <= winner’s DR], or if a vehicle takes [DMG > DR], the vehicle gets a Condition. 0 DR disables a vehicle. A Botch is a Wreck.`
	],
	subrules: [
		Conditions,
		Occupants,
		Pedestrians,
		Tires,
		Wreck,
		Burning
	]
})


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