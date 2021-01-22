import Asphyxiation from '$rules/needs/Asphyxiation.js'
import Dehydration from '$rules/needs/Dehydration.js'
import Exhaustion from '$rules/needs/Exhaustion.js'
import Hypothermia from '$rules/needs/Hypothermia.js'
import Starvation from '$rules/needs/Starvation.js'

export default {
	name: `Needs`,
	text: [
		`Take 1 Pain for each unmet requirement over a given period of time.`,
	],
	list: [
		Asphyxiation,
		Dehydration,
		Exhaustion,
		Hypothermia,
		Starvation,
	]
}