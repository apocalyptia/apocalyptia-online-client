import Rule from '../classes/Rule'


export const NeedsExplanation = [
	`Take 1 Pain for each unmet requirement over a given period of time.`,
]

export const Asphyxiation = new Rule({
	name: `Asphyxiation`, 
	description: [
		`Constant air supply is required.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
})

export const Dehydration = new Rule({
	name: `Dehydration`, 
	description: [
		`1 Water per day is required.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
	]
})

export const Exhaustion = new Rule({
	name: `Exhaustion`, 
	description: [
		`8 hours of sleep per day is required.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
})

export const Hypothermia = new Rule({
	name: `Hypothermia`, 
	description: [
		`Warmth is required.`,
		`1 Pain per hour of Hypothermia.`,
		`Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
})

export const Starvation = new Rule({
	name: `Starvation`, 
	description: [
		`1 Food per day is required.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
})


export default {
	name: `Needs`,
	explanation: NeedsExplanation,
	list: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
	]
}