import Maneuver from '../../classes/Maneuver'


export const Distract = new Maneuver({
	cat: `Social`,
	name: `Distract`,
	desc: [
		`Roll [Perform vs Perception].`,
		`Stun target for 1 round.`,
	]
})

export const Encourage = new Maneuver({
	cat: `Social`,
	name: `Encourage`,
	desc: [
		`Roll [Leadership vs groups’ total Demeanor scores].`,
		`The group gets a bonus = [your Demeanor] for one specific roll each.`,
		`A Botch is -1 to all rolls.`,
	]
})

export const Interrogate = new Maneuver({
	cat: `Social`,
	name: `Interrogate`,
	desc: [
		`Roll [Leadership vs Demeanor] to get information out of a subject who does not want to help, but without resorting to violence.`,
		`Each roll takes d6 mins of conversation.`,
		`If the interrogator Succeeds, the subject gives up a fact (wittingly or unwittingly).`,
		`If the subject Succeeds, they become hardened against further questioning, imposing a -1 penalty on subsequent attempts.`,
		`After Fails = [Demeanor], the interrogator gives up or the subject cracks and tells everything they know.`,
	]
})

export const Negotiate = new Maneuver({
	cat: `Social`,
	name: `Negotiate`,
	desc: [
		`If opposed parties are willing to talk out their differences, each side start with a list of demands.`,
		`Roll [Socialize vs Socialize] once per demand.`,
		`Attitude and situational modifiers should be applied by the Narrator.`,
		`Success means you get your demand and the opposed negotiator concedes.`,
		`Either side can choose to concede a demand without rolling. Some desires may be non-negotiable.`,
	]
})

export const Recruit = new Maneuver({
	cat: `Social`,
	name: `Recruit`,
	desc: [
		`Roll [Socialize vs Demeanor] to convince someone to join your side.`,
		`If they are someone’s follower, roll [Leadership vs Leadership].`,
		`Attitude and other contextual modifiers should be applied at the Narrator's discretion.`,
	]
})

export const Taunt = new Maneuver({
	cat: `Social`,
	name: `Taunt`,
	desc: [
		`Roll [Leadership vs Demeanor].`,
		`Provoke the enemy into exclusively attacking you.`,
		`The degree of Success is a penalty to the loser’s next roll.`,
		`The enemy is Stunned for 1 round if [penalty > enemy’s Demeanor].`,
	]
})

export const Torture = new Maneuver({
	cat: `Social`,
	name: `Torture`,
	desc: [
		`Roll [Medicine vs prisoner’s Constitution] once per hour to cause a captive d6 Pain to soften their resolve without killing them.`,
		`Failure does d6 Damage to the captive.`,
		`Roll [Demeanor vs Demeanor] at the end of each hour (Pain penalty applies).`,
		`Failure causes -1 Psyche loss.`,
		`At 0 Psyche, either the torturer cannot do it anymore and gives up, or the captive is broken and can be controlled with Demeanor Skills automatically until freed.`,
	]
})



export default [
	Distract,
	Encourage,
	Interrogate,
	Negotiate,
	Recruit,
	Taunt,
	Torture
]