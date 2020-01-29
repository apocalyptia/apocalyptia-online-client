import Rule from './Rule'


// Single Rules

export const Actions = new Rule({
	name: `Actions`, 
	description: [
		`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`
	]
})

export const Attack = new Rule({
	name: `Attack`, 
	description: [
		`There are MATKs (Melee) and RATKs (Ranged). Roll [d6 + MATK or RATK] vs Defense (DEF). Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the ATK total. Deal bonus DMG = [ATK - DEF] up to your Melee or Ranged score.`
	]
})

export const Communication = new Rule({
	name: `Communication`, 
	description: [
		`You can speak or shout up to 6 words per round.`
	]
})

export const Defense = new Rule({
	name: `Defense`, 
	description: [
		`You get 2 Defense Actions per round that you may spend to roll on your enemy's turn to Block [d6 + Melee] or Dodge [d6 + Acrobatics]. A Botch means you fall Prone if Dodging, or drop your weapon if Blocking. If you are unaware or unable to avoid the Attack, you are Defenseless and must the appropriate Reflexive Defense.`,
		`There is one Reflexive form of each Defense Action. They are used as your default DEF, equal to your Acrobatics score (for Dodge) and your Melee score (for Block). They act as static Difficulties for enemy ATKs after you have already used your Defense Actions in that rnd. Use Reflexive Dodge against Ranged Attacks and Reflexive Block against Melee Attacks.`
	]
})

export const Movement = new Rule({
	name: `Movement`, 
	description: [
		`Spend 1 Action to Walk up to your Speed [A x 3]. You may divide up your movement around other Actions on your turn however you wish. You may spend 2 Actions to Run up to [Speed x 2]. Spend 1 Action to go Prone or stand.`
	]
})

export const Recovery = new Rule({
	name: `Recovery`, 
	description: [
		`After 3 days of rest, roll [C vs total Wounds] to heal 1 Wound and [D vs total Trauma] to heal 1 Trauma. On a Fail, you take 1 additional Wound or Trauma, depending on what you were rolling to Recover.`
	]
})

export const Rounds = new Rule({
	name: `Rounds`, 
	description: [
		`Combat time occurs in 3-second “rounds” (rnds). Each Player rolls [d6 + Speed] to determine the turn order at the start of each new rnd. This roll may Explode or Botch. On a Botch, you lose your turn. You may choose to delay your turn and go later in the rnd if you wish.`
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

export const Pain = new Rule({
	name: `Pain`, 
	description: [
		`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed. Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain.`
	]
})

export const Damage = new Rule({
	name: `Damage`, 
	description: [
		`Damage causes Wounds. You die when Wounds = Health. Successful ATKs do DMG = [(ATK - DEF) + Weapon DMG]. All Wounds cause Pain penalties.`
	],
	subrules: [
		DamageReduction,
		FireDamage,
		Pain
	]
})


// Vehicle Rules

export const Burning = new Rule({
	name: `Burning`, 
	description: [
		`If the Vehicle is at 0DR, it bursts into flames doing 1FDMG per rnd to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`
	]
})

export const Conditions = new Rule({
	name: `Conditions`, 
	description: [
		`-1 DR and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`
	]
})

export const Occupants = new Rule({
	name: `Occupants`, 
	description: [
		`Passengers in a moving vehicle are Unstable. A vehicle provides Cover from RATKs with its DR.`
	]
})

export const Pedestrians = new Rule({
	name: `Pedestrians`, 
	description: [
		`Hitting a pedestrian does DMG = [vehicle DR]. -1 DR after hitting pedestrians = [vehicle DR].`
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

const Combat = [
	Rounds,
	Actions,
	Communication,
	Movement,
	Attack,
	Defense,
	Damage,
	Recovery,
	Vehicles
]

export default Combat