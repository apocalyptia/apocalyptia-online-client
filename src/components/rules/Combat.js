import Rule from '../classes/Rule'


// Independent Rules

export const Actions = new Rule({
	name: `Actions`, 
	desc: [
		`You get 3 Actions per round starting on your turn.`,
		`Most things cost 1 Action unless otherwise noted.`,
	]
})

export const Attack = new Rule({
	name: `Attack`, 
	desc: [
		`There are two types of Attacks: Melee and Ranged.`,
		`Spend an Action on your turn to roll [d6 + Melee or Ranged] vs Defense.`,
		`Rolling a 6 on the die is an Explosion, which is re-rolled and added cumulatively to the Attack total.`,
		`On a Successful Attack, you do bonus Damage = [Attack - Defense] up to your Melee or Ranged score.`,
	]
})

export const Communication = new Rule({
	name: `Communication`, 
	desc: [
		`You can speak or shout up to 6 words per round.`,
	]
})

export const Rounds = new Rule({
	name: `Rounds`, 
	desc: [
		`Combat time occurs in 3-second “rounds”.`,
		`Players have 30 seconds to decide what their Character's Actions will be for the round.`,
		`Any new Complication or Status modifiers that come into play during a round go into effect at the start of the next round.`,
	]
})


// Sub Rules

export const Chase = new Rule({
	name: `Chase`, 
	desc: [
		`When a combatant attempts to flee and another chooses to pursue, they roll opposed [(Acrobatics, Athletics, Drive, or Tame) + Run Speed] each round, depending on the type of mobility in use.`,
		`The chase ends when one side gets 3 Successes over the other.`,
	]
})

export const DamageResistance = new Rule({
	name: `Damage Resistance`, 
	desc: [
		`Armor's Damage Resistance reduces the Damage inflicted by any individual Attack on that Location.`,
		`Reduce a piece of Armor's Damage Resistance by 1 after taking Damage that exceeds its Damage Resistance.`,
	]
})

export const FireDamage = new Rule({
	name: `Fire Damage`, 
	desc: [
		`1 point of Fire Damage is always permanent.`,
		`Only Fire-Resistant Armor reduces Fire Damage.`,
	]
})

export const Pain = new Rule({
	name: `Pain`, 
	desc: [
		`Wounds (and a few other effects) cause Pain penalties.`,
		`Each point of Pain is a -1 penalty to all rolls and Speed.`,
		`Pain fades away as Wounds heal.`,
		`You fall Prone if your Speed drops to 0 from Pain.`,
	]
})

export const Recovery = new Rule({
	name: `Recovery`, 
	desc: [
		`After 3 days of rest, roll [Constitution vs total Wounds] to heal 1 Wound, and [Demeanor vs total Trauma] to heal 1 Trauma.`,
		`On a Fail, you take 1 additional Wound or Trauma, depending on what you were rolling to Recover.`,
	]
})

export const ReflexiveDefense = new Rule({
	name: `Reflexive Defense`,
	desc: [
		`Reflexive Defenses = the Skill Specialty they are based on.`,
		`These are your default Defenses when not actively rolling.`,
		`Use Reflexive Block against Melee Attacks.`,
		`Use Reflexive Dodge against either Melee or Ranged Attacks.`,
	]
})

export const Wounds = new Rule({
	name: `Wounds`,
	desc: [
		`A Wound is an injury to particular Location constituting 1 or more Damage.`,
		`Every time you take Damage, you get a new Wound.`,
		`A Location may have multiple Wounds.`,
		`The severity of the Wound depends on how much Damage was taken.`,
		`Treat each Wound separately for purposes of Recovery or the application of the Medicine Skill.`
	]
})


// Composite Rules

const Damage = new Rule({
	name: `Damage`, 
	desc: [
		`Damage causes Wounds.`,
		`You die when Damage = Health.`,
		`Successful Attacks do Damage = [(Attack - Defense) + Weapon Damage].`,
		`All Damage cause Pain penalties.`,
	]
})
Damage.subrules = [
	DamageResistance,
	FireDamage,
	Pain,
	Recovery,
	Wounds,
]
export { Damage }

const Defense = new Rule({
	name: `Defense`, 
	desc: [
		`Spend an Action on your enemy's turn to use either type of Defense: Block or Dodge.`,
		`To Block, roll [d6 + Melee] vs Melee Attacks.`,
		`To Dodge, roll [d6 + Acrobatics] vs either Melee or Ranged Attacks.`,
		`Botching a Defense roll makes you fall Prone.`,
	]
})
Defense.subrules = [
	ReflexiveDefense
]
export { Defense }

const Movement = new Rule({
	name: `Movement`, 
	desc: [
		`You may make one Movement Action per turn.`,
		`This Movement always costs 1 Action, no matter what type of Movement it is.`,
		`Your Movement Action may be any one of the following:`,
		` 1) Walk Speed = [Agility x 3] yards`,
		` 2) Run Speed = [Agility x 6] yards`,
		` 3) Climb Speed = [Agility] yards`,
		` 4) Swim Speed = [Agility / 2] yards`,
		` 5) Stand up from Prone = 1 yard`,
		`When you take a Movement Action, you may go Prone at any time for free.`,
		`Running imposes the Unstable Status effect until your next turn.`,
		`You may divide up your Movement around other Actions on your turn however you wish.`,
	]
})
Movement.subrules = [
	Chase,
]
export { Movement }


// Vehicle Rules

// export const Burning = new Rule({
// 	name: `Burning`, 
// 	desc: [
// 		`If the Vehicle is at 0 Damage Resistance, it bursts into flames doing 1 Fire Damage per round to all Occupants.`,
// 		`It continues to burn for 1 minute per gallon of Fuel.`,
// 	]
// })

// export const Conditions = new Rule({
// 	name: `Conditions`, 
// 	desc: [
// 		`-1 Damage Resistance and -1 Handling.`,
// 		`Roll [Drive 9#] to maintain control upon getting a Condition, otherwise the vehicle Wrecks.`,
// 	]
// })

// export const Occupants = new Rule({
// 	name: `Occupants`, 
// 	desc: [
// 		`Passengers in a moving vehicle are Unstable.`,
// 		`A vehicle provides Cover from Ranged Attacks with its Damage Resistance.`,
// 	]
// })

// export const Pedestrians = new Rule({
// 	name: `Pedestrians`, 
// 	desc: [
// 		`Hitting a pedestrian does Damage = [vehicle Damage Resistance].`,
// 		`-1 Damage Resistance after hitting pedestrians = [vehicle Damage Resistance].`,
// 	]
// })

// export const Tires = new Rule({
// 	name: `Tires`, 
// 	desc: [
// 		`Roll [-3 Attack vs Drive(Stunt)] to destroy a tire.`,
// 		`If the tire is destroyed, the driver must roll [Drive 9#] or Wreck.`,
// 		`If a front tire gets destroyed, the vehicle Wrecks automatically.`,
// 	]
// })

// export const Wreck = new Rule({
// 	name: `Wreck`, 
// 	desc: [
// 		`The vehicle comes to a violent stop suddenly this round.`,
// 		`Occupants take [d6 Damage per 20mph or 30yds of Speed] and are ejected from the vehicle, unless they are wearing seat belts, in which case the Damage is halved and they remain in their seats.`,
// 	]
// })

// export const Vehicles = new Rule({
// 	name: `Vehicles`, 
// 	desc: [
// 		`Roll [Drive(Ram) vs Drive(Stunt)] to hit an enemy vehicle. If [loser’s Damage Resistance <= winner’s Damage Resistance], or if a vehicle takes [Damage > Damage Resistance], the vehicle gets a Condition.`,
// 		`0 Damage Resistance disables a vehicle.`,
// 		`A Botch is a Wreck.`,
// 	],
// 	subrules: [
// 		Conditions,
// 		Occupants,
// 		Pedestrians,
// 		Tires,
// 		Wreck,
// 		Burning,
// 	]
// })


// Rule List

export default {
	name: `Combat`,
	list: [
		Rounds,
		Actions,
		Communication,
		Movement,
		Attack,
		Defense,
		Damage,
		// Vehicles,
	]
}