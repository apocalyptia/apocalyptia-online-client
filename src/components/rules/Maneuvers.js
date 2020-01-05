import Rule from './Rule'
import CalledShotTable from './tables/CalledShotTable.svelte'


export const AggressivePosture = new Rule(
	`Aggressive Posture`, 
	[`Get 1 extra Action (for a total of 3) at the cost of leaving yourself Defenseless until your next turn.`]
)

export const Aim = new Rule(
	`Aim`, 
	[`Spend an Action to get +3 to your next ATK against a specific target.`]
)

export const Block = new Rule(
	`Block`, 
	[`Roll [Melee vs MATK or RATK when using a Shield] for DEF.`]
)

export const CalledShot = new Rule(
	`Called Shot`, 
	[`ATKs target the Torso by default. A Called Shot is an ATK targeting the Head, Arms, or Legs with added effects based on Location.`],
	[],
	CalledShotTable
)

export const DefensivePosture = new Rule(
	`Defensive Posture`, 
	[`Skip your turn to get 1 extra Defense Action (for a total of 3) until your next turn.`]
)

export const Disarm = new Rule(
	`Disarm`, 
	[`Roll [MATK vs Melee (+ C if the weapon is used two-handed)]. The weapon flies d6 yds away. Attacker gets the weapon if Unarmed.`]
)

export const Distract = new Rule(
	`Distract`,
	[`Roll [Perform vs Perception]. Stun target for 1rnd.`]
)

export const Dodge = new Rule(
	`Dodge`, 
	[`Roll [Acrobatics vs MATK or RATK (Throw)] for DEF.`]
)

export const Duck = new Rule(
	`Duck`, 
	[`Roll [Dodge vs ATK] to move up to your Speed to get behind Cover. If the ATK still hits, the Cover Material’s DR reduces the DMG. You will keep the benefits of Cover as long as it remains between you and the opponent.`]
)

export const Encourage = new Rule(
	`Encourage`,
	[`Roll [Leadership vs groups’ total D scores]. The group gets a bonus = [your D] for one specific roll each. A Botch is -1 to all rolls.`]
)

export const Hide = new Rule(
	`Hide`, 
	[`Roll [Stealth vs Perception] to be Concealed. 0 Speed. +3 if Prone.`]
)

export const Hold = new Rule(
	`Hold`,
	[`Block ATKs using a Grabbed enemy as a Shield.`]
)

export const Interrogate = new Rule(
	`Interrogate`,
	[`Roll [Leadership vs D] to get information out of a subject who does not want to help, but without resorting to violence. Each roll takes d6 mins of conversation. If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly). If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts. After Fails = [D], the interrogator gives up or the subject cracks and tells everything they know.`]
)

export const Negotiate = new Rule(
	`Negotiate`,
	[`If opposed parties are willing to talk out their differences, each side start with a list of demands. Roll [Socialize vs Socialize] once per demand. Attitude and situational modifiers should be applied by the GN. Success means you get your demand and the opposed negotiator concedes. Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`]
)

export const Protect = new Rule(
	`Protect`, 
	[`Become the new target of all ATKs targeting someone within 1yd of you for 1rnd. You may still Block, but you cannot Dodge the ATK.`]
)

export const Push = new Rule(
	`Push`,
	[`Roll [C vs C] to push an enemy in front of you as you move up to [C] yds. 0DMG.`]
)

export const Recruit = new Rule(
	`Recruit`,
	[`Roll [Socialize vs D] to convince someone to join your side. If they are someone’s follower, roll [Leadership vs Leadership]. Attitude and situational modifiers should be applied by the GN.`]
)

export const Reload = new Rule(
	`Reload`,
	[`Replace a magazine or a single piece of ammunition (depending on the weapon) in a Ranged weapon.`]
)

export const Shove = new Rule(
	`Shove`,
	[`Roll [MATK vs C] to shove an enemy up to [C/2] yds away from you, knocking them Prone. 0DMG.`]
)

export const Sneak = new Rule(
	`Sneak`, 
	[`Roll [Stealth vs Perception] to move Concealed at [Speed / 2].`]
)

export const Tackle = new Rule(
	`Tackle`,
	[`Roll [C vs C] to go Prone with Grabbed enemy.`]
)

export const Taunt = new Rule(
	`Taunt`,
	[`Roll [Leadership vs D]. Provoke the enemy into exclusively attacking you. The degree of Success is a penalty to the loser’s next roll. The enemy is Stunned for 1rnd if [penalty > enemy’s D].`]
)

export const Throw = new Rule(
	`Throw`,
	[`Throw a Grabbed enemy up to [C] yds and they take Falling DMG. Prone.`]
)

export const Torture = new Rule(
	`Torture`,
	[`Roll [Medicine vs prisoner’s C] once per hour to cause a captive d6 Pain to soften their resolve without killing them. Failure does d6 DMG to the captive. Roll [D vs D] at the end of each hour (Pain penalty applies). Failure causes -1 Psyche loss. At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`]
)

export const Trip = new Rule(
	`Trip`,
	[`Roll [MATK vs A] to knock an enemy Prone. 1DMG.`]
)


export const Grab = new Rule(
	`Grab`,
	[`0DMG MATK to render an enemy Defenseless and unable to take actions except attempting escape [(Acrobatics or Melee) vs Grab]. You must have a free hand to Grab. Spend 1 Action per rnd to retain a Grab.`],
	[Hold, Tackle, Throw]
)


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
	Grab,
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

export const Maneuvers = [...DefensiveManeuvers, ...OffensiveManeuvers, ...SocialManeuvers]