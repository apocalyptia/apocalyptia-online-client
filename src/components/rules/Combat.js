import Rule from '../classes/Rule'


// Independent Rules

export const Actions = new Rule({
	name: `Actions`, 
	description: [
		`You get 3 Actions per round starting on your turn. Most things cost 1 Action unless otherwise noted.`,
	]
})

export const Attack = new Rule({
	name: `Attack`, 
	description: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, you do bonus Damage = [Attack - Defense] up to your Melee or Ranged score.`,
	]
})

export const Communication = new Rule({
	name: `Communication`, 
	description: [
		`You can speak or shout up to 6 words per round.`,
	]
})

export const Rounds = new Rule({
	name: `Rounds`, 
	description: [
		`Combat time occurs in 3-second “rounds”. Each Player rolls [d6 + Speed] to determine the turn order at the start of each new round.`,
		`This Speed roll may Explode or Botch. On a Botch, you lose your turn.`,
	]
})


// Sub Rules

export const Chase = new Rule({
	name: `Chase`, 
	description: [
		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Speed] each round, depending on the type of mobility in use. The chase ends when one side gets 3 Successes over the other.`,
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
		`Whenever you take Fire Damage, 1 Wound is permanent. Only Fire-Resistant Armor reduces Fire Damage.`,
	]
})

export const Pain = new Rule({
	name: `Pain`, 
	description: [
		`Wounds (and a few other effects) cause Pain which is a -1 penalty to all rolls and Speed.`,
		`Pain fades as Wounds heal. You fall Prone if your Speed drops to 0 from Pain.`,
	]
})

export const Recovery = new Rule({
	name: `Recovery`, 
	description: [
		`After 3 days of rest, roll [Constitution vs total Wounds] to heal 1 Wound, and [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Wound or Trauma, depending on what you were rolling to Recover.`,
	]
})

export const ReflexiveDefense = new Rule({
	name: `Reflexive Defense`,
	description: [
		`If you are unaware or unable to avoid an Attack, you are Defenseless and so must fall back on your Reflexive Defenses.`,
		`Both Defenses have a Reflexive form, which acts as your default Defense score when you are not actively rolling.`,
		`Reflexive Block equals your Melee(Block) score. Reflexive Dodge equals your Acrobatics(Dodge) score.`,
		`Use Reflexive Block against Melee Attacks and Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
})


// Composite Rules

export const Damage = new Rule({
	name: `Damage`, 
	description: [
		`Damage causes Wounds. You die when Wounds = Health. Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage]. All Wounds cause Pain penalties.`,
	],
	subrules: [
		DamageResistance,
		FireDamage,
		Pain,
		Recovery
	]
})

export const Defense = new Rule({
	name: `Defense`, 
	description: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks.`,
		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
		`Botching a Defense roll makes you fall Prone.`,
	],
	subrules: [
		ReflexiveDefense
	]
})

export const Movement = new Rule({
	name: `Movement`, 
	description: [
		`It costs 1 Action to move up to your Speed [Agility x 3] on your turn. You may spend up to 2 of your Actions on Movement per turn to Run, however this will cause you to have the Unstable Status effect until your next turn.`,
		`You may divide up your Movement around other Actions on your turn however you wish.`,
		`When you take a Movement Action, you may go Prone at any time for free. It costs 1 Action to stand up.`,
	],
	subrules: [
		Chase
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

export default {
	list: [
		Rounds,
		Actions,
		Communication,
		Movement,
		Attack,
		Defense,
		Damage,
		Vehicles
	]
}