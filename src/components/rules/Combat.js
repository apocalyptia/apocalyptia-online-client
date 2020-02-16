import Rule from '../classes/Rule'


// Single Rules

export const Actions = new Rule({
	name: `Actions`, 
	description: [
		`On your turn, you can take up to 2 Actions. Unless otherwise noted, all Skills take 1 Action.`,
	]
})

export const Attack = new Rule({
	name: `Attack`, 
	description: [
		`There are Melee Attacks and Ranged Attacks. Roll [d6 + Melee Attack or Ranged Attack] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`Deal bonus Damage = [Attack - Defense] up to your Melee or Ranged score.`,
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
		`You get 2 Defense Actions per round that you may spend to roll on your enemy's turn to Block [d6 + Melee] or Dodge [d6 + Acrobatics].`,
		`A Botch means you fall Prone if Dodging, or drop your weapon if Blocking.`,
		`If you are unaware or unable to avoid the Attack, you are Defenseless and must the appropriate Reflexive Defense.`,
		`There is one Reflexive form of each Defense Action which are used as your default Defense, equal to your Acrobatics score for Dodge and your Melee score for Block.`,
		`Reflexive Defenses act as static Difficulties for enemy Attacks after you have already used your Defense Actions in that round.`,
		`Use Reflexive Dodge against Ranged Attacks and Reflexive Block against Melee Attacks.`,
	]
})

export const Movement = new Rule({
	name: `Movement`, 
	description: [
		`It costs 1 Action to move up to your Speed [Agility x 3] on your turn. You may spend up to 2 of your Actions on Movement per turn.`,
		`You may divide up your movement around other Actions on your turn however you wish.`,
		`It costs 1 Action to stand up. You may go Prone at any time on your turn or as part of a Dodge for free.`,
	]
})

export const Recovery = new Rule({
	name: `Recovery`, 
	description: [
		`After 3 days of rest, roll [Constitution vs total Wounds] to heal 1 Wound, and [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Wound or Trauma, depending on what you were rolling to Recover.`,
	]
})

export const Rounds = new Rule({
	name: `Rounds`, 
	description: [
		`Combat time occurs in 3-second “rounds”. Each Player rolls [d6 + Speed] to determine the turn order at the start of each new round.`,
		`This Speed roll may Explode or Botch. On a Botch, you lose your turn.`,
	]
})

export const DamageResistance = new Rule({
	name: `Damage Resistance`, 
	description: [
		`Reduce the amount of Damage you take from any individual Attack by your Armor's Damage Resistance for that Location. Armor is reduced by -1 Damage Resistance after taking Damage that exceeds its Damage Resistance.`,
	]
})

export const FireDamage = new Rule({
	name: `Fire Damage`, 
	description: [
		`Whenever you take Fire Damage, 1 Wound is permanent. Only Fire-Resistant (FR) Armor reduces Fire Damage.`,
	]
})

export const Pain = new Rule({
	name: `Pain`, 
	description: [
		`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed.`,
		`Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain.`,
	]
})

export const Damage = new Rule({
	name: `Damage`, 
	description: [
		`Damage causes Wounds. You die when Wounds = Health. Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage]. All Wounds cause Pain penalties.`,
	],
	subrules: [
		DamageResistance,
		FireDamage,
		Pain
	]
})


// Vehicle Rules

export const Burning = new Rule({
	name: `Burning`, 
	description: [
		`If the Vehicle is at 0 Damage Resistance, it bursts into flames doing 1 Fire Damage per round to all Occupants. It continues to burn for 1 minute per gallon of Fuel.`,
	]
})

export const Conditions = new Rule({
	name: `Conditions`, 
	description: [
		`-1 Damage Resistance and -1 Handling. Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`,
	]
})

export const Occupants = new Rule({
	name: `Occupants`, 
	description: [
		`Passengers in a moving vehicle are Unstable. A vehicle provides Cover from Ranged Attacks with its Damage Resistance.`,
	]
})

export const Pedestrians = new Rule({
	name: `Pedestrians`, 
	description: [
		`Hitting a pedestrian does Damage = [vehicle Damage Resistance]. -1 Damage Resistance after hitting pedestrians = [vehicle Damage Resistance].`,
	]
})

export const Tires = new Rule({
	name: `Tires`, 
	description: [
		`Roll [-3 Attack vs Drive(Stunt)] to destroy a tire. If the tire is destroyed, the driver must roll [Drive 9#] or Wreck.`,
		`If a front tire gets destroyed, the vehicle Wrecks automatically.`,
	]
})

export const Wreck = new Rule({
	name: `Wreck`, 
	description: [
		`The vehicle comes to a violent stop suddenly this round. Occupants take [d6 Damage per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the Damage is halved and they remain in their seats.`,
	]
})

export const Vehicles = new Rule({
	name: `Vehicles`, 
	description: [
		`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s Damage Resistance <= winner’s Damage Resistance], or if a vehicle takes [Damage > Damage Resistance], the vehicle gets a Condition. 0 Damage Resistance disables a vehicle. A Botch is a Wreck.`,
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

export default [
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