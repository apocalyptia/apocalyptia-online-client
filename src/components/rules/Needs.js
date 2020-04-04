import Rule from '../classes/Rule'

export const Asphyxiation = new Rule({
	name: `Asphyxiation`, 
	description: [
		`People need constant air supply.`,
		`1 Pain per minute without air.`,
		`This penalty is reduced by 1 per minute with air.`,
		`Going without air for a number of minutes = [Constitution] is lethal.`,
	]
})

export const Dehydration = new Rule({
	name: `Dehydration`, 
	description: [
		`People need 1 Water per day.`,
		`1 Pain per day without Water.`,
		`This penalty is reduced by 1 per day with Water.`,
		`Going without Water for a number of days = [Constitution] is lethal.`,
	]
})

export const Exhaustion = new Rule({
	name: `Exhaustion`, 
	description: [
		`People need 8 hours of sleep per day.`,
		`1 Pain per day without sufficient sleep.`,
		`Go unconscious for 8 hours after days = [Constitution] without sleep.`,
		`Penalties go away after 8 hours of sleep.`,
	]
})

export const Hypothermia = new Rule({
	name: `Hypothermia`, 
	description: [
		`People need warmth to stay alive.`,
		`1 Pain per hour of Hypothermia.`,
		` Reduce penalty by 1 per hour of warmth.`,
		`Hypothermia for hours = [Constitution] is lethal.`,
	]
})

export const Starvation = new Rule({
	name: `Starvation`, 
	description: [
		`People need 1 Food per day.`,
		`1 Pain per week without Food.`,
		`This penalty is reduced by 1 per day with Food.`,
		`Going without Food for a number of weeks = [Constitution] is lethal.`,
	]
})

const Needs = new Rule({
	name: `Needs`, 
	description: [
		`1 Pain for each lacking Need over a given period of time:`,
	]
})
Needs.subrules = [
	Asphyxiation,
	Dehydration,
	Exhaustion,
	Hypothermia,
	Starvation,
]

export default { Needs }