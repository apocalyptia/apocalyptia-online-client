import Rule from '../classes/Rule'
import CalledShotTable from './tables/CalledShotTable.svelte'


export const AggressivePosture = new Rule({
	name: `Aggressive Posture`, 
	description: [
		`Get 1 extra Attack Action (for a total of 3) this turn by foregoing both of your normal Defense Actions until your next turn.`,
	]
})

export const Aim = new Rule({
	name: `Aim`, 
	description: [
		`Spend an Action to get +3 to your next ATK against a specific target.`,
	]
})

export const Block = new Rule({
	name: `Block`, 
	description: [
		`Roll [Melee vs MATK or RATK when using a Shield] for DEF.`,
	]
})

export const CalledShot = new Rule({
	name: `Called Shot`, 
	description: [
		`ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`,
	],
	table: CalledShotTable
})

export const DefensivePosture = new Rule({
	name: `Defensive Posture`, 
	description: [
		`Forego both normal Actions on your turn to get 1 extra Defense Action (for a total of 3) until your next turn.`,
	]
})

export const Disarm = new Rule({
	name: `Disarm`, 
	description: [
		`Roll [MATK vs Melee (+ C if the weapon is used two-handed)]. The weapon flies d6 yds away in a random direction or the Attacker may choose to grab the weapon if they are Unarmed.`,
	]
})

export const Distract = new Rule({
	name: `Distract`,
	description: [
		`Roll [Perform vs Perception]. Stun target for 1rnd.`,
	]
})

export const Dodge = new Rule({
	name: `Dodge`, 
	description: [
		`Roll [Acrobatics vs MATK or RATK (Throw)] for DEF. As part of a Dodge, you may elect to go Prone for free if you wish.`,
	]
})

export const Duck = new Rule({
	name: `Duck`, 
	description: [
		`If there is Cover within ove Movement Action of your current position, you may roll [Dodge vs ATK] to move up to your Speed to get behind Cover. This is the only way to Dodge a Ranged(Shoot) RATK. As part of this Dodge, you may elect to go Prone. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`,
	]
})

export const Encourage = new Rule({
	name: `Encourage`,
	description: [
		`Roll [Leadership vs groups’ total D scores]. The group gets a bonus = [your D] for one specific roll each. A Botch is -1 to all rolls.`,
	]
})

export const Hide = new Rule({
	name: `Hide`, 
	description: [
		`Roll [Stealth vs Perception] to be Concealed. 0 Speed. +3 if Prone.`,
	]
})

export const Hostage = new Rule({
	name: `Hostage`,
	description: [
		`Use a Grabbed or Restrained enemy as Cover. The Grappled enemy's DR acts as the Material DR and any excess DMG is applied to the Grappled enemy instead of you. If the DMG is enough to kill the Grappled enemy, any excess DMG passes through to you. This does not make you Concealed.`,
	]
})

export const Interrogate = new Rule({
	name: `Interrogate`,
	description: [
		`Roll [Leadership vs D] to get information out of a subject who does not want to help, but without resorting to violence. Each roll takes d6 mins of conversation. If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly). If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts. After Fails = [D], the interrogator gives up or the subject cracks and tells everything they know.`,
	]
})

export const Negotiate = new Rule({
	name: `Negotiate`,
	description: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands. Roll [Socialize vs Socialize] once per demand. Attitude and situational modifiers should be applied by the Narrator. Success means you get your demand and the opposed negotiator concedes. Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`,
	]
})

export const NonLethalForce = new Rule({
	name: `Non-Lethal Force`,
	description: [
		`Declare that you are using this Maneuver before rolling an MATK. On a Success, you do half DMG.`,
	]
})

export const Protect = new Rule({
	name: `Protect`, 
	description: [
		`Become the new target of all ATKs targeting someone within 1yd of you for 1rnd. You may still Block, but you cannot Dodge the ATK.`,
	]
})

export const Push = new Rule({
	name: `Push`,
	description: [
		`Roll [C vs C] to push an enemy in front of you. While Pushing, your Speed is equal to the lesser of your normal Speed or your Constitution. 0DMG.`,
	]
})

export const Recruit = new Rule({
	name: `Recruit`,
	description: [
		`Roll [Socialize vs D] to convince someone to join your side. If they are someone’s follower, roll [Leadership vs Leadership]. Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	]
})

export const Reload = new Rule({
	name: `Reload`,
	description: [
		`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`,
	]
})

export const Shove = new Rule({
	name: `Shove`,
	description: [
		`Roll [MATK vs C] to shove an enemy up to [C/2] yds away from you, knocking them Prone. 0DMG.`,
	]
})

export const Sneak = new Rule({
	name: `Sneak`, 
	description: [
		`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`,
	]
})

export const Tackle = new Rule({
	name: `Tackle`,
	description: [
		`Spend 2 Actions and make a Grapple Attack roll to move up to your Speed and Pin an enemy. If you Fail, you go Prone in front of them.`,
	]
})

export const Taunt = new Rule({
	name: `Taunt`,
	description: [
		`Roll [Leadership vs D]. Provoke the enemy into exclusively attacking you. The degree of Success is a penalty to the loser’s next roll. The enemy is Stunned for 1rnd if [penalty > enemy’s D].`,
	]
})

export const Throw = new Rule({
	name: `Throw`,
	description: [
		`Throw a Grabbed or Restrained enemy up to [C] yds. They take Falling DMG and land Prone.`,
	]
})

export const Torture = new Rule({
	name: `Torture`,
	description: [
		`Roll [Medicine vs prisoner’s C] once per hour to cause a captive d6 Pain to soften their resolve without killing them. Failure does d6 DMG to the captive. Roll [D vs D] at the end of each hour (Pain penalty applies). Failure causes -1 Psyche loss. At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`,
	]
})

export const Trip = new Rule({
	name: `Trip`,
	description: [
		`Roll [MATK vs A] to knock an enemy Prone. 1DMG.`,
	]
})


export const Grapple = new Rule({
	name: `Grapple`,
	description: [
		`There are three steps to Grappling:`,
		`1) Grab`,
		`2) Restrain`,
		`3) Pin`,
		`To Grapple an opponent, you must have at least one free hand and make a Melee(Unarmed) Attack roll, which does no DMG.`,
		`With a Successful Grapple roll, that combatant may alter the current Grapple step by 1.`,
		`With each new Grapple roll, the difference between the combatants' results is a modifier to the Attacker's next Grapple roll.`,
		`Each round the Attacker must choose to either spend 1 Action just to retain the Grapple, make another Grapple roll, or let go.`,
		`When the Defender reduces the Grapple step to 0 they escape.`,
	],
	subrules: [
		Hostage, 
		Tackle, 
		Throw
	]
})


export const DefensiveManeuvers = [
	Block,
	DefensivePosture,
	Dodge,
	Duck,
	Hide,
	Protect,
	Sneak
]

export const OffensiveManeuvers = [
	AggressivePosture,
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

export const SocialManeuvers = [
	Distract,
	Encourage,
	Interrogate,
	Negotiate,
	Recruit,
	Taunt,
	Torture
]

export default [
	...DefensiveManeuvers,
	...OffensiveManeuvers,
	...SocialManeuvers
]