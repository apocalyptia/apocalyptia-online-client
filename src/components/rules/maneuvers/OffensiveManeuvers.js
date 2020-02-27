import Maneuver from '../../classes/Maneuver'
import CalledShotTable from '../../views/tables/CalledShotTable.svelte'


// Independent Rules

export const Aim = new Maneuver({
	category: `Offensive`,
	name: `Aim`, 
	description: [
		`Spend an Action to get +3 to your next Attack against a specific target.`,
	],
})

export const CalledShot = new Maneuver({
	category: `Offensive`,
	name: `Called Shot`, 
	description: [
		`Attacks target the Torso by default. A Called Shot is an Attack targeting the Head, Arms, or Legs with added effects based on Location.`,
	],
	table: CalledShotTable
})

export const Disarm = new Maneuver({
	category: `Offensive`,
	name: `Disarm`, 
	description: [
		`Roll [Melee vs Melee (+ Constitution if the weapon is used two-handed)]. The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
})

export const NonLethalForce = new Maneuver({
	category: `Offensive`,
	name: `Non-Lethal Force`,
	description: [
		`Declare that you are using this Maneuver before rolling a Melee Attack. On a Success, you do half Damage.`,
	]
})

export const Push = new Maneuver({
	category: `Offensive`,
	name: `Push`,
	description: [
		`Roll [Constitution vs Constitution] to push an enemy in front of you. While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. No Damage.`,
	]
})

export const Reload = new Maneuver({
	category: `Offensive`,
	name: `Reload`,
	description: [
		`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`,
	]
})

export const Shove = new Maneuver({
	category: `Offensive`,
	name: `Shove`,
	description: [
		`Roll [Melee vs Constitution] to shove an enemy up to [Constitution / 2] yds away from you, knocking them Prone. No Damage.`,
	]
})

export const Trip = new Maneuver({
	category: `Offensive`,
	name: `Trip`,
	description: [
		`Roll [Melee vs Agility] to knock an enemy Prone. 1 Damage.`,
	]
})


// Sub Rules

export const Grab = new Maneuver({
	category: `Offensive`,
	name: `Grab`,
	description: [
		`Roll [Melee(Unarmed) vs DEF] to impose the 'Grabbed' Status.`,
	]
})

export const Hostage = new Maneuver({
	category: `Offensive`,
	name: `Hostage`,
	description: [
		`Use a Grabbed or Restrained enemy as Cover. The Grappled enemy's Damage Resistance acts as the Material Damage Resistance and any excess Damage is applied to the Grappled enemy instead of you. If the Damage is enough to kill the Grappled enemy, any excess Damage passes through to you. This does not make you Concealed.`,
	]
})

export const Tackle = new Maneuver({
	category: `Offensive`,
	name: `Tackle`,
	description: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy. If you Fail, you go Prone in front of them.`,
	]
})

export const Throw = new Maneuver({
	category: `Offensive`,
	name: `Throw`,
	description: [
		`Throw a Grabbed or Restrained enemy up to [Constitution] yds. They take Falling Damage and land Prone.`,
	]
})


// Composite Rules

export const Grapple = new Maneuver({
	category: `Offensive`,
	name: `Grapple`,
	description: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no Damage.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each round the Attacker must choose to either spend 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	],
	subrules: [
		Grab,
		Hostage, 
		Tackle, 
		Throw
	]
})


export default [
	Aim,
	CalledShot,
	Disarm,
	Grapple,
	NonLethalForce,
	Push,
	Reload,
	Shove,
	Trip
]